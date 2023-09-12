const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// Create Inventory 
const creatInventoryController = async (req, res) => {
    try {
        const { email, inventoryType } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error('User Not Found')
        }
        if (inventoryType === "in" && user.role !== "donar") {
            throw new Error('Not a donar account')
        }
        if (inventoryType === "out" && user.role !== "hospital") {
            throw new Error('Not a hospital')
        }

        const inventory = new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success: true,
            message: "New Blood record Added"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: true,
            mesaage: 'Error in create Inventory API',
            error
        })
    }
}

// Get All blood records
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({ organisation: req.body.userId }).populate('donar').populate('hospital').sort({ createdDt: -1 })
        return res.status(200).send({
            success: true,
            message: "All records fetch successfully",
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            mesaage: "Error in get all Inventory"
        })
    }
}

module.exports = { creatInventoryController, getInventoryController }