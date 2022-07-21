var express = require('express');
const async = require('hbs/lib/async');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
var db = require('../config/connection')

/* GET home page. */
router.get('/', async function(req, res, next) {
 await userHelpers.getExamNames().then((exams)=>{
    res.render('user/index', {  exams });
  })  
});

router.post('/', async(req,res)=>{
  await userHelpers.loginCheck(req.body).then((response)=>{
    if (response.status) {
      //req.session.admin.loggedIn = true
      req.session.user=response.user
      userData = req.session.user
      //console.log(adminData)
      res.redirect('/user-home');
      

    } else {
      req.session.loginErr = "Invalid Email or Password"
      res.redirect('/')
    }
  })
});

router.get('/user-home',async(req,res)=>{
  await userHelpers.getExamNames().then((exams)=>{
    res.render('user/user-home', { userData, exams });
  })  
})

router.get('/register',(req,res)=>{
  res.render('user/register')
})

router.post('/register',async(req,res)=>{
  await userHelpers.addUser(req.body).then(async(response)=>{
    userData= await db.get().collection('users').findOne({_id:response.insertedId})
    res.redirect('/user-home')
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
