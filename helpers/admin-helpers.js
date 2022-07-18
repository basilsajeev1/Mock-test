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

    }
}