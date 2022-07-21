const async = require('hbs/lib/async')
var db = require('../config/connection')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const { resolve } = require('promise')
var objectId = require('mongodb').ObjectId

module.exports={

    getExamNames:()=>{
        return new Promise(async(resolve,reject)=>{
            let exams=await db.get().collection('exams').find().toArray()
            resolve(exams)
        })
        
    },
    loginCheck:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus= false
            let response= {}
            
            let user= await db.get().collection('users').findOne({email:data.email})
            if(user){
                bcrypt.compare(data.password,user.password).then((status)=>{
                    if(status){
                        response.user= user
                        response.status=true
                        console.log("credentials are correct")
                        resolve(response)
                    }else{
                        console.log("Credentials do not match")
                        resolve({status:false})
                    }
                })
            }else{
                console.log("user not found")
                resolve({status:false})
                
            }
        })
    },
    addUser: (userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password= await bcrypt.hash(userData.password,10)
            console.log(userData)
            db.get().collection('users').insertOne(userData).then((response)=>{
                
                resolve(response)
            })
        }) 
    },
}