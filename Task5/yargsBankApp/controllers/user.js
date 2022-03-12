const validator = require('validator');
const chalk = require('chalk')
const dealWithJson = require('./dealWithJson')

const addUser = (userData) =>{
    try{
        if(userData.userName.length<3) throw new Error("invalid name")
        const users = dealWithJson.readData()
        users.push(userData)
        dealWithJson.writeData(users)
        console.log(chalk.bgGreen.bold("User Added"))    
    }
    catch(e){
        console.log(chalk.bgRed.bold(e.message))
    }
}

module.exports={addUser}