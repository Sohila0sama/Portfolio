
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/portfolio")
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Database Error:", error));

const ContactSchema = new mongoose.Schema({
  email: String,
  location: String,
  github: String,
  linkedin: String,
  whatsapp: String
});

const Contacts = mongoose.model("Contact", ContactSchema);

// Only public, organisation-level contact details are used here.
// Field names are kept so the existing app keeps working:
//   linkedin -> "Wikipedia" link
//   github   -> "Foundation" link
//   whatsapp -> "BHF" link
const contactData = {
  email: "info@myglobalheart.org",
  location: "Aswan & Cairo, Egypt",
  github: "https://myglobalheart.org",
  linkedin: "https://en.wikipedia.org/wiki/Magdi_Yacoub",
  whatsapp:
    "https://www.bhf.org.uk/what-we-do/news-from-the-bhf/news-archive/2026/april/prof-sir-magdi-yacoub-honoured-with-red-plaque"
};

async function seedContact() {
  try {
    const contact = await Contacts.findOneAndUpdate(
      {},
      { $set: contactData },
      { upsert: true, new: true }
    );

    console.log("Contact Seeded Successfully!");
    console.log(contact);

  } catch (error) {
    console.log("Seeding Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedContact();
