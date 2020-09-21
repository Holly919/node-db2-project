const express = require('express');
const db = require('../data/db-config.js');


const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve cars' });
    });
});


// router.get('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//       const cars = await db.select('*').from('cars').where({ id }).first();
//       if (cars) {
//           res.status(200).json(cars);
//       } else {
//           res.status(400).json({ message: "Car not found" });
//       }
//   } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "sorry, ran into an error" });
//   }
// });


router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('cars').where({ id }).first()
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve car info' });
    });
});

router.post('/', (req, res) => {
  const carData = req.body;
  db('cars').insert(carData)
    .then(ids => {
      db('cars').where({ id: ids[0] })
        .then(newcarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      console.log('POST error', err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

module.exports = router;