"use strict";
// function greet(name){
//     return "Hello" +" " + name
// }
Object.defineProperty(exports, "__esModule", { value: true });
let user1 = ([{
        firstName: "Manish",
        lastName: "SP",
        age: 21
    }]);
function isLegal(user1) {
    return user1.filter((user1) => user1.age > 18);
}
console.log(isLegal(user1));
//# sourceMappingURL=index.js.map