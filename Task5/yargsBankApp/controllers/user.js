const validator = require('validator');
const chalk = require('chalk')
const dealWithJson = require('./dealWithJson')
const findUserIndex = (users,key,val) => {
    let i = users.findIndex(user => user[key] == val)
    return i
}

const addUser = (userData) =>{
    try{
        if (userData.userName.length < 3) throw new Error("invalid name")
        else {
            const users = dealWithJson.readData()
            users.push(userData)
            dealWithJson.writeData(users)
            console.log(chalk.bgGreen.bold("User Added successfully"))
            showUser(userData)
        }    
    }
    catch(e){
        console.log(chalk.bgRed.bold(e.message))
    }
}

const makeOp = (accNo, opType, money) => {
    //glopally declare users arrar & user object ~ for usage in interall functions
    users = dealWithJson.readData()
    user = users.find(u => u.accountNo == accNo)
    //console.log(user)
    if (user === undefined || user === null)  return console.log(chalk.bgRed('invalid Account No.'))
    if (money == 0)  return console.log(chalk.red('invalid amount of money'))
    if (opType == 'withdraw') {
        if (money > 6000) console.log(chalk.red.bold('maximun withdrawal amoumnt is 6000'))
        else if (money > user.remBalance) console.log(chalk.bgRed.bold('no sufficient balance to complete this transaction'))
        else {
            user.remBalance -= money;
            saveOp(opType,money)
        }
    }
    else if (opType == 'deposit') {
        user.remBalance += money;
        saveOp(opType,money)
    }
    else console.log(chalk.red('please enter a valid operation [withdraw/deposit]'))
}

const mngUser = (accNum, action) => {
    let users = dealWithJson.readData()
    let user = users.find(u => u.accountNo == accNum)
    if (user === undefined || user == null) return console.log(chalk.bgRed('invalid Account No.'))
    if (action == 'showDetails') showUser(user)
    else {console.log(chalk.red('please enter a valid action [showDetails/edit/delete]'))}
}

//functions used internally in this file only
const saveOp = (opType, money) => {
    let userOp = {
        type: opType,
        value: money,
        opDate: (new Date().toUTCString())
    }
    user.operations.push(userOp)
    dealWithJson.writeData(users)
    console.log(chalk.bgGreen.bold('successful transactoin'))
}
const showUser = (userX) => {
    console.log(chalk.green(`Name: ${userX.userName} - Account No.: ${userX.accountNo} - Initial Balance: ${userX.initBalance} - Remaining Balance: ${userX.remBalance}`))
    if(userX.operations.length !== 0) console.log(`Operations done: ${userX.operations}`)
}


module.exports={addUser, makeOp, mngUser}