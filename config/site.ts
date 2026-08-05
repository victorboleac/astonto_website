export const siteConfig = {
  name: "ASTONTO",
  legalName: "ASTONTO LTD",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://astonto.com",
  description:
    "Independent AI research company studying the observable behaviour of large language models and AI recommendation systems. Creator of AnswerSignal.",
  tagline: "Understanding how AI systems interpret, source and recommend.",
  address: {
    street: "66 Paul Street",
    city: "London",
    postcode: "EC2A 4NA",
    country: "England",
    countryCode: "GB",
    fullAddress: "66 Paul Street, London, EC2A 4NA, England",
  },
  contact: {
    telephone: "+44 7845 580266",
    telephoneClean: "+447845580266",
    notificationEmail: process.env.CONTACT_NOTIFICATION_EMAIL || "hello@astonto.com",
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/astonto/",
  },
};
