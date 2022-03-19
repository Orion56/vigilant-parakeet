const fs = require('fs')
const chalk=require('chalk')

const writeData = (data) => {
fs.writeFileSync('customer_data.json',JSON.stringify(data))
}
const readData = () => {
    let dataFile
        try {
            dataFile = fs.readFileSync('customer_data.json')
        } catch (error) {
            console.log(chalk.red('customer_data.json is not found!'))
        }
    let data
    try {
        data = JSON.parse(dataFile)
        if(!Array.isArray(data)) throw new Error('data is not array')
    } catch (error) {
        data = []
        writeData(data)
        console.log(chalk.green('new customer data file was created'))
    }
    return data
}

module.exports = { writeData, readData }
