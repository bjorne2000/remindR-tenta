// Selectors

const todoInput = document.querySelector(".todo-input");
const addTodoBtn = document.querySelector(".add-todo-btn");
const todoList = document.querySelector(".todo-list");
const addMovieBtn = document.querySelector(".add-movie-btn");
const movieInput = document.querySelector(".movie-input");
const movieList = document.querySelector(".movie-list");
const stars = document.querySelectorAll(".stars");
let movie = "";

let oldTodo = "";


// Event listeners

addTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", clickCheck)
movieList.addEventListener("click", clickCheck)

addMovieBtn.addEventListener("click", addMovie)


// Functions
function addMovie(event){

    event.preventDefault();

    if(movieInput.value === "" || !movieInput.value.trim()){
        alert("please write a todo!");
    }
    else{
            // Create todo wrapper div


    getMovie(movieInput.value)
    console.log(movie)
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.classList.add("row");

    movieDiv.classList.add("col");

    

    // Create todo list item
    const movieItem = document.createElement("li");
    movieItem.classList.add("movie-item");
    movieItem.classList.add("col");
    movieItem.classList.add("todoText")


    movieItem.innerText = movieInput.value; 

    movieDiv.appendChild(movieItem);



    // Create edit button


    const infoButton = document.createElement("div");

    infoButton.innerHTML = `<button type="button" class="info-btn" data-bs-toggle="modal" data-bs-target="#infoButton">
    Movie info
    </button>`
    infoButton.classList.add("col")

    

    movieDiv.appendChild(infoButton);


    // Create trash button

    const trashButton = document.createElement("button");
    trashButton.classList.add("remove-btn");
    trashButton.classList.add("col");
    trashButton.innerText = "Done!"
    

    movieDiv.appendChild(trashButton);

    // Put todo div in place

   movieList.appendChild(movieDiv);

    todoInput.value = "";

    }

}


function addTodo(event){

    event.preventDefault();

    if(todoInput.value === "" || !todoInput.value.trim()){
        alert("please write a todo!");
    }
    else{
            // Create todo wrapper div

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.add("row")
    todoDiv.classList.add("col")


    // Create todo list item
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.classList.add("col");
    todoItem.classList.add("todoText")
    todoItem.innerText = todoInput.value; 


    todoDiv.appendChild(todoItem);

    // Create compleded button



    // Create edit button


    const editButton = document.createElement("div");

    editButton.innerHTML = `<button type="button" class="edit-btn" data-bs-toggle="modal" data-bs-target="#editButton">
    Edit
    </button>`   
    editButton.classList.add("col")


    todoDiv.appendChild(editButton);


    // Create trash button

    const trashButton = document.createElement("button");
    trashButton.classList.add("remove-btn");
    trashButton.classList.add("col");
    trashButton.innerText = "Done!"


    todoDiv.appendChild(trashButton);
    todoDiv.classList.add("col")

    // Put todo div in place

   todoList.appendChild(todoDiv);

    todoInput.value = "";

    }


    

}

function clickCheck(event){


    // Get clicked target

    const clickedTarget = event.target;
    

    // Get clicked target parent
    const todo = clickedTarget.parentElement;


    // Get clicked button

    if(clickedTarget.classList.contains("completed-btn")){


        todo.remove();
    }

    else if (clickedTarget.classList.contains("remove-btn")){


        todo.remove();
    }

    else if(clickedTarget.classList.contains("edit-btn")){
        const target = event.target;
        const saveEdit = document.querySelector(".save-edit-btn")
        oldTodo = target.parentElement

        saveEdit.addEventListener("click", newEdit)
    }
    else if(clickedTarget.classList.contains("info-btn")){
        const target = event.target;

        const mov = target.parentElement;
        
        getMovie(mov.parentElement.children[0].innerText)

        const description = document.querySelector(".movieDescription");
        const title = document.querySelector(".modal-title");

        console.log(movie.Plot)
        title.innerText = `${movie.Title}`
        description.innerHTML = `<p class ="movieDescription">${movie.Plot}</p>`
    }

}

function newEdit(event)
{
    const newEdit = document.querySelector(".new-Edit")
    const allTodos = document.querySelectorAll(".todo-item")
    if(newEdit.value === "" ||newEdit.value === null)
    {
        console.log("va")
        return
    }

    allTodos.forEach(item => {
        if(item.innerText === oldTodo.parentElement.children[0].innerText)
        {
            // console.log(item)
            // console.log(newEdit.value)
            item.innerText = newEdit.value
            newEdit.value = ""

        }
    });
    // const target = event.target;

    // // Get edit wrapper div
    // const edit = target.parentElement;
    // // console.log(newEdit)
    // // Change todo input
    // edit.children[0].innerText = newEdit.value;
    // edit.children[0].classList.add("todoText")
    // edit.children[4].remove();
    // edit.children[3].remove();

}


async function getMovie(movieName){
    let res = await axios.get(`http://www.omdbapi.com/?apikey=d57ba8ef&t=${movieName}`)

    movie = res.data;
}


// d57ba8ef



