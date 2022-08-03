var express = require('express');
var router = express.Router();
var adminHelpers = require('../helpers/admin-helpers')
const async = require('hbs/lib/async');
const { resolve } = require('promise');
const { response } = require('../app');
var db = require('../config/connection')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/admin-login',{admin:true, loginErr:req.session.loginErr});
  req.session.loginErr=false
});

router.post('/', (req,res)=>{
  adminHelpers.loginCheck(req.body).then((response)=>{
    if (response.status) {
      //req.session.admin.loggedIn = true
      adminData = response.admin
      //console.log(adminData)
      res.render('admin/admin-index',{admin:true, adminData});
      

    } else {
      req.session.loginErr = "Invalid Email or Password"
      res.redirect('/admin')
    }
  })
});

router.get('/admin-index',(req,res)=>{
  
    res.render('admin/admin-index',{admin:true, adminData})
    
})

router.get('/exams',async(req,res)=>{
  await adminHelpers.getExamDetails().then((exams)=>{
    //console.log(exams)
    res.render('admin/exams',{admin:true,exams, adminData})
  })
  
})

router.get('/add-exam',(req,res)=>{
  
    res.render('admin/add-exam',{admin:true, adminData})
    
})

router.post('/add-exam',async(req,res)=>{
  await adminHelpers.addExam(req.body).then((response)=>{
    if(response.status){
    
    res.redirect('/admin/exams')
    }
  })  
})

router.get('/view-questions/:examId',async(req,res)=>{
    
  await adminHelpers.getExamName(req.params.examId).then((examDetails)=>{
  res.render('admin/questions',{examDetails, admin:true, adminData})        
})   
})

router.get('/delete-exam/:examId',async(req,res)=>{
   await adminHelpers.deleteExam(req.params.examId).then((response)=>{
      res.json({status:true})
   })
})

router.get('/mcqs/:examId',async(req,res)=>{
  examId=req.params.examId
  await adminHelpers.getMcqs(examId).then((mcqs)=>{
    res.render('admin/mcqs',{examId,mcqs, admin:true, adminData, mcqstatus:req.session.mcqstatus}) 
    req.session.mcqstatus=false
  })
  
  
})

router.get('/add-mcq/:examId',async(req,res)=>{
  examId=req.params.examId
  res.render('admin/add-mcq',{examId,admin:true, adminData}) 
  
})

router.post('/add-mcq',async(req,res)=>{
    await adminHelpers.addMcq(req.body).then((examId)=>{
      //console.log("reached back to router")
      //console.log(examId)
      req.session.mcqstatus="MCQ added successfully"
      res.redirect('/admin/mcqs/'+examId)
      
    })
})

router.get('/edit-mcq:qId',async(req,res)=>{
  await adminHelpers.getMcqDetails(req.params.qId).then((mcqData)=>{
     res.render('admin/mcq-details',{mcqData, admin:true, adminData}) 
  })
})

router.post('/edit-mcq',async(req,res)=>{
  await adminHelpers.updateMcq(req.body).then((response)=>{
    req.session.mcqstatus="MCQ updated successfully"
    res.redirect('/admin/mcqs/'+req.body.examId)
  })
})

router.get('/delete-mcq:qId',async(req,res)=>{
  await adminHelpers.deleteMcq(req.params.qId).then((response)=>{
    res.json({status:true})
  })
})

router.get('/essays/:examId',async(req,res)=>{
  examId=req.params.examId
  await adminHelpers.getEssays(examId).then((essays)=>{
    res.render('admin/essays',{examId, essays, admin:true, adminData,essayStatus:req.session.essayStatus}) 
    req.session.essayStatus=false
  })
})

router.get('/add-essay/:examId',async(req,res)=>{
  examId=req.params.examId
  res.render('admin/add-essay',{examId,admin:true, adminData}) 
  
})

router.post('/add-essay',async(req,res)=>{
  await adminHelpers.addEssay(req.body).then((examId)=>{
    //console.log("reached back to router")
    //console.log(examId)
    req.session.essayStatus="Essay added successfully"
    res.redirect('/admin/essays/'+examId)
    
  })
})

router.get('/edit-essay:qId',async(req,res)=>{
  await adminHelpers.getEssayDetails(req.params.qId).then((essayData)=>{
     res.render('admin/essay-details',{essayData, admin:true, adminData}) 
  })
})

router.post('/edit-essay',async(req,res)=>{
  await adminHelpers.updateEssay(req.body).then((response)=>{
    req.session.essayStatus="Essay updated successfully"
    res.redirect('/admin/essays/'+req.body.examId)
  })
})

router.get('/delete-essay:qId',async(req,res)=>{
  await adminHelpers.deleteEssay(req.params.qId).then((response)=>{
    res.json({status:true})
  })
})

router.get('/users',async(req,res)=>{
  await adminHelpers.getUserDetails().then((users)=>{
    //console.log(exams)
    res.render('admin/users',{admin:true,users, adminData})
  })
  
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/admin')
})

module.exports = router;
