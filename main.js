const signInBtn = document.querySelector(".sign-in-btn"),
  signInSection = document.querySelector(".sign-in-section"),
  signInBackToHome = document.querySelector(".back-to-home"),
  signUpBtn = document.querySelector(".sign-up-btn"),
  signUpSection = document.querySelector(".sign-up-section"),
  signUpBackToHome = document.querySelector(".back-to-home2"),
  signUpSubmitbtn = document.querySelector(".submit-sign-up"),
  signUpUserEmail = document.getElementById("signUpEmail"),
  signUpName = document.getElementById('signUpName'),
  signUpUserPwd = document.getElementById("signUpPassword"),
  signInSubmitbtn = document.querySelector(".submit-sign-in"),
  signInUserEmail = document.getElementById("signInEmail"),
  signInUserPwd = document.getElementById("signInPassword"),
  logInErrorMessage = document.querySelector(".loginErrorMessage"),
  signUpErrorMessage = document.querySelector(".sigUpErrorMessage"),
  signUpForm = document.querySelector('.sign-up-form'),
  signUpFormControl = document.querySelectorAll('.form-control'),
  activeUserTittle = document.querySelector('.activeUsertittle'),
  todosContainer = document.querySelector('.todosListContainer'),
  todosGroup = [],
  keysGroup = [],
  logOutBtn = document.querySelector('.log-out-option');




  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    keysGroup.push(key);
  }
  
signInBackToHome.addEventListener('click', () => {
  signInSection.classList.add('collapsed');
  signInBtn.classList.remove('collapsed');
}); 

signUpBackToHome.addEventListener('click', () => {
  signUpSection.classList.add('collapsed');
  signUpBtn.classList.remove('collapsed');
}); 

signInBtn.addEventListener('click', () => {
  signInSection.classList.remove("collapsed");
  signInBtn.classList.add("collapsed");
  signUpSection.classList.add("collapsed");
  signUpBtn.classList.remove("collapsed");
})

signUpBtn.addEventListener('click', () => {
  signUpSection.classList.toggle("collapsed");
  signUpBtn.classList.toggle("collapsed");
  signInSection.classList.add("collapsed");
  signInBtn.classList.remove("collapsed");
})



var crypt = {
 secret : "THESECRET",
 encrypt : function (clear) {
   var cipher = CryptoJS.AES.encrypt (clear, crypt.secret);
   cipher = cipher.toString();
   return cipher; 
 },
 decrypt : function (cipher) {
   var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
   decipher = decipher.toString(CryptoJS.enc.Utf8);
   return decipher;
 }
};


/* -------------------------------------------------------------------------- */
/*                  Sending the Signup Data to Local Storage                  */
/* -------------------------------------------------------------------------- */

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signUpCheckInputs();
const userData = [];
const name = signUpName.value.trim();
const email = signUpUserEmail.value.trim();
const password = crypt.encrypt(signUpUserPwd.value.trim());
userData.push(name, password);
localStorage.setItem(email, JSON.stringify(userData));
signUpForm.reset();
signInSection.classList.remove("collapsed");
signInBtn.classList.add("collapsed");
signUpSection.classList.add("collapsed");
signUpBtn.classList.remove("collapsed");
   });

/* -------------------------------------------------------------------------- */
/*                     Signing in the user if data exists                     */
/* -------------------------------------------------------------------------- */
signInSubmitbtn.addEventListener("click", (e) => { 
  e.preventDefault();
  signInCheckInputs();
  const userEmail = signInUserEmail.value.trim();
  let userPassword = signInUserPwd.value.trim();
  if (keysGroup.includes(userEmail) === false) {
    setErrorFor(signInUserEmail, 'No Account under this email Address') 
    return
  }

  let encrPassword = JSON.parse(localStorage.getItem(userEmail))[1];
  var decrPassword = crypt.decrypt(encrPassword);
  
  if (userPassword !== decrPassword) {
    setErrorFor(signInUserPwd, 'Invalid Password') 
  } else {
    localStorage.setItem('ActiveUser', userEmail);
    signInSection.classList.add("collapsed");
    signInBtn.classList.add("collapsed");
    signUpSection.classList.add("collapsed");
    signUpBtn.classList.add("collapsed");
    activeUserTittle.innerHTML = JSON.parse(localStorage.getItem(userEmail))[0];
    todosContainer.classList.remove("collapsed");
  }

  
});


/* const fruitsObj = {fruta:"Aguacate", vitamina:"C", color:"Verde"};




let misFrutas = localStorage.getItem("Frutas");
let misFruticas = JSON.parse(misFrutas);
let miFrutonga = misFruticas.fruta

console.log(miFrutonga); */

 



/* -------------------------------------------------------------------------- */
/*                                    Todos                                   */
/* -------------------------------------------------------------------------- */

//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheckTodo);
filterOption.addEventListener('input', filterTodos);
document.addEventListener("DOMContentLoaded", todosPanel);

logOutBtn.addEventListener('click', () => {
  localStorage.removeItem('ActiveUser');
  location.reload();
  });
//Functions

//Function "addTodo"
function addTodo(e) {
  e.preventDefault();
  let activeUser = localStorage.getItem('ActiveUser');
  let activeUserName = JSON.parse(localStorage.getItem(activeUser))[0];
  saveLocalTodos(activeUserName, todoInput.value);
  todoInput.value = "";
  location.reload();
} 
//Function "deleteCheckTodo"
function deleteCheckTodo(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeTodos(todo);   
    todo.addEventListener('transitionend', function() {
      todo.remove();
    })
     
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//Function "filterTodos"

function filterTodos(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
        case "completed":
          if (todo.classList.contains('completed')) {
            todo.style.display = 'flex'
          } else {
            todo.style.display = "none"
          }
          break;
      case "uncompleted":
        if(!todo.classList.contains('completed')) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
      break;     
    }
  });
}



 

//console.log(signUpForm.querySelectorAll('input'));


/* document.body.addEventListener('click', function(e) {
  console.log(e.target);
}) */
  




function signUpCheckInputs() {
	// trim to remove the whitespaces
	const usernameValue = signUpName.value.trim();
	const emailValue = signUpUserEmail.value.trim();
	const passwordValue = signUpUserPwd.value.trim();

	
	if(usernameValue === '') {
		setErrorFor(signUpName, 'Username cannot be blank');
	} else {
		setSuccessFor(signUpName);
	}
	
	if(emailValue === '') {
		setErrorFor(signUpUserEmail, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(signUpUserEmail, 'Not a valid email');
	} else {
		setSuccessFor(signUpUserEmail);
	}
	
	if(passwordValue === '') {
		setErrorFor(signUpUserPwd, 'Password cannot be blank');
	} else {
		setSuccessFor(signUpUserPwd);
	}
	
} 





function signInCheckInputs() {
	// trim to remove the whitespaces
	
	const emailValue = signInUserEmail.value.trim();
	const passwordValue = signInUserPwd.value.trim();
	
	if(emailValue === '') {
		setErrorFor(signInUserEmail, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(signInUserEmail, 'Not a valid email');
	} else {
		setSuccessFor(signInUserEmail);
	}
	
	if(passwordValue === '') {
		setErrorFor(signInUserPwd, 'Password cannot be blank');
	} else {
		setSuccessFor(signInUserPwd);
	}
	
} 







function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



function saveLocalTodos(user, todo) {
  let todoskey = `${user}-todos`
  let todos;
  if (localStorage.getItem(todoskey) === null) {
  todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(todoskey));
  }
  todos.push(todo);
  localStorage.setItem(todoskey, JSON.stringify(todos));
}


function getTodos() {
  let activeUser = localStorage.getItem('ActiveUser');
  let activeUserName = JSON.parse(localStorage.getItem(activeUser))[0];

  let todoskey = `${activeUserName}-todos`
  let todos;
  if (localStorage.getItem(todoskey) === null) {
  todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(todoskey));
  }
  todos.forEach(function(todo) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn")
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv); 
  })
}

function removeTodos(todo) {
  let activeUser = localStorage.getItem('ActiveUser');
  let activeUserName = JSON.parse(localStorage.getItem(activeUser))[0];
  let todoskey = `${activeUserName}-todos`
  let todos;
  if (localStorage.getItem(todoskey) === null) {
  todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(todoskey));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1); 
  localStorage.setItem(todoskey, JSON.stringify(todos))
}



function todosPanel() {
  if (localStorage.getItem('ActiveUser') !== null && todosContainer.classList.contains("collapsed") === true) {
    signInSection.classList.add("collapsed");
    signInBtn.classList.add("collapsed");
    signUpSection.classList.add("collapsed");
    signUpBtn.classList.add("collapsed");
    let userEmail = localStorage.getItem("ActiveUser");
    activeUserTittle.innerHTML = JSON.parse(localStorage.getItem(userEmail))[0];
    todosContainer.classList.remove("collapsed");
    getTodos();
  } 
}





signUpFormControl[2].style.margin = "0";
