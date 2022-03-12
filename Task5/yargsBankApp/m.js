const fun1 = () => {
    console.log('fun1')
}
const fun2 = () => {
    console.log('fun2')
}
//module.exports = { fun1, fun2 }; //={fun1:fun1, fun2:fun2}

const add = (x, y) => {
    return x + y 
}
const sub = (x, y) => {
    return x - y 
}
const multiply = (x, y) => {
    return x * y 
}
const divide = (x, y) => {
    return x / y 
}

module.exports = { add, sub, multiply, divide, fun1, fun2 }
