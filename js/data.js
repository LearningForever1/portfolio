/* ==========================================================================
   EDIT YOUR CONTENT HERE — this is the only file you need to touch to
   update your WhatsApp number, projects, and pricing packages.
   After editing, just save and refresh the site.
   ========================================================================== */

const SITE_DATA = {

  /* 1. YOUR WHATSAPP NUMBER
     Use the full international format with NO spaces, +, or dashes.
     Example: Pakistan number +92 300 1234567 becomes "923001234567" */
  whatsappNumber: "923001234567", // <-- REPLACE THIS WITH YOUR REAL NUMBER

  /* Default message sent when someone taps a general "Chat on WhatsApp" button */
  defaultMessage: "Hi Badar! I found your portfolio and I'd like to talk about a video editing project.",

  /* 2. PROJECTS — shown on the Home page (first 3) and full Portfolio page (all).
     - title: project name
     - category: short tag, e.g. "Reels", "YouTube", "Color Grade", "Commercial"
     - tagColor: "blue" | "burgundy" | "green"  (used for the tag pill color)
     - videoUrl: paste a YouTube/Vimeo/Drive link here — leave as "#" for now
  */
  projects: [
    { title: "Project Title 01", category: "Reels", tagColor: "blue", videoUrl: "#" },
    { title: "Project Title 02", category: "YouTube", tagColor: "green", videoUrl: "#" },
    { title: "Project Title 03", category: "Commercial", tagColor: "burgundy", videoUrl: "#" },
    { title: "Project Title 04", category: "Color Grade", tagColor: "blue", videoUrl: "#" },
    { title: "Project Title 05", category: "Reels", tagColor: "green", videoUrl: "#" },
    { title: "Project Title 06", category: "YouTube", tagColor: "burgundy", videoUrl: "#" },
  ],

  /* 3. PRICING — exactly 3 packages. "featured: true" adds the "MOST BOOKED" ribbon. */
  pricing: [
    {
      tier: "Starter",
      price: "25",
      unit: "/ video",
      desc: "Quick turnaround edits for reels, shorts and social clips.",
      features: [
        "Up to 60 seconds",
        "1 revision round",
        "Basic color correction",
        "48-hour delivery",
      ],
      featured: false,
    },
    {
      tier: "Standard",
      price: "60",
      unit: "/ video",
      desc: "Full-service edit for YouTube videos and brand content.",
      features: [
        "Up to 10 minutes",
        "3 revision rounds",
        "Color grading + sound design",
        "Motion graphics & captions",
        "72-hour delivery",
      ],
      featured: true,
    },
    {
      tier: "Premium",
      price: "150",
      unit: "/ video",
      desc: "High-end commercial edit with full creative direction.",
      features: [
        "Unlimited length",
        "Unlimited revisions",
        "Advanced color grade",
        "Custom motion graphics",
        "Priority delivery",
      ],
      featured: false,
    },
  ],
};
