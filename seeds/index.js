const mongoose = require('mongoose');
const cities= require('./cities');
const {places, descriptors}= require('./seedHelpers');
const Campground=require('../models/campground');



mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true        
});

const db=mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample= array => array[Math.floor(Math.random() * array.length)];

const seedDB= async () => {
    await Campground.deleteMany({});
    for(let i=0; i<200; i++){
        const random1000= Math.floor(Math.random() * 1000);
        const price= Math.floor(Math.random() * 20) + 10;
        const camp= new Campground({
            //YOUR USER ID
            author: '631b3afee26e654ec676ba61',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat magni necessitatibus laudantium. Ut deserunt ex sit maiores non quia, voluptates error vel. Saepe cupiditate in quia voluptatem. Quia, necessitatibus distinctio.',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude 
                ]

            },
            images: [
                {
                  url: 'https://res.cloudinary.com/shubhmehtani/image/upload/v1662813449/YelpCamp/oagzpphg8zfsbu4unmtv.jpg',
                  filename: 'YelpCamp/oagzpphg8zfsbu4unmtv',
                },
                {
                  url: 'https://res.cloudinary.com/shubhmehtani/image/upload/v1662813449/YelpCamp/vy7q3zn0gbzrojd2svkf.jpg',
                  filename: 'YelpCamp/vy7q3zn0gbzrojd2svkf',
                }
              ]
        })
        await camp.save();
    }
};


seedDB().then(() => {
    db.close();
})