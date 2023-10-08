const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {        
        const existingUser = await userModel.findOne({ email: req.body.email })
        // Validation
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'User Already exists'
            })
        }
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword

        // rest Data

        const user = new userModel(req.body)
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        })
    } catch (error) {
        console.log("error");
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error
        })
    }
};

// login Call Back

const loginController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Credential'
            })
        }
        // Check role
        if (existingUser.role !== req.body.role) {
            return res.status(500).send({
                success: false,
                message: "role Dosn't matched"
            })
        }

        // compare password
        const comparePassword = bcrypt.compare(req.body.password, existingUser.password)
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Credential'
            })
        }
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send({
            success: true,
            message: 'Login successfully',
            token,
            user : existingUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login Api',
            error
        })
    }
}

// Current User

const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        return res.status(200).send({
            success: true,
            message: "User Fetched Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Unable to get current user",
            error
        })
    }
}

module.exports = { registerController, loginController, currentUserController }