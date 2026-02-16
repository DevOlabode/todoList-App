const todoEnter = document.querySelector('#todoEnter');
const todoEnterButton = document.querySelector('#enterButton');
const todoListUL = document.querySelector('#todoList');
const todoListDiv = document.querySelector('#todoListDiv');
const errorMessage = document.querySelector('#error');
const footer = document.querySelector('footer');
const todoForm = document.querySelector('#todoForm');

// Handle form submission
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (todoEnter.value.trim() === '') {
        errorMessage.textContent = '⚠️ Please enter a valid todo.';
        footer.style.marginTop = '30px';
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 2000);
    } else {
        addTodo(todoEnter.value.trim());
        todoEnter.value = '';
    }
});

function addTodo(text) {
    // Create the list item
    const todoListLI = document.createElement('li');
    
    // Create checkbox
    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.classList.add('todo-checkbox');
    todoListLI.appendChild(completedCheckbox);

    // Create todo text span with class for styling
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.textContent = text;
    todoListLI.appendChild(todoText);

    // Create edit button
    const editButton = document.createElement('button');
    editButton.classList.add('fas', 'fa-edit', 'icon', 'edit-btn');
    editButton.setAttribute('aria-label', 'Edit todo');
    todoListLI.appendChild(editButton);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('fas', 'fa-trash-alt', 'icon', 'delete-btn');
    deleteButton.setAttribute('aria-label', 'Delete todo');
    todoListLI.appendChild(deleteButton);

    // Add to list
    todoListUL.appendChild(todoListLI);

    // Edit button functionality
    editButton.addEventListener('click', function() {
        const newTodo = prompt('Edit your todo:', todoText.textContent);
        if (newTodo && newTodo.trim() !== '') {
            todoText.textContent = newTodo.trim();
        }
    });

    // Delete button functionality
    deleteButton.addEventListener('click', function() {
        todoListLI.style.opacity = '0';
        todoListLI.style.transform = 'translateX(20px)';
        setTimeout(() => {
            todoListLI.remove();
        }, 200);
    });

    // Checkbox functionality for completion
    completedCheckbox.addEventListener('change', function() {
        if (completedCheckbox.checked) {
            todoListLI.classList.add('completed');
            editButton.disabled = true;
        } else {
            todoListLI.classList.remove('completed');
            editButton.disabled = false;
        }
    });
}

// Add keyboard support - Enter to add
todoEnter.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && todoEnter.value.trim() !== '') {
        todoForm.dispatchEvent(new Event('submit'));
    }
});
