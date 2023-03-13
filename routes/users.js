var express = require('express');
const { ReadConcern } = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  let findUser = "Evelina"
  req.app.locals.db.collection('users').find({"firstName": findUser}).toArray()
  .then(results => {
    console.log(results);

    let printUsers = `<div><h2>Våra användare</h2>`

    for(user in results){
      printUsers += `<div>` + results[user].firstName + `</div>`
    }

    printUsers += `</div>`

    res.send(printUsers);
  })

});

router.post('/add', function(req, res){
  req.app.locals.db.collection('users').insertOne(req.body)
  .then(result => {
    console.log(result)
    res.redirect('/show')
  })
})

module.exports = router;
