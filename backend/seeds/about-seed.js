
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/portfolio")
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Database Error:", error));

const AboutSchema = new mongoose.Schema({
  title: String,
  description: String,
  experience: String,
  projects: String,
  problem: String,
  technologies: String
});

const About = mongoose.model("About", AboutSchema);

// The four stat cards on the About page show (see about.html):
//   experience   -> year he graduated from Cairo University
//   projects     -> number of transplant operations (shown with a "+")
//   problem      -> year he was knighted
//   technologies -> year the Aswan Heart Centre was founded
const aboutData = {
  title: "Surgeon, Researcher & Humanitarian",
  description:
    "Born in Bilbeis, Egypt in 1935, Magdi Yacoub graduated from Cairo University School of Medicine and went on to a career in the UK. He began the heart transplant programme at Harefield Hospital in 1980, served as British Heart Foundation Professor of Cardiothoracic Surgery at Imperial College London, and founded the charity Chain of Hope in 1996 and the Aswan Heart Centre in 2009, which provides free heart care in Egypt.",
  experience: "1957",
  projects: "2,500",
  problem: "1992",
  technologies: "2009"
};

async function seedAbout() {
  try {
    const about = await About.findOneAndUpdate(
      {},
      { $set: aboutData },
      { upsert: true, new: true }
    );

    console.log("About Seeded Successfully!");
    console.log(about);

  } catch (error) {
    console.log("Seeding Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedAbout();
