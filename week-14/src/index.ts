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

// ** Class Impliments the interface
// interface people{
//     name : string;
//     age : number;
//     isLegal : () => boolean;
// }

// class Manager implements people{
//     // name : string;
//     // age : number;
//     // if ur not using any pre defined objects or variable from the interface then use the public in the constructor
//     constructor(public name : string ,public  age : number ){
//         this.name = name;
//         this.age = age;
//     }
//     isLegal(){
//         return this.age > 18;
//     }
// }

// // extend of clss is different and implements is different
// class God  extends Manager{
//     constructor(name:string,age:number){
//         super(name,age);
//     }
// }

// let user1 = new Manager("Manish", 21);
// console.log(user1.name);

// -------------------------------------------
// abstract classes  -- this samillar to interface but in this we can add a defualt function in abstaract class but we cannot do in the interface

// abstract class User{
//     name : string;
//     constructor(name:string){
//         this.name = name;
//     }
//     abstract greet () : string;
//     hello (){
//         console.log("Hi there");
//     }
// }

// class Manager extends User{
//     constructor(public name :string){
//         super(name);
//         this.name = name;
//     }
//     greet(){
//         return "Hi" + this.name;
//     }
// }
// console.log(Manager);

// function nameOfUser(user:User):string{
//     return(user.name)
// }
// console.log(nameOfUser)



// * Types

// Union

// type sumInput = string | number

// function sum(a:sumInput,b:sumInput){
//     console.log(a + " " + b);
// }

// Intersection

// type Employe ={
//     name : string,
//     startDate : Date
// }

// type Manager = {
//     name : string,
//     department : string
// }

// type teamLead = Employe & Manager

// const devLead : teamLead ={
//     name : "Manish",
//     startDate : new Date(),
//     department : "Development"
// }


// --- Assignment -----

// type User = {
//     name:string;
//     age:number;
// }
// type Admin = {
//     name:string;
//     age:number;
//     access:boolean
// }

// type functionInput = User | Admin;

// let user1 ={
//     name : "Manish",
//     age : 21,
//     access : true
// }
// function greet (user1:functionInput) : string{
//     return "Welcome" + " " + user1.name
// }

// console.log(greet(user1))

// interface User {
//     firstName: string;
//     lastName: string;
//     age : number
// }
// let user1 = {
//    firstName: "Manish",
//    lastName: "SP",
//     age :21
// }
// function isLegal(user1:User):boolean{
//     return user1.age > 18
// }
// console.log(isLegal(user1))
// ---- Arary --- 

    // let nums = [1,2,3,4,5]
    // function getMax(nums:number[]):number{
    //     let max = 0;

    //     for(let i = 0; i < nums.length;i++){
    //         if(nums[i] > max)
    //             max = nums[i]
    //     }
    //     return max

    // }
    // console.log(getMax(nums))

    // ----------------

    interface User {
    firstName: string;
    lastName: string;
    age : number
}
let user1 = ([{
   firstName: "Manish",
   lastName: "SP",
    age :21
}])
function isLegal(user1:User[]):User[]{
    return user1.filter((user1) => user1.age > 18)
}
console.log(isLegal(user1))