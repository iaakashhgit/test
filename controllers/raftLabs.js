const UUID = require('uuid')
const RaftLabsSchema = require('../models/raftLabsModel')
const bcrypt = require('bcrypt');
const accessToken = require('../auth/auth');
const Redis = require('../helper/redis')

const raftLabsCreate = async (req, res) => {
    try {
        let { name, age, address } = req.body
        let obj = {
            _id: UUID.v4(),
            Name: name,
            Age: age,
            Address: address
        }
        await new RaftLabsSchema(obj).save()
        return res.status(200).json({ message: "Data Created successfully" })
    } catch (error) {
        console.log("raftLabsCreate error: ", error)
    }
}

const getData = async (req, res) => {
    try {
        let { email } = req.body
        const redis = new Redis();
        let userData;
        let dataRedis = await redis.get(email);
        console.log("\n\n1st time redis data = = = =  = ", dataRedis)
        if (!dataRedis) {
            userData = await RaftLabsSchema.findOne({ email }, { password: 0 }).sort({ _created_at: -1 })
            redis.set(email, JSON.stringify(userData))
        }
        let data = dataRedis ? JSON.parse(dataRedis) : userData
        return res.status(200).json({ message: "Data Created successfully", data: data })
    } catch (error) {
        console.log("getData: error", error)
    }
}

const updateData = async (req, res) => {
    try {
        let body = req.body
        if (body.searchId) {
            await RaftLabsSchema.updateOne({ _id: body.searchId }, { $set: { Location: body.location } })
            return res.status(200).json({ message: "Document updated successfully" });
        }
    } catch (error) {
        console.log("updateData error:", error)
    }
}

const deleteData = async (req, res) => {
    try {
        const deleteId = req.query._id
        const deletedData = await RaftLabsSchema.findByIdAndDelete(deleteId)
        if (!deletedData) {
            return res.status(404).json({ message: "Data not found" });
        }
        console.log("Deleted data:", deletedData);
        return res.status(200).json({ message: "Document deleted successfully" })
    } catch (error) {
        console.log("deleteData error:", error)
        return res.status(500).json({ error: "Failed to delete data" })
    }
};

const getAllData = async (req, res) => {
    try { 
        let {pageNumber, limit} = req.body ; 
        skip = (pageNumber - 1) * limit 
        let getData = await RaftLabsSchema.aggregate([
            {
                $match: {
                    age : {$gte : 24}
                }
            },
            {
              $sort : {
                    _created_at : -1
                }
            },  
            {
                $skip : skip 
            },
            {
                $limit :limit ? limit : 5
            },
            {
                $project : {
                    _id : 0
                }
            }
        ]);
        return res.status(200).json({ message: "data", getData })

    } catch (error) {
        console.log("getAllData error: ",error)
    }
}

module.exports = { raftLabsCreate, getData, updateData, deleteData, getAllData }