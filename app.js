import { TodoList } from "./components/TodoList.js";
import { fetchJSON } from "./Functions/api.js";


try{
    const todos = await fetchJSON("https://jsonplaceholder.typicode.com/todos?_limit=5")
    const list = new TodoList(todos)
    list.appendTo(document.querySelector('.list-group'))
} catch {
    alert('Erreur lors du chargement des données')
}

// Filters

const filters = document.querySelectorAll('.filter')
const listgroup = document.querySelector('.list-group')

filters.forEach((filter)=>{
    filter.addEventListener('click',()=>{
        filters.forEach((filter)=>{
            filter.classList.remove('active')
        });
        filter.classList.add('active')
        if (filter.classList.contains('todo')){
            listgroup.classList.add('todo')
            listgroup.classList.remove('done')

        } else if (filter.classList.contains('done')){
            listgroup.classList.add('done')
            listgroup.classList.remove('todo')
        } else {
            listgroup.classList.remove('done')
            listgroup.classList.remove('todo')
        }
    })
})