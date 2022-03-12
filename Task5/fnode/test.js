const chalk = require('chalk')
/*
//console.log('hello world')

const myModu = require('./m')
myModu.fun2()
myModu.fun1()


// const myFs = require('fs')
// myFs.writeFileSync('a.txt', 'hello world')

const val = require('validator')

//function to check float
let fnVali = () => {
    return val.isFloat('omar')
}

const chalk = require('chalk')
console.log(chalk.blue('Hello world!'))

//to use log instead of console.log
const log = console.log;

log(chalk.blue.bgRed.bold('Hello world!'));
console.log(chalk.blue(fnVali()));
log(chalk.blue.bgRed.bold(myModu.add(5,2)))

//function to filter arrays against any conditional funtion
let  arr = [1, 2,"3","4", 5, 6,"7",8,"9"];
function even(el) {
    return el % 2 === 0;
}
// arr = arr.map(Number)
const filteredArr = (array, fn) => {
    array = array.map(Number).filter(fn)
    return console.log(array)
}
filteredArr(arr,even);
*/

/* const myConverter = (fahrenheit) => {
    return {
        fahrenheit,
        kelvin: (fahrenheit + 459.89) * (5 / 9),
        celsius: (fahrenheit + 32) * (5/9)
    }
}

const myKelvinConv = (temp) => console.log(`Kelvin = ${myConverter(temp).kelvin}`)
const myCelsiusConv = (temp) => console.log(`Celsius = ${chalk.white.bgRed.bold((myConverter(temp).celsius))}`)

myKelvinConv(74)
myCelsiusConv(74)
 */

//generate a list of Restaurants & check available seats for a party
const checkAvailability = function (partySize) {
    let seatsLeft = this.guestCapacity - this.guestCount
    if (partySize <= seatsLeft) {
        console.log(chalk.bgGreen.bold('available seats = ' + seatsLeft))
    }
    else {
        console.log(chalk.bgRed.bold('no available seats'))
    }
}
restaurant={}
restaurantList =[]
i = 0;
while (i < 10) {
    restaurant = {
        name: 'Restaurant '+(i+1),
        guestCapacity: 10 + 20*i,
        guestCount: 5*i,
        checkAvailability
    }
    restaurantList.push(restaurant);
    i++
}
restaurantList.forEach(element => {
    console.log(element.name)
    element.checkAvailability(110) 
})