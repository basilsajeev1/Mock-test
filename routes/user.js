var express = require('express');
const async = require('hbs/lib/async');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
var db = require('../config/connection')
const { ObjectId } = require('mongodb')
var objectId = require('mongodb').ObjectId

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

router.get('/exam-info:examId',async(req,res)=>{
  await userHelpers.getExamData(req.params.examId).then((examData)=>{
    time= examData.time
    res.render('user/exam-info',{examData, userData})
  })
})

router.get('/exam:examId',async(req,res)=>{
   
   await userHelpers.getMcqs(req.params.examId).then((mcqs)=>{
     exam=req.params.examId
     res.render('user/exam',{mcqs, exam, userData, time})
     
   })
})

router.post('/exam',async(req,res)=>{
  
    //console.log(req.body)
    await userHelpers.calculateScore(req.body).then((score)=>{
        //exam="ObjectId('"+exam+"')"
        exam=ObjectId(exam)
        userHelpers.saveScore(score,userData._id, exam)
        res.render('user/result',{score, userData})
    })
})

router.get('/scores',async(req,res)=>{
  await userHelpers.getScores(userData._id).then((scores)=>{
     res.render('user/scores',{scores, userData})
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
