import { createElement } from "../Functions/dom.js"

export class TodoList {

    #todos = []

    #listElement = []
    

    constructor(todos){
        this.#todos = todos
    }

    appendTo(element){
        this.#listElement = document.querySelector('.list-group')
        for (let todo of this.#todos){
            const t = new TodoListItem(todo)
            t.appendTo(this.#listElement)
        }
        document.querySelector('form').addEventListener('submit', e => this.onSubmit(e))
    }


    /**
     * Fonction qui gère le submit d'une nouvelle todo
     * @param {Event} e  
     */
    onSubmit(e){
        e.preventDefault()
        let title = new FormData(e.currentTarget).get("additeminput").toString().trim();

        let todo = {
            id : Date.now(),
            title : title,
            completed : false
        };

        let item = new TodoListItem(todo);
        item.appendTo(document.querySelector('.list-group'))
        e.currentTarget.querySelector('form input').value = ''
    }
    
    
}





export class TodoListItem {

    #element

    constructor (todo){
        const id = todo.id

        const li = createElement('li', {
            class: todo.completed ? 'list-item completed' : 'list-item'
        })

        const checkbox = createElement('input',{
            class: "item-checkbox",
            type:"checkbox",
            id: `${id}`,
            checked: todo.completed ? '' : null
        })

        const label = createElement('label', {
            class: "item-title",
            for: `${id}`
        })
        label.innerHTML = todo.title

        const deleteBtn = createElement('button',{
            class: "delete"
        })
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

        li.append(checkbox)
        li.append(label)
        li.append(deleteBtn)
        this.#element = li

        deleteBtn.addEventListener('click', (e) => this.removeTask(e))

        checkbox.addEventListener('change', (e) => {
            if (e.currentTarget.checked){
                this.#element.classList.add('completed')
            } else {
                this.#element.classList.remove('completed')
            }
            console.log(e.currentTarget)
        })

        
    }

    appendTo (element) {
        element.append(this.#element)
    }

    removeTask(e){
        e.preventDefault()
        this.#element.remove()
    }
}