const RaftLabsSchema = require('../models/raftLabsModel')
const bcrypt = require('bcrypt');
const accessToken = require('../auth/auth');
const UUID  = require('uuid')

const registerUser = async (req,res) => {
    try {
         const { name, age, address, location ,email,plainPass} = req.body;
        let saveObj = {
            _id:UUID.v4(),
            name , 
            age , 
            address , 
            location,
            email
        }
        let saltRounds = 1;
        await bcrypt.hash(plainPass, saltRounds).then(function (hash) {
               saveObj["password"] = hash
        });

        RaftLabsSchema.create(saveObj) ;

        return res.status(201).json({ data: saveObj });
    } catch (error) {
        console.log("register error",error)
        return res.status(500).json({ error: "Failed to register User" })
    }
  }

  const login = async (req, res) => {
   try {
    const { email, password: givenPassword } = req.body;
    let userData = await RaftLabsSchema.findOne({email}); 
      if(!userData){
        return res.status(400).json({ error: "User not found for this email id" })
      }

      const storedPassword = userData.password;
      const isPasswordMatch = bcrypt.compare(givenPassword,storedPassword);
      if(!isPasswordMatch){
        return res.status(400).json({ error: "Bad Credentials, password not matched!!!!" })
      }else{
         let generateToken = accessToken.generateAccessToken(email)
        return res.status(200).json({ message: "successful login!!!!", email,generateToken, })

      }
   } catch (error) {
    console.log(error);
   }
  }

  module.exports = {login, registerUser}