const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/camps') //connects models


mongoose.connect('mongodb://localhost:27017/camp-my');

//error checking for db
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62a0298293160deffcb5a456',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ipsa possimus repellendus veritatis voluptates cupiditate illo deleniti, tenetur tempora temporibus? Quam at modi iusto vel. Eum commodi vitae saepe non.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/camp-my/image/upload/v1654745183/Camp-my/jbgut5jzg8tuifo3dxhl.webp',
                  filename: 'Camp-my/jbgut5jzg8tuifo3dxhl',

                }
              ]
        })

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()

});