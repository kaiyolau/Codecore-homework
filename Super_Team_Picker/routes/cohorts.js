const express = require('express');
const knex = require('../db/clients');

const router = express.Router()


//------------------------Index of all Posts: ---------------
// the below path automatically assumes that is has the '/cohorts' prefixed to it
router.get('/', (req,res) => {
   console.log("wtf12")
  knex('cohorts')
  .orderBy('id', 'desc')
  .then(cohorts => {
    res.render('cohorts/index', {cohorts: cohorts})
  })
})

//------------ Render New Post Template----------------
router.get('/new', (req, res) => {
  //read file and open the file on the browswer
  res.render('cohorts/new', { cohort: false });
})

//----------------Create new Post------------------------
router.post('/', (req, res) => {
  console.log("We are Here")
  console.log(req)
  knex('cohorts')
  .insert({
    name: req.body.name,
    logoUrl: req.body.logoUrl,
    members: req.body.members
  })
  .returning('*')
  .then(cohorts => {
    console.log(cohorts)
    //read url and open url
    res.redirect("/cohorts/")
  })
})


//-----------------Show a single Post----------------------
router.get('/:id', (req, res) => {
    knex('cohorts')
    .where("id", req.params.id)
    .first()
    .then( (cohort) => {
      if (!cohort) {
        res.send('No cohort found')
      } else {
        res.render("cohorts/show", {cohort: cohort})        
      }
    })
})

// ------------------Render Edit Post Template--------------
router.get('/:id/edit', (req, res) => {
  knex('cohorts')
  .where('id', req.params.id)
  .first()
  .then(cohort => {
    res.render('cohorts/edit', {cohort: cohort})
  })
})

//---------------------Update particular Post---------------
router.patch('/:id', (req, res) => {
  knex('cohorts')
  .where('id', req.params.id)
  .update({
    name: req.body.name,
    logoUrl: req.body.logoUrl,
    members: req.body.members
  })
  .then(() => {
    res.redirect(`${req.params.id}`)
  })
})


//--------------Delete/Destroy particular--------------
router.delete("/:id", (req, res) => {
  knex('cohorts')
  .where('id', req.params.id)
  .del()
  .then(() => {
    res.redirect('/cohorts')
  })
})





















// Remember to export this file as the router, which will be required in
// index.js for all routes related to cohorts:
module.exports = router;