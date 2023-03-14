var express = require('express');
const { ReadConcern } = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  req.app.locals.db.collection('cars').find().sort({"carMake": 1}).toArray()
  .then(results => {
    console.log(results);

    let printCars = `<div><h2>Våra bilar</h2>`

    for(car in results){
      printCars += `<div>` + results[car].carsVin + `|` + results[car].carMake + `|` + results[car].carColor + `</div>`
    }

    printCars += `</div>`

    res.send(printCars);
  })

  req.app.locals.db.collection('cars').updateMany({"carMake": "Audi"}, {$set: {"carMake": "Aaaudi"}})
    .then(results => {
      console.log(results)
    }
      )

});

router.post('/add', function(req, res){
  req.app.locals.db.collection('cars').insertMany(req.body)
  .then(result => {
    console.log(result)
    res.redirect('/show')
  })
})

module.exports = router;
