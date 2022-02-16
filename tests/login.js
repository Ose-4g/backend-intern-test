process.env.NODE_ENV = 'test'
const {testUser} = require('./mocks')
const chai = require('chai')
const chatHttp = require('chai-http')
const server = require('../app')
const User = require('../models/User')
const assert = chai.assert
const bcrypt = require('bcryptjs')

const {firstName, lastName, email, password, phoneNumber} = testUser
chai.use(chatHttp)

describe('Login tests',()=>{
    before(async()=>{
        try {
            await User.destroy({
                where:{
    
                }
            })

            const hash = await bcrypt.hash(password,10);
            //create a new user
            await User.create({
                email,
                firstName,
                lastName, 
                password: hash,
                phoneNumber
            })
        } catch (error) {
            console.log('.')
        }
    })
    after(async()=>{
        try {
            await User.destroy({
                where:{}
            })
        } catch (error) {
            console.log('.')
        }
        
    })
    it('Should throw error when email is missing',(done)=>{
        chai
        .request(server)
        .post('/auth/login')
        .send({password})
        .end((err,res)=>{
            assert.equal(res.status,400)
            assert.include(res.body.message.toLowerCase(),'email')
            done()
        })
    })

    it('Should throw error when password is missing',(done)=>{
        chai
        .request(server)
        .post('/auth/login')
        .send({email})
        .end((err,res)=>{
            assert.equal(res.status,400)
            assert.include(res.body.message.toLowerCase(),'password')
            done()
        })
    })

    it('Should throw error when email doesnt exist',(done)=>{
        chai
        .request(server)
        .post('/auth/login')
        .send({email:'test34@gmail.com', password})
        .end((err,res)=>{
            assert.equal(res.status,404)
            assert.include(res.body.message.toLowerCase(),'not exist')
            done()
        })
    })

    it('Should throw error when wrong password is provided',(done)=>{
        chai
        .request(server)
        .post('/auth/login')
        .send({email, password:'wrong password'})
        .end((err,res)=>{
            assert.equal(res.status,401)
            assert.include(res.body.message.toLowerCase(),'invalid')
            done()
        })
    })


    it('It should be successful when the values are all valid',(done)=>{
        chai
        .request(server)
        .post('/auth/login')
        .send({password,email})
        .end((err,res)=>{
            console.log(email,password)
            assert.equal(res.status,200)
            assert.include(res.body.message.toLowerCase(),'success')
            done()
        })
    })
})