const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        require: [true, "role is required"],
        enum: ['admin', 'organisation', 'donar', 'hospital']
    },
    name: {
        type: String,
        require: function () {
            if (this.role === 'user' || this.role === 'admin') {
                return true
            }
            return false
        }
    },
    organisationName: {
        type: String,
        require: function () {
            if (this.role === 'organisation') {
                return true
            }
            return false
        }
    },
    hospitalName: {
        type: String,
        require: function () {
            if (this.role === 'hospital') {
                return true
            }
            return false
        }
    },
    email: {
        type: String,
        require: [true, 'Email is requires'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    },
    website: {
        type: String
    },
    address: {
        type: String,
        require: [true, 'Address is required']
    },
    phone: {
        type: String,
        require: [true, 'Phone is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema)