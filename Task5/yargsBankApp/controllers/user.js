const validator = require('validator');
const chalk = require('chalk')
const dealWithJson = require('./dealWithJson')
const findUserIndex = () => {
    let i =users.findIndex()
}

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

const showUser = (userData) => {
    console.log(chalk.green(`Name: ${userData.userName} - Account No.: ${userData.accountNo} - Initial Balance: ${userData.iniBalance} - Remaining Balance: ${userData.remBalance}`))
}

module.exports={addUser, showUser}