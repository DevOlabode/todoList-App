const todoEnter = document.querySelector('#todoEnter');
const todoEnterButton = document.querySelector('#enterButton');
const todoListUL = document.querySelector('#todoList');
const todoListDiv= document.querySelector('#todoListDiv');
const errorMessage = document.querySelector('#error');
const footer  = document.querySelector('footer');

todoEnterButton.addEventListener('click', function(){

    if(todoEnter.value === ''){
        errorMessage.textContent = '⚠️ Please enter a valid todo.'
        footer.style.marginTop = '30px';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 1000);
    }else{
    const todoListLI = document.createElement('li')
    todoListLI.textContent = todoEnter.value;
    todoListUL.append(todoListLI)
    todoEnter.value=''
  
   const editButton = document.createElement('button')
    editButton.classList.add('fas', 'fa-edit', 'icon')
    todoListLI.appendChild(editButton)

  editButton.addEventListener('click', function() {  
    const newTodo = prompt('Edit your todo:', todoListLI.childNodes[1].textContent);  
    if (newTodo) {  
        todoListLI.childNodes[1].textContent = newTodo;  
    }  
});
  

    const deleteButton= document.createElement('button')
    deleteButton.classList.add('fas', 'fa-trash-alt', 'icon')
    todoListLI.appendChild(deleteButton); 

    deleteButton.addEventListener('click', function(){
            todoListLI.remove()
            deleteButton.remove()
            editButton.remove()
    })

   
  
  const completedCheckbox = document.createElement('input')
  completedCheckbox.type = 'checkbox'
  todoListLI.prepend(completedCheckbox)

  completedCheckbox.addEventListener('change', function() {
    const todoText = todoListLI.firstChild;

    if (completedCheckbox.checked) {
      // Apply line-through effect with animation (2 seconds) from both sides
      todoText.style.transition = 'text-decoration 2s ease-in-out, opacity 0.5s';
      todoText.style.textDecoration = 'line-through';
      todoText.style.textDecorationStyle = 'solid';
      todoText.style.textDecorationColor = 'black';
      todoText.style.textDecorationThickness = '2px';

      // Disable all elements except the delete button
      deleteButton.disabled = false;  // Make sure delete button remains active
      editButton.disabled = true;
      completedCheckbox.disabled = false;
      todoListLI.style.opacity = '0.5'; // Dim the todo item to indicate completion
    } else {
      // Remove line-through effect with animation
      todoText.style.transition = 'text-decoration 2s ease-in-out, opacity 0.5s';
      todoText.style.textDecoration = 'none';

      // Enable all elements again
      deleteButton.disabled = false;  // Keep delete button active
      editButton.disabled = false;
      completedCheckbox.disabled = false;
      todoListLI.style.opacity = '1'; // Restore full opacity
    }
  });   
} 
})