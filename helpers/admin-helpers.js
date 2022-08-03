const async = require('hbs/lib/async')
var db = require('../config/connection')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const { resolve } = require('promise')
var objectId = require('mongodb').ObjectId

module.exports = {

    loginCheck:(data)=>{
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            //console.log("reached adminhelperlogincheck",data)

            let admin = await db.get().collection('admin').findOne({ "email": data.email ,  "password": data.password })
            if (admin) {

                response.admin = admin
                response.status = true
                console.log("credentials are correct")
                resolve(response)
            } else {
                console.log("Credentials do not match")
                resolve({ status: false })
            }
        })
    },
    getExamDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let exams= await db.get().collection('exams').find().toArray()
            resolve(exams)
        })
    },
    addExam:(examData)=>{
        return new Promise(async(resolve,reject)=>{
            //console.log(examData)
            await db.get().collection('exams').insertOne(examData).then(()=>{
                resolve({status:true})
        })
        })

    },
    deleteExam:(examId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('exams').deleteOne({'_id':ObjectId(examId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getExamName:(examId)=>{
        return new Promise(async(resolve,reject)=>{
            let exam= await db.get().collection('exams').findOne({'_id':ObjectId(examId)})
            resolve(exam)
        })
    },
    addMcq:(mcqDetails)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('mcqs').insertOne(mcqDetails).then(async(response)=>{
                questionId=response.insertedId
                let question= await db.get().collection('mcqs').findOne({'_id':ObjectId(questionId)})
                //console.log(question.examId)
                resolve(question.examId)
            })
        })
    },
    getMcqs:(exam)=>{
        return new Promise(async(resolve,reject)=>{
            mcqs=await db.get().collection('mcqs').find({'examId':exam}).toArray()
            //console.log(mcqs)
            resolve(mcqs)
        })

    },
    getMcqDetails:(qId)=>{
        return new Promise(async(resolve,reject)=>{
            let mcqData= await db.get().collection('mcqs').findOne({'_id':ObjectId(qId)})
            resolve(mcqData)
        })
    },
    updateMcq:(mcqDetails)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('mcqs').updateOne({'_id':ObjectId(mcqDetails.id)},
                {$set:{
                    question:mcqDetails.question,                    
                    option1: mcqDetails.option1,
                    option2: mcqDetails.option2,
                    option3: mcqDetails.option3,
                    option4: mcqDetails.option4,
                    answer: mcqDetails.answer,
                }}
            ).then((response)=>{
                resolve(response)
            })
        })
    },
    deleteMcq:(qId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('mcqs').deleteOne({'_id':ObjectId(qId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    addEssay:(essayDetails)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('essays').insertOne(essayDetails).then(async(response)=>{
                questionId=response.insertedId
                let question= await db.get().collection('essays').findOne({'_id':ObjectId(questionId)})
                //console.log(question.examId)
                resolve(question.examId)
            })
        })
    },
    getEssays:(exam)=>{
        return new Promise(async(resolve,reject)=>{
            essays=await db.get().collection('essays').find({'examId':exam}).toArray()
            //console.log(mcqs)
            resolve(essays)
        })

    },
    getEssayDetails:(qId)=>{
        return new Promise(async(resolve,reject)=>{
            let essayData= await db.get().collection('essays').findOne({'_id':ObjectId(qId)})
            resolve(essayData)
        })
    },
    updateEssay:(essayDetails)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('essays').updateOne({'_id':ObjectId(essayDetails.id)},
                {$set:{
                    question:essayDetails.question,
                    keyword1:essayDetails.keyword1,
                    keyword2:essayDetails.keyword2,
                    keyword3:essayDetails.keyword3,
                    keyword4:essayDetails.keyword4,
                    keyword5:essayDetails.keyword5,
                    keyword6:essayDetails.keyword6,
                    keyword7:essayDetails.keyword7,
                    keyword8:essayDetails.keyword8,
                    keyword9:essayDetails.keyword9,
                    keyword10:essayDetails.keyword10,
                }}
            ).then((response)=>{
                resolve(response)
            })
        })
    },
    deleteEssay:(qId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection('essays').deleteOne({'_id':ObjectId(qId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getUserDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let users= await db.get().collection('users').find().toArray()
            resolve(users)
        })
    },
}