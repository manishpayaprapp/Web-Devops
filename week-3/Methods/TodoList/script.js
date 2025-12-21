// function Addtodo(){
//     const Value = document.querySelector("input").value;
//     const spanEl = document.createElement("span");
//     const buttonEl = document.createElement("button");
//     spanEl.innerHTML = Value;
//     buttonEl.innerHTML="Delete";
//     ///
//     const  divEl = document.createElement("div");
//     divEl.appendChild(spanEl);
//     divEl.appendChild(buttonEl);
//     /// 
//     document.querySelector("body").appendChild(divEl);
// }
// function DeleteTodo(){
    
// }
// OR 
let todos = [];

function addTodo() {
todos. push({
title: document.querySelector("input"). value
})
render();
}

function deleteFirstTodo() {
todos. splice(0,1);
render();
}

function deleteLastTodo(){
todos. splice(todos.length-1,1);
render();
}

function deleteTodo(){
todos.pop()
render();
}

function render( ) {
document.querySelector('#todos').innerHTML="";
for (let i = 0; i < todos. length; i++) {
const todo = todos[i];
const div = document.createElement("div");
const span = document.createElement("span");
const button =document.createElement("button");
button.innerHTML="Delete";
button.onclick = () => deleteTodo();
span. innerHTML = todo.title;
div.appendChild(span);
div.appendChild(button);
document.querySelector("#todos").appendChild(div)
}
} 