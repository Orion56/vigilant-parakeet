const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const userSchema = new Schema({
    //type: {type:String,enum:['customer', 'admin'],default:'customer'},
    admin:{type:Boolean,default:false},
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 25
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('invalid email format')
        }
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value, ['ar-EG']))
                throw new Error('invalid phone number')
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8,
        //match: to match certain characters
        validate(value) {
            if (value.includes(this.name))
                throw new Error("YOUR password can't include YOUR name")
        }
    },
    age: {
        type: Number,
        required:true,
        min: 21,
        max: 60
    },
    bookedCars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Car"
    }],
    status: { type: Boolean, default: false },
    tokens: [{ token: { type: String } }]
},
    { timestamps: true }
)

//Api json output
userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}
//encrypt password
userSchema.pre('save', async function () {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, Number(process.env.PassSalt))
})
//user login
userSchema.statics.loginUser = async function (email, password) {
    const user = await this.findOne({ email: email })
    if (!user) throw new Error('invalid email')
    const matched = await bcrypt.compare(password, user.password)
    if (!matched) throw new Error('invalid password')
    return user
}
userSchema.methods.generateToken = async function () {
    //const user = this
    const token = jwt.sign({ _id: this._id }, process.env.TknEncrypKey)
    this.tokens.push({ token })
    await this.save()
    return token
}

module.exports = mongoose.model('User', userSchema,'UserBase')
