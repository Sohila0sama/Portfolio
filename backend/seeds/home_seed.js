
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/portfolio")
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Database Error:", error));

const HomeSchema = new mongoose.Schema({
  name: String,
  title: String,
  image: String,
  description: String,
  linkedin: String,
  cv: String,
  github: String,
  workingWith: [String]
});

const Home = mongoose.model("home", HomeSchema);

// NOTE: field names are kept so the existing app keeps working:
//   linkedin -> "Biography" button (Wikipedia)
//   cv       -> "Global Heart Foundation" button
//   github   -> "BHF Recognition" button
const homeData = {
  name: "Magdi Yacoub",
  title: "Cardiothoracic Surgeon & Researcher",
  image: "uploads/profile.jpg",
  description:
    "Egyptian-British cardiothoracic surgeon, a pioneer of heart and heart-lung transplantation and founder of the Aswan Heart Centre.",
  linkedin: "https://en.wikipedia.org/wiki/Magdi_Yacoub",
  cv: "https://myglobalheart.org",
  github:
    "https://www.bhf.org.uk/what-we-do/news-from-the-bhf/news-archive/2026/april/prof-sir-magdi-yacoub-honoured-with-red-plaque",
  workingWith: [
    "Heart Transplantation",
    "Congenital Heart Surgery",
    "Heart Valve Research",
    "Tissue Engineering",
    "Global Health"
  ]
};

async function seedHome() {
  try {
    await Home.findOneAndUpdate(
      {},
      { $set: homeData },
      { upsert: true, new: true }
    );

    console.log("Home Seeded Successfully!");
  } catch (error) {
    console.log("Seeding Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedHome();
