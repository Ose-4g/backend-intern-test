process.env.NODE_ENV = 'test'
const {testUser} = require('./mocks')
const chai = require('chai')
const chatHttp = require('chai-http')
const server = require('../app')
const User = require('../models/User')
const assert = chai.assert

const {firstName, lastName, email, password, phoneNumber} = testUser
chai.use(chatHttp)

describe('Sign up tests',()=>{
    before(async()=>{
        try {
            await User.destroy({
                where:{
    
                }
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
        .post('/auth/signup')
        .send({firstName, lastName, password, phoneNumber})
        .end((err,res)=>{
            assert.equal(res.status,400)
            assert.include(res.body.message.toLowerCase(),'email')
            done()
        })
    })

    it('Should throw error when firstName is missing',(done)=>{
        chai
        .request(server)
        .post('/auth/signup')
        .send({email, lastName, password, phoneNumber})
        .end((err,res)=>{
            assert.equal(res.status,400)
            assert.include(res.body.message.toLowerCase(),'first name')
            done()
        })
    })

    it('Should throw error when lastName is missing',(done)=>{
        chai
        .request(server)
        .post('/auth/signup')
        .send({firstName, email, password, phoneNumber})
        .end((err,res)=>{
            assert.equal(res.status,400)
            assert.include(res.body.message.toLowerCase(),'last name')
            done()
        })
    })

    it('Should throw error when password is missing',(done)=>{
        chai
        .request(server)
        .post('/auth/signup')
        .send({firstName, lastName, email, phoneNumber})
        .end((err,res)=>{
            assert.equal(res.status,400)
            assert.include(res.body.message.toLowerCase(),'password')
            done()
        })
    })

    it('Should throw error when invalid email is provided',(done)=>{
        chai
        .request(server)
        .post('/auth/signup')
        .send({firstName, lastName, password, phoneNumber,email:'myemail.com'})
        .end((err,res)=>{
            assert.equal(res.status,400)
            assert.include(res.body.message.toLowerCase(),'email')
            done()
        })
    })

    it('Should throw error when phoneNumber is missing',(done)=>{
        chai
        .request(server)
        .post('/auth/signup')
        .send({firstName, lastName, password, email})
        .end((err,res)=>{
            assert.equal(res.status,400)
            assert.include(res.body.message.toLowerCase(),'phone number')
            done()
        })
    })

    it('It should be successful when the values are all valid',(done)=>{
        chai
        .request(server)
        .post('/auth/signup')
        .send(testUser)
        .end((err,res)=>{
            assert.equal(res.status,201)
            assert.include(res.body.message.toLowerCase(),'success')
            done()
        })
    })

    it('Should throw error when a duplicate email is provided',(done)=>{
        chai
        .request(server)
        .post('/auth/signup')
        .send(testUser)
        .end((err,res)=>{
            assert.equal(res.status,400)
            assert.include(res.body.message.toLowerCase(),'email')
            done()
        })
    })
})