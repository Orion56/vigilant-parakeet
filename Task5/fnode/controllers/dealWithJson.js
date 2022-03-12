const fs = require('fs')

const writeData = (data) => {
    fs.writeFileSync('data.json',JSON.stringify(data))
}
const readData = () => {
    let data
    try {
        data = JSON.parse(fs.readFileSync('data.json'))
    } catch (error) {
        data = []
    }
    return data
}

module.exports = { writeData, readData }
