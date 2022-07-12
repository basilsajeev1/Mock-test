var express = require('express');
var router = express.Router();
var adminHelpers = require('../helpers/admin-helpers')
const async = require('hbs/lib/async');
const { resolve } = require('promise');
const { response } = require('../app');
var db = require('../config/connection')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/admin-login',{admin:true});
});

router.post('/', (req,res)=>{
  adminHelpers.loginCheck(req.body).then((response)=>{
    if (response.status) {
      //req.session.admin.loggedIn = true
      req.session.admin = response.admin
      res.render('admin/admin-index',{admin:true});
      

    } else {
      req.session.loginErr = "Invalid Email or Password"
      res.redirect('/admin')
    }
  })
})

module.exports = router;
