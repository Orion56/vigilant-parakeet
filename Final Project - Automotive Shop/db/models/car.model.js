const mongoose = require('mongoose')
const { Schema } = mongoose
//set product model
let carSchema = new Schema({
    condition: {
        type: String,
        trim: true,
        required: true,
        enum: ['New', 'Used']
    },
    maker: {
        type: String,
        trim: true,
        required: true
    },
    model: {
        type: String,
        trim: true,
        required: true
    },
    bodyStyle: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true
        //required: true
    },
    file: {
        type: String,
        trim: true
        //required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true },
)

module.exports = mongoose.model('Car', carSchema,'Garage')

