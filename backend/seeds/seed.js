
const mongoose = require("mongoose");

// Database Connection
mongoose.connect("mongodb://localhost:27017/portfolio")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database Error:", err));

// Skill Schema (used on the "Expertise" page)
const SkillSchema = new mongoose.Schema({
  category: String,
  items: [String]
});

const Skill = mongoose.model("Skill", SkillSchema);

// Seed Data
const skillsData = [
  {
    category: "Surgery",
    items: [
      "Cardiothoracic Surgery",
      "Heart Transplantation",
      "Heart and Lung Transplantation",
      "Congenital Heart Surgery",
      "Heart Valve Surgery"
    ]
  },
  {
    category: "Research",
    items: [
      "Biological Heart Valves",
      "Tissue Engineering",
      "Heart Muscle Repair",
      "Heart Support Devices"
    ]
  },
  {
    category: "Humanitarian Work",
    items: [
      "Chain of Hope (1996)",
      "Aswan Heart Centre (2009)",
      "Magdi Yacoub Global Heart Foundation",
      "Training Healthcare Professionals"
    ]
  },
  {
    category: "Honours",
    items: [
      "Knighthood (1992)",
      "Fellow of the Royal Society (1999)",
      "Order of the Nile (2011)",
      "Order of Merit (2014)"
    ]
  }
];

// Insert Data
async function seedDatabase() {
  try {
    for (const skill of skillsData) {
      await Skill.updateOne(
        { category: skill.category },
        { $set: skill },
        { upsert: true }
      );
    }

    console.log("Skills Seeded Successfully!");
  } catch (error) {
    console.log("Seeding Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();
