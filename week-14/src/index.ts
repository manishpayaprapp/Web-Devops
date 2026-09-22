// function greet(name){
//     return "Hello" +" " + name
// }

// console.log(greet("Manish"));

// * Interface


// interface userType  {
//     name:string,
//     age:number,
//     address:{
//         street:string,
//         pincode:number
//     }
// }
// function greet(user:userType){
//     console.log("Hello" + " "+ user.name)
// }

// let user = {
//     name : "Manish",
//     age : 21,
//     address: {
//         street : "vit",
//         pincode : 466114
//     }
// }
// greet(user)

// ** Example 

// interface todoType{
//     "title" : string,
//     "description" : string,
//     "Done" : boolean,
//     "Date" : Date
// }

// interface TodoInput{
//     todo : todoType
// }

// function displayTodo(todo:TodoInput){
//     console.log()
// }


// * Types

// Union

// type sumInput = string | number

// function sum(a:sumInput,b:sumInput){
//     console.log(a + " " + b);
// }

// Intersection

type Employe ={
    name : string,
    startDate : Date
}

type Manager = {
    name : string,
    department : string
}

type teamLead = Employe & Manager

const devLead : teamLead ={
    name : "Manish",
    startDate : new Date(),
    department : "Development"
}