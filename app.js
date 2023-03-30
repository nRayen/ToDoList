const todoCheckbox = document.getElementsByClassName('item-checkbox')
const todoTitle = document.getElementsByClassName('item-title')
const todos = document.getElementsByClassName('list-item')

const filters = document.querySelectorAll('.filter')

const list = document.querySelector('.list')
const addTaskBtn = document.querySelector('form button')
const removeBtn = document.getElementsByClassName('delete')

// Fetch 3 tasks from API************************************************************************************
async function fetchJSON (url, options = {}){
    const headers = {Accept : 'application/json', ...options.headers}
    fetch(url)
    .then((r)=>{
        return r.json();
    })
    .then((data)=>{


        for(let i = 0; i< todos.length; i++){
            todoTitle[i].innerText = data[i].title
            todoCheckbox[i].checked = data[i].completed
        }
            
    })
}
fetchJSON('https://jsonplaceholder.typicode.com/todos/?_limit=3')

    
    removeTask()
    filtersUI()
    
    
    
    // Add new task*****************************************************************************************
    
    addTaskBtn.addEventListener('click',(e) =>{
        e.preventDefault()
        if (document.querySelector('.search input').value == ''){
            alert('Vous ne pouvez pas laisser ce champ vide')
        } else {
            list.prepend(document.querySelector('.list-item').cloneNode(true))
            
            document.querySelector('.list-item:nth-child(1) label').innerText = document.querySelector('.search input').value;
            document.querySelector('.search input').value = ''
            
            document.querySelector('.list-item:nth-child(1) label').setAttribute('for', '')
            document.querySelector('.list-item:nth-child(1) input').checked = false
            
            for (i = 0; i < todos.length; i++){
                todoTitle[i].setAttribute('for',`todo${i+1}`)
                todoCheckbox[i].id = `todo${i+1}`;
            }
            
            removeTask()
            filtersUI()
        }
    })
    
    //Remove Task********************************************************************************************
    
    function removeTask(){
        Array.from(removeBtn).forEach((btn)=>{
            btn.addEventListener('click', ()=>{
                todos[(Array.from(removeBtn).indexOf(btn))].remove()
            })
        })
    }



    function filtersUI(){
        // Filters********************************************************************************************
        
                //Filter selector
        filters.forEach((filter)=>{
            filter.addEventListener('click',()=>{
                filters.forEach((filter)=>{
                    filter.classList.remove('active')
                });
                filter.classList.add('active')
            })
        })


                //Filter completed or not
        function checkCompleted(){
            document.querySelectorAll('.list-item input').forEach((checkbox)=>{
                if(checkbox.checked == true){
                    checkbox.parentNode.classList.add('completed')
                }
            })
        }

                //Filter hide items
        const filterAll = document.querySelector('.all')
        const filterToDo = document.querySelector('.todo')
        const filterDone = document.querySelector('.done')
        
        if(filterAll.classList.contains('active')){
        
            document.querySelectorAll('.list-item').forEach((item)=>{
                item.classList.remove('hidden')
            })
        
        
        } else if (filterToDo.classList.contains('active')){
        
            document.querySelectorAll('.list-item:not(.completed)').forEach((item)=>{
                item.classList.remove('hidden')
            })
            document.querySelectorAll('.list-item.completed').forEach((item)=>{
                item.classList.add('hidden')
            })
        
        
        } else if (filterDone.classList.contains('active')){
        
            document.querySelectorAll('.list-item:not(.completed)').forEach((item)=>{
                item.classList.add('hidden')
            })
            document.querySelectorAll('.list-item.completed').forEach((item)=>{
                item.classList.remove('hidden')
            })
        }

        checkCompleted()
    }

