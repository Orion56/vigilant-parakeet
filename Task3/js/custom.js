/*

//read & check old data > local storage
//receive customer object data > form controls
//push new cutomer data > array of customers
//write new data > local storage

//create table cells for single user
//read & show data > Data table cells
//

const readDataFromStorage= (storageKey)=>{
    let data =[]
    try{
        data = JSON.parse(localStorage.getItem(storageKey)) || []
        if(!Array.isArray(data)) throw new Error("is not array")
    }
    catch(e){
        data= []
    }
    return data
}

const customerData = document.querySelector("#customerData")
let customer = {},customers = []
const tHeads = ['name', 'address', 'age']
const Fsubmitter = function(e){
    e.preventDefault()
    customer = {
        Name: this.elements.name.value,
        Address: this.elements.address.value,
        Age: this.elements.age.value,
    }
    customers.push(customer)
    console.log(customers)
    writeDataToStorage('customers-list', customers);
    tHeads.forEach(head => customer[head]= this.elements[head].value)
    this.reset()
    //window.location.href="users.html"
}

let data = [];
const writeDataToStorage = (storageKey,data)=>{
    localStorage.setItem(storageKey, JSON.stringify(data))
}

const ElCreator = (parent, elementType, txt, classes, attributes=[])=>{
    const element = document.createElement(elementType);
    parent.appendChild(element);
    if (txt) element.innerText = txt;
    if (classes) element.className = classes;
    if(attributes) attributes.forEach(attr => {
        element.setAttribute(attr.attrName, attr.attrVal); 
    })
    return element;
}

const userTable = document.querySelector('#userTable')
//console.log(tHeads)
function showUser(){
    customers = readDataFromStorage('customers-list')
    //let customer = {id:Date.now(), createdAt: new Date()} //{name:"test"}
    const tr = ElCreator(userTable, 'tr', null, null)
    // const td = ElCreator(tr, 'td', i + 1)
    tHeads.forEach(head => ElCreator(tr,'td',customer[head],null,null))
}
    
    if (customerData) customerData.addEventListener("submit", Fsubmitter)
    if(userTable) showUser()
*/

function Cal(x, y) {
    return {
        add() { console.log(x + y) },
        sub() { console.log(x - y) },
        div() { console.log(x / y) }
    }
}

// const Calc = Cal(5,1);
// Calc.add()
// Calc.div()
// Calc.sub()


// console.log(1)
// setTimeout(() => { console.log(2) }, 2000)
// console.log(3)


function getApi(apiLink, callback) {
    fetch(apiLink)
      .then((response) => response.json())
        .then((json) => console.log(json))   
}

getApi(https://jsonplaceholder.typicode.com/photos?_limit=10)