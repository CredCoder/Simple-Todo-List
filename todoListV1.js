var todosUl = document.querySelector("ul");
var newTodo = document.getElementsByName("addTodo");
var changeText = document.getElementsByName("changeText");

newTodo[0].addEventListener("keyup", function() {
    if (event.keyCode === 13) {
        handlers.addTodo();
    }
});

changeText[0].addEventListener("keyup", function() {
    if (event.keyCode === 13) {
        handlers.changeTodo();
    }
});

var todoList = {
    todos: [],
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    removeTodo: function(index){
        this.todos.splice(index, 1);
    },
    changeTodo: function(index, todoText){
        this.todos[index].todoText = todoText;
    },
    toggleCompleted: function(index){
        this.todos[index].completed = !this.todos[index].completed;
    },
    toggleAll: function(){
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        this.todos.forEach(function(todo){
            if (todo.completed === true){
                completedTodos++;
                if (completedTodos === totalTodos){
                    todoList.todos.forEach(function(todo){
                        todo.completed = false;
                    });
                }
            }else{
                todoList.todos.forEach(function(todo){
                    todo.completed = true;
                });
            }
        });
    }
};

var handlers = {
    addTodo: function(){
        if (newTodo[0].value === ""){
            alert("You cannot leave text input blank!");
        }else{
        todoList.addTodo(newTodo[0].value);
        newTodo[0].value = "";
        view.displayTodos();
        }
    },
    removeTodo: function(){
        todoList.removeTodo(event.target.parentNode.id);
        view.displayTodos();
    },
    toggleAll: function(){
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function(){
        todosUl.innerHTML = "";
        todoList.todos.forEach(function(todo, index){
            var todoLi = document.createElement("li");
            todoLi.id = index;
            if (todo.completed === false){
                todoLi.textContent = " ( ) " + todo.todoText;
                todosUl.appendChild(todoLi).prepend(this.createDeleteBtn());
            }else{
                todoLi.textContent = " (x) " + todo.todoText;
                todosUl.appendChild(todoLi).prepend(this.createDeleteBtn());
            }
        }, this);//todoList.todos.forEach(*callback_function*(todo, index){doSomething}, this);
    },          //'this' one line up in red is how I can 'this' 3 and 6 lines above instead of 'view'. 
    createDeleteBtn: function(){//without this this, the this in 'this.createDeleteBtn()' refers to the global window object 
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "deleteBtn";
        return deleteBtn;
    }
};


// Event Delegation
todosUl.addEventListener("click", function(event){
    if (event.target.className === "deleteBtn"){
    handlers.removeTodo()
    }
});


todoList.addTodo("walk the dog");
todoList.addTodo("feed the dog");
todoList.addTodo("brush the dog");
todoList.addTodo("water the dog");
view.displayTodos();





       
