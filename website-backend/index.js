const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

let tours = [
  {
    id: 1,
    title: "Travel to Alakol Lake",
    description: "Experience the beauty of Kazakhstan's lakes.",
    photo: "/public/images/alakol-lake.jpg"
  },
  {
    id: 2,
    title: "Discover Charyn",
    description: "Explore the culture and cuisine of Almaty.",
    photo: "/public/images/Charyn.avif"
  },
  {
    id: 3,
    title: "Kaindy Lake",
    description: "Good place to go guys",
    photo: "/public/images/kaindy-lake.jpeg"
  }
];

let tourDetails = [
  {
    id: 1,
    title: "Travel to Alakol Lake",
    location: "East Kazakhstan Region",
    duration: "3 days / 2 nights",
    price: 350,
    description:
      "Enjoy the stunning Alakol Lake, known for its therapeutic waters and beautiful pebble beaches. The tour includes a boat trip, local cuisine tasting, and accommodation near the lake.",
    highlights: [
      "Boat ride on Alakol Lake",
      "Traditional Kazakh dinner",
      "Visit to thermal springs"
    ],
    photoGallery: [
      "/public/images/alakol-lake.jpg",
      "/public/images/alakol-sunset.jpg",
      "/public/images/alakol-boat.jpg"
    ]
  },
  {
    id: 2,
    title: "Discover Charyn Canyon",
    location: "Almaty Region",
    duration: "1 day trip",
    price: 180,
    description:
      "Visit the majestic Charyn Canyon, often called the 'Grand Canyon of Kazakhstan'. You will explore the Valley of Castles and enjoy breathtaking views of red rock formations.",
    highlights: [
      "Walk through Valley of Castles",
      "Local picnic near the canyon",
      "Professional guide included"
    ],
    photoGallery: [
      "/public/images/Charyn.avif",
      "/public/images/charyn-canyon2.jpg",
      "/public/images/charyn-canyon3.jpg"
    ]
  },
  {
    id: 3,
    title: "Kaindy Lake Adventure",
    location: "Kolsai National Park",
    duration: "2 days / 1 night",
    price: 270,
    description:
      "A mysterious lake with submerged trees. Explore Kaindy Lake and nearby Kolsai lakes with professional guides and scenic hiking routes.",
    highlights: [
      "Hike around Kaindy Lake",
      "Overnight in Kolsai village",
      "Horse riding optional"
    ],
    photoGallery: [
      "/public/images/kaindy-lake.jpeg",
      "/public/images/kaindy-forest.jpg",
      "/public/images/kaindy-hike.jpg"
    ]
  }
];

app.get('/api/tours', (req, res) => {
  res.json(tours);
});

app.get('/api/tours/:id', (req, res) => {
  const tourId = parseInt(req.params.id);
  const tour = tourDetails.find((t) => t.id === tourId);

  if (!tour) {
    return res.status(404).json({ message: 'Tour not found' });
  }

  res.json(tour);
});

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
