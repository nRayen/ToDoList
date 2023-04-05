import { cloneTemplate, createElement } from "../Functions/dom.js"

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


        // Mise à jour dynamique du tableau #todos
        this.#listElement.addEventListener('delete', (e) => this.#todos = this.#todos.filter(t => t != e.detail))
        this.#listElement.addEventListener('toggle', (e) => e.detail.completed = !e.detail.completed)
    }


    /**
     * Fonction qui gère le submit d'une nouvelle todo
     * @param {Event} e  
     */
    onSubmit(e){
        e.preventDefault()
        let title = new FormData(e.currentTarget).get("additeminput").toString().trim();
        if (title == ""){
            e.currentTarget.querySelector('form input').value = ''
            return
        }

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
    /**
     *  @type {HTMLLIElement}
     */
    #element
    #todo

    constructor (todo){
        this.#todo = todo
        const id = todo.id

        let li = cloneTemplate('todo-template').querySelector('li')
        let checkbox = li.querySelector('input')
        let label = li.querySelector('label')
        let deleteBtn = li.querySelector('button')
        
        this.#element = li
        if (todo.completed) {
            li.classList.add('completed')
            checkbox.setAttribute('checked', "")
        }

        label.setAttribute('for', id)
        checkbox.setAttribute('id', id)

        label.innerHTML = todo.title

        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

        deleteBtn.addEventListener('click', (e) => this.removeTask(e)) // Supprime les tâches

        checkbox.addEventListener('change', (e) => this.toggle(e)) // Toggle la classe .completed sur les .list-item  
    }




    appendTo (element) {
        element.prepend(this.#element)
    }

    removeTask(e){
        e.preventDefault()
        
        const deleteEvent = new CustomEvent('delete',{
            detail: this.#todo,
            bubbles: true 
        })
        this.#element.dispatchEvent(deleteEvent)


        this.#element.remove()
    }



    toggle(e){
        e.preventDefault()
        if (e.currentTarget.checked){
            this.#element.classList.add('completed')
        } else {
            this.#element.classList.remove('completed')
        }

        const toggleEvent = new CustomEvent('toggle',{
            detail: this.#todo,
            bubbles: true 
        })

        this.#element.dispatchEvent(toggleEvent)
    }
}