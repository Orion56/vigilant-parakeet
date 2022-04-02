const carModel = require('../db/models/car.model')
class Car {
    static add = async (req, res) => {
        const{vehicle,qty}=req.body
        try {
            let cars = [];
            for (var i = 0; i < qty; i++) {
                const car = new carModel(vehicle)
                cars.push(car)
                await car.save()
            }
            res.status(200).send({
                apiStatus: true,
                data: cars,
                message:`${qty} cars added`
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error adding new car'
            })
        }
    }
    static showAll = async (req, res) => {
        try {
            const cars = await carModel.find().sort({ updatedAt: -1 })
            if (cars.length==0) throw new Error("there are no cars in the db")
            res.status(200).send({
                apiStatus: true,
                data: [{"total_No": cars.length} , cars],
                message:'all Cars shown'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error showing all cars'
            })
        }
    }
    static showSngl = async (req, res) => {
        try {
            const car = await carModel.findById(req.params.id)
            if (!car) throw new Error('invalid car id')
            res.status(200).send({
                apiStatus: true,
                data: car,
                message:'Car details is shown'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error showing Car details'
            })
        }
    }
    static delSngl = async (req, res) => {
        try {
            //let car =await carModel.findById(req.params.id)
            const car = await carModel.findByIdAndDelete(req.params.id)
            if(!car) throw new Error ('invalid car id')
            res.status(200).send({
                apiStatus: true,
                data: car._id,
                message:'Car deleted'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error deleting Car'
            })
        }
    }
    static delAll = async (req, res) => {
        try {
            const cars = await carModel.deleteMany()
            res.status(200).send({
                apiStatus: true,
                data: cars,
                message:'All Cars deleted'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error deleting All Cars'
            })
        }
    }
    static editSngl = async (req, res) => {
        try {
            const car = await carModel.findByIdAndUpdate(req.params.id,req.body)
            if (!car) throw new Error('invalid car id')
            res.status(200).send({
                apiStatus: true,
                data: car,//[BUG]: car is edited succefully in db but appears in Postman after one more request
                message:'Car data has been updated'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error updating Car data'
            })
        }
    }
    static editAll = async (req, res) => {
        try {
            const cars = await carModel.find()
            if (cars.length == 0) throw new Error('no cars to edit')
            const update = req.body
            cars.forEach(c => {
                //c.condition = update.condition
                let carKeys = Object.keys(update)
                carKeys.forEach(k => c[k] = update[k])
                c.save()//[!]: it works without await !?
            })
            res.status(200).send({
                apiStatus: true,
                data: cars,
                message:'ALL Cars data has been updated'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                errors: error.message,
                message:'error updating ALL Cars data'
            })
        }
    }

}

module.exports = Car
