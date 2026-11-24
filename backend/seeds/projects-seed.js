
const mongoose = require("mongoose");

async function seedProjects() {
  try {
    await mongoose.connect("mongodb://localhost:27017/portfolio");

    console.log("Database Connected");

    const ProjectSchema = new mongoose.Schema({
      title: String,
      image: String,
      description: String,
      tech: [String],
      liveDemo: String,
      sourceCode: String
    });

    const Projects = mongoose.model("Project", ProjectSchema);

    const WIKI = "https://en.wikipedia.org/wiki/Magdi_Yacoub";
    const BHF =
      "https://www.bhf.org.uk/what-we-do/news-from-the-bhf/news-archive/2026/april/prof-sir-magdi-yacoub-honoured-with-red-plaque";
    const FOUNDATION = "https://myglobalheart.org";

    // Each "project" is a career milestone.
    // liveDemo -> "Read More" button, sourceCode -> "Source" button.
    const projectsData = [
      {
        title: "Harefield Heart Transplant Programme",
        image: "uploads/milestone-1.svg",
        description:
          "Began the heart transplant programme at Harefield Hospital in 1980. The British Heart Foundation describes it as the world's largest heart and lung transplantation programme, with over 2,500 transplant operations.",
        tech: ["Harefield Hospital", "Transplantation", "1980"],
        liveDemo: BHF,
        sourceCode: WIKI
      },
      {
        title: "Arterial Switch Operation",
        image: "uploads/milestone-2.svg",
        description:
          "Pioneered the arterial switch operation for babies born with transposition of the great arteries, devising a two-stage approach in 1977.",
        tech: ["Congenital Heart Surgery", "Paediatric", "1977"],
        liveDemo: BHF,
        sourceCode: WIKI
      },
      {
        title: "Ross-Yacoub Remodelling",
        image: "uploads/milestone-3.svg",
        description:
          "Worked with Donald Ross on heart valve repair and adapted the Ross procedure, including the Ross-Yacoub remodelling, mainly for younger patients.",
        tech: ["Heart Valves", "Cardiac Surgery", "Donald Ross"],
        liveDemo: WIKI,
        sourceCode: WIKI
      },
      {
        title: "First UK Heart and Lung Transplant",
        image: "uploads/milestone-4.svg",
        description:
          "Performed the UK's first combined heart and lung transplant at Harefield Hospital in 1983.",
        tech: ["Heart-Lung Transplant", "Harefield Hospital", "1983"],
        liveDemo: WIKI,
        sourceCode: WIKI
      },
      {
        title: "Aswan Heart Centre",
        image: "uploads/milestone-5.svg",
        description:
          "Founded the Aswan Heart Centre in southern Egypt in 2009, offering free, high-quality heart care with a strong focus on children, and training healthcare professionals.",
        tech: ["Aswan, Egypt", "Free Care", "Training"],
        liveDemo: FOUNDATION,
        sourceCode: WIKI
      },
      {
        title: "Living Heart Valve Research",
        image: "uploads/milestone-6.svg",
        description:
          "Leads research at the Magdi Yacoub Institute on biological heart valves designed to grow with children, building on his 2007 report of growing part of a human valve from stem cells.",
        tech: ["Tissue Engineering", "Research", "Heart Valves"],
        liveDemo: BHF,
        sourceCode: WIKI
      }
    ];

    await Projects.deleteMany({});
    await Projects.insertMany(projectsData);

    console.log("Projects Seeded Successfully!");

  } catch (error) {
    console.log("Seeding Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedProjects();
