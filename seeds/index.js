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
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "65735a200be862c745b4dec1",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dsprnjo2q/image/upload/v1703164568/YelpCamp/pars-sahin-V7uP-XzqX18-unsplash_xx0sic.jpg",
          filename: "YelpCamp/pars-sahin-V7uP-XzqX18-unsplash_xx",
        },
        {
          url: "https://res.cloudinary.com/dsprnjo2q/image/upload/v1703164568/YelpCamp/josh-hild-8f_VQ3EFbTg-unsplash_zubctq.jpg",
          filename: "YelpCamp/josh-hild-8f_VQ3EFbTg-unsplash_zubctq",
        },
        {
          url: "https://res.cloudinary.com/dsprnjo2q/image/upload/v1703164570/YelpCamp/wren-meinberg-xqV9QdGOSas-unsplash_q3nl17.jpg",
          filename: "YelpCamp/wren-meinberg-xqV9QdGOSas-unsplash_q3nl17",
        },
      ],
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam tempore velit vel dignissimos reprehenderit quam, ipsum eligendi quos eum molestias, eius at, aliquid excepturi fugit animi nobis voluptatum laudantium fuga.`,
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB();
