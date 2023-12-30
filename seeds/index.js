const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "65735a200be862c745b4dec1",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png",
          filename: "YelpCamp/ahfnenvca4tha00h2ubt",
        },
        {
          url: "https://res.cloudinary.com/dsprnjo2q/image/upload/v1703164882/YelpCamp/fywvaem8sgpioayqitdw.jpg",
          filename: "YelpCamp/fywvaem8sgpioayqitdw",
        },
        {
          url: "https://res.cloudinary.com/dsprnjo2q/image/upload/v1703164926/YelpCamp/irtrpznmg92ncrwut77s.jpg",
          filename: "YelpCamp/irtrpznmg92ncrwut77s",
        },
      ],
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam tempore velit vel dignissimos reprehenderit quam, ipsum eligendi quos eum molestias, eius at, aliquid excepturi fugit animi nobis voluptatum laudantium fuga.`,
      price: price,
    });
    await camp.save();
  }
};

seedDB();
