
class Task {
    constructor(title, description, due_date, created_at) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.created_at = created_at;
    }
    toString()  {
        return this.title + " | " + this.description + " | " + this.due_date + " | " + this.created_at;
    }
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            due_date: this.due_date,
            created_at: this.created_at
        }
    }
    static fromJSON(json) {
        return new Task(json.title, json.description, new Date(json.due_date), new Date(json.created_at));
    }
}

let tasks = [];

function main() {
    loadLocally();
    updateList();

    const addButton = document.getElementById("open-dialog");
    const inputTitle = document.getElementById('input-title');
    const inputDescription = document.getElementById('input-desc');
    const inputDate = document.getElementById('input-date');
    const buttonConfirm = document.getElementById('add-button');
    const buttonCancel = document.getElementById('cancel-button');
    const addDialog = document.getElementById('add-dialog');

    buttonCancel.addEventListener('click', (e) => {
        addDialog.close();
    })

    buttonConfirm.addEventListener('click', (e) => {
        const title = inputTitle.value;
        const description = inputDescription.value;
        let due_date = inputDate.value;
        const created_at = new Date();

        if (title === '')
        {
            alert('Please enter title');
            return;
        }
        if (description === '')
        {
            alert('Please enter description');
            return;
        }
        due_date = new Date(due_date);
        if(isNaN(due_date.getTime())){
            alert('Please enter a valid date');
        }

        // Construct task object

        const task = new Task(title, description, due_date, created_at);

        tasks.push(task);

        tasks.sort((a, b) => a.due_date - b.due_date);

        addDialog.close();

        updateList();
    })


    addButton.addEventListener('click', (e) => {
        addDialog.showModal();
    })
}

function updateList()
{
    const table = document.getElementById('table');

    table.innerHTML = '';

    // Header
    const headder = ["Title", "Description", "Due_date", "Created_at",""];

    headder.forEach(head => {
        const el = document.createElement('div');
        el.textContent = head;

        table.append(el);
    })

    if (tasks.length > 0)
    {
        console.log(tasks);

        tasks.forEach(task => {

            const el_title = document.createElement('div');
            el_title.textContent = task.title;

            const el_desc = document.createElement('div');
            el_desc.textContent = task.description;

            const el_due = document.createElement('div');
            el_due.textContent = task.due_date.toLocaleDateString();

            const el_createdOn = document.createElement('div');
            el_createdOn.textContent = task.created_at.toLocaleDateString();

            const done = document.createElement('button');
            done.textContent = 'Done';

            done.addEventListener('click', (e) => {
                const index = tasks.indexOf(task);
                if (index > -1) {tasks.splice(index, 1);}

                updateList();
            })

            if ((task.due_date - new Date()) / (1000 * 60 * 60 * 24) <= 2)
            {
                el_title.classList.add('due-soon');
                el_desc.classList.add('due-soon');
                el_createdOn.classList.add('due-soon');
                el_due.classList.add('due-soon');
            }

            table.append(el_title, el_desc, el_due, el_createdOn, done);
        })
    }else
    {
        const el = document.createElement('div');
        el.innerText = `No tasks yet. All done! `
        table.appendChild(el);
    }

    saveLocally();
}

function saveLocally()
{
    const JSONData = []

    tasks.forEach(task => {
        JSONData.push(task.toJSON());
    })

    localStorage.setItem('tasks', JSON.stringify(JSONData));
}

function loadLocally() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    tasks = [];

    if (storedTasks && storedTasks.length > 0){
        storedTasks.forEach(task => {
            tasks.push(Task.fromJSON(task));
        })
    }
}

window.addEventListener('load', main);