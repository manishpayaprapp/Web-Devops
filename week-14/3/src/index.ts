// interface User{
//     name :string,
//     age : number
// }

// let user1 = {
//     name : "Manish",
//     age : 21
// }
// let user2 = {
//     name: "Hakirat",
//     age : 36
// }
// function sumOfAges(user1:User,user2:User):number{
//     return (user1.age+user2.age)
// }

// console.log(sumOfAges(user1, user2))

// * Learning API's in TS

// ** Pick

// interface User{
//     name :string,
//     age : number,
//     email : string,
//     password : string
// }

// type updateUser = Pick<User,'name'|'age'|'password'>

// // ** Pratial -- it let the all variables optionla like if the one or any variable not change thats fine

// type updateUseroptional = Partial<updateUser>

// function updateUserDetails(updateUser:updateUseroptional){
//     // logic 
// }

// ** readonly

// Like ur seen in js also that we can change the values inside an array or in a object eventhough there are const for that this is the solution

// type User = {
//      name : string,
//      age : number
// }

// const user1 :Readonly<User> = {
//     name : "MAnish",
//     age : 21
// }

// user1.age = 22

// ** Record 

// type User = Record<string,{age:number,name:string}>

// const users = {
//     "123" : {
//         name : "Manish",
//         age:21
//     },
//     "124":{
//         name: "Hakirat",
//         age : 23
//     }
// }

// ** Map
// const users = new Map<string,User>() 
// users.set(
//     "123" , {
//         name : "Manish",
//         age:21
//     }
// )
// users.set(
//     "133" , {
//         name : "sh",
//         age:21
//     }
// )
// const user = users.get("133")

// console.log(user)

// ** Exclude

// type EventType = 'click' | 'scroll' | 'mousemove';
// type ExcludeEvent = Exclude<EventType, 'scroll'>; // 'click' | 'mousemove'

// const handleEvent = (event: ExcludeEvent) => {
//   console.log(`Handling event: ${event}`);
// };

// handleEvent('click'); // OK

// ** Type Inference in Zod 
// import { z } from 'zod';
// import express from "express";

// const app = express();

// // Define the schema for profile update
// const userProfileSchema = z.object({
//   name: z.string().min(1, { message: "Name cannot be empty" }),
//   email: z.string().email({ message: "Invalid email format" }),
//   age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
// });
// // this is how we do 
// type fullUserSchema = z.infer<typeof userProfileSchema>

// app.put("/user", (req, res) => {
//   const { success } = userProfileSchema.safeParse(req.body);
//   const updateBody : fullUserSchema = req.body; // how to assign a type to updateBody?

//   if (!success) {
//     res.status(411).json({});
//     return
//   }
//   // update database here
//   res.json({
//     message: "User updated"
//   })
// });

// app.listen(3000);