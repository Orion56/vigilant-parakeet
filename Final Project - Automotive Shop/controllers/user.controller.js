const carModel = require('../db/models/car.model')
const userModel = require('../db/models/user.model')
const Car = require('./car.controller')
class User{
    static add = async (req, res) => {
        try {
            const user = new userModel(req.body)
            await user.save()
            res.status(200).send({
                apiStatus: true,
                data: user,
                message:'user added'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:"can't add user"
            })
        }
    }
    static showAll = async (req, res) => {
        try {
            const users = await userModel.find().sort({ updatedAt: -1 })
            if(!users)throw new Error("no users in the db")
            res.status(200).send({
                apiStatus: true,
                data: [{"Total_no":users.length}, users],
                message:'All users are shown'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:"can't show users"
            })
        }
    }
    static showSngl = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id)
            if (!user) throw new Error('invalid user id')
            res.status(200).send({
                apiStatus: true,
                data: user,
                message:'user details is shown'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error showing user details'
            })
        }
    }
    static delSngl = async (req, res) => {
        try {
            const user = await userModel.findByIdAndDelete(req.params.id)
            if(!user) throw new Error ('invalid user id')
            res.status(200).send({
                apiStatus: true,
                data: user,
                message:'user deleted'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error deleting user'
            })
        }
    }
    static delAll = async (req, res) => {
        try {
            const users = await userModel.deleteMany()
            res.status(200).send({
                apiStatus: true,
                data: users,
                message:'All users deleted'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error deleting All users'
            })
        }
    }
    static editSngl = async (req, res) => {
        try {
            let user = await userModel.findByIdAndUpdate(req.params.id,req.body,{runValidators:true})
            if (!user) throw new Error('invalid user id')
            user = await userModel.findById(req.params.id)
            await user.save()
            res.status(200).send({
                apiStatus: true,
                data: user,
                message:'user data has been updated'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error updating user data'
            })
        }
    }
    static edit = async (req, res) => {
        try {
            let user = await userModel.findByIdAndUpdate(req.user._id, req.body, { runValidators: true })
            user = await userModel.findById(req.user._id)
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "user edited"
            })
        }
        catch (error) {
        res.status(500).send({
            apiStatus: false,
            errors: error.message,
            message:'error editing user data'
        })
        }
    }
    /* static editAll = async (req, res) => {
        try {
            const users = await userModel.find()
            if (users.length == 0) throw new Error('no users to edit')
            const update = req.body
            users.forEach(c => {
                //c.condition = update.condition
                let userKeys = Object.keys(update)
                userKeys.forEach(k => c[k] = update[k])
                c.save()//[!]: it works without await !?
            })
            res.status(200).send({
                apiStatus: true,
                data: users,
                message:'ALL users data has been updated'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error updating ALL users data'
            })
        }
    } */
    static login = async (req, res) => {
        try {
            const user = await userModel.loginUser(req.body.email, req.body.password)
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus: true,
                data: { user, token },
                message:"logged in"
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message: "error logging in"
            })  
        }
    }
    static loginAdmin = async (req, res) => {
        try {
            const user = await userModel.loginUser(req.body.email, req.body.password)
            if(!user.admin) throw new Error('Invalid credentials')
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus: true,
                data: { user, token },
                message:"logged in"
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message: "error logging in"
            })  
        }
    }
    static logOut = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token)
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: "",
                message: 'logged out'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:"error logging out"
            })
        }
    }
    static bookCar = async (req, res) => {
        try {
            const user = req.user
            const car = await carModel.findById(req.params.carId)
            if (!car) throw new Error('invalid car id')
            if(car.status===false) throw new Error('car is not available')
            const cars = user.bookedCars
            /* const prevBkd = cars.find(element => {
                return element.toString() === car._id.toString()
            })
            if(prevBkd !== undefined) throw new Error('Car already booked') */
            cars.push(car)
            await user.save()
            car.status = false
            await car.save()
            res.status(200).send({
                apiStatus: true,
                data: car,
                message: 'car booked'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:"error booking car"
            })
        }
    }
    static myCars = async (req, res) => {
        try {
            const user = req.user
            const cars = user.bookedCars
            res.status(200).send({
                apiStatus: true,
                data: cars,
                message: 'All user cars are shown'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:"error showing user cars"
            })
        }
    }
    static delCar = async (req, res) => {
        try {
            const user = req.user
            let userCars = user.bookedCars.length;
            user.bookedCars = user.bookedCars.filter(ele => ele.toString() !== req.params.carId.toString())
            if(userCars===user.bookedCars.length) throw new Error('invalid car id')
            await user.save()
            res.status(200).send({
                apiStatus: true,
                data: "car",
                message: 'car deleted'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:"error deleting car"
            })
        }
    }
}

module.exports = User
