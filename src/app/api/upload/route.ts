import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate image format
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PNG, JPG, WebP, SVG, or GIF image." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create safe filename
    const ext = path.extname(file.name) || ".png";
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `article_${Date.now()}_${cleanName}${ext}`;

    // 1. Try uploading to Supabase Storage if configured
    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Ensure public bucket 'article-images' exists
        await supabase.storage.createBucket("article-images", { public: true }).catch(() => {});

        const { data, error } = await supabase.storage
          .from("article-images")
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!error && data) {
          const { data: publicData } = supabase.storage.from("article-images").getPublicUrl(filename);
          if (publicData?.publicUrl) {
            return NextResponse.json({ success: true, url: publicData.publicUrl });
          }
        }
      } catch (storageErr) {
        console.warn("Supabase Storage upload warning, attempting fallback:", storageErr);
      }
    }

    // 2. Try writing to local disk if file system is writable (e.g. local dev)
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    } catch (fsErr: any) {
      // 3. Serverless Read-Only File System Fallback (EROFS): convert to Data URL
      if (fsErr.code === "EROFS" || fsErr.message?.includes("read-only")) {
        const base64 = buffer.toString("base64");
        const dataUrl = `data:${file.type};base64,${base64}`;
        return NextResponse.json({ success: true, url: dataUrl });
      }
      throw fsErr;
    }
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
