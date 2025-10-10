const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req,res) =>{
    res.send('Hello World')
})

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


app.get('/api/tours', (req,res) => {
    res.json(tours);
})

app.listen(PORT, () =>{
    console.log(`Mock API is running  on localhost listening on port ${PORT}`);
})
