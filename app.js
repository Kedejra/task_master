//DEFINE UI VARIABLES


const form= document.getElementById('task-form');
const taskList= document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');

//why cant it be in the general scope ?

//LOAD ALL EVENT LISTENERS

LoadAllEventListeners();

function LoadAllEventListeners()
{
    //DOM event listener to load and facilitate display of stored tasks 
    document.addEventListener('DOMContentLoaded', getTasks);

    //Call event listeners and function calls
    //add task

    form.addEventListener('submit', addTask);

    //Remove Task
    taskList.addEventListener('click', removeTask);
    
    //Clear all tasks
    clearBtn.addEventListener('click', clearALLTasks);

    //Filter Tasks 
    filter.addEventListener('keyup', filterTasks);
}
    //The functions
    function addTask(e)
    {
        if(taskInput.value === '')
        {
            M.toast({html:'Please enter a task', displayLength:'2000'});
        }
        else
        {
        //create li element
        const li= document.createElement('li');
        li.className= 'collection-item';

        //create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        //create a new link element

        const link = document.createElement('a');
        //add class
        link.className = 'delete-item pink-text text-lighten-3 secondary-content';

        //add icon in html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        //append the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);

        //Store data to local storage
        storeTaskInLocalStorage(taskInput.value);

        //clear the input
        taskInput.value='';

        }

        e.preventDefault();
    }

    //Store to local storage function
    function storeTaskInLocalStorage(task)
    {
        let tasks;
        if(localStorage.getItem('tasks') === null)
        {
            tasks=[];
        }
        else
        {
            tasks= JSON.parse(localStorage.getItem('tasks'));
        }
        //pushing individual lasts to tasks list in storage
        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //Retrieving task list from local storage
    function getTasks()
    {
        let tasks;
        if(localStorage.getItem('tasks') === null)
        {
            tasks=[];
        }
        else
        {
            tasks= JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function(task)
        {
              //create li element
        const li= document.createElement('li');
        li.className= 'collection-item';

        //create text node and append to li
        li.appendChild(document.createTextNode(task));

        //create a new link element

        const link = document.createElement('a');
        //add class
        link.className = 'delete-item pink-text text-lighten-3 secondary-content';

        //add icon in html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        //append the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
        });
    }

    //Remove Task Function; Event Delegation utalized here to have access to all li
    function removeTask(e)
    {
        // when u click the x its parent is the a tag and we check to make sure it has the delete-item class so its def the a tag
        if(e.target.parentElement.classList.contains('delete-item'))
        {
            //confirm before delete
            if(confirm('Youve already completed this task?'))
            {
                //this grabs the grandparent of the x which is the whole li and deletes everything in it
                e.target.parentElement.parentElement.remove();
                //remove from LS
                removeTaskfromLocalStorage(e.target.parentElement.parentElement);
            }
                
        }
        //e.preventDefault();
    }

    //Remove Task from Local Storage
   function removeTaskfromLocalStorage(taskItem)
    {
        console.log(taskItem);
        let tasks;
        if(localStorage.getItem('tasks') === null)
        {
            tasks=[];
        }
        else
        {
            tasks= JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task,index)
        {
            if(taskItem.textContent === task)
            {
                tasks.splice(index,1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

//CLEAR ALL TASKS Function
function clearALLTasks()
{
    /*method 1
    taskList.innerHTML='';*/

    //faster method

    while(taskList.firstChild) // this checks if there is atleast 1 element (the first child) in the list
    {
        taskList.removeChild(taskList.firstChild); // this deletes tasks including first child
    }

    //clear from LS
    clearfromLocalStorage();

}

//CLEAR FROM LOCAL STORAGE FUNCTION
function clearfromLocalStorage()
{
    localStorage.clear();
}
    
//Filter Function
function filterTasks(e)
{
    const text= e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task)
    {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1)
        //{
            task.style.display = 'block';
        //}
        else
        {
            task.style.display = 'none';
        }
    });

}
