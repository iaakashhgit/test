const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const RaftLabsSchema = new Schema({
    _id: { type: String },
    name: String,
    age: Number,
    address: String,
    location: String,
    email : String,
    password : String
},
    {
        versionKey: false,
        timestamps: {
            createdAt: '_created_at',
            updatedAt: '_updated_at'
        },
    }
)

module.exports = mongoose.model('RaftLabs', RaftLabsSchema, 'RaftLabs')