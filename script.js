const addBtn = document.querySelector('.add');
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    })
}
addBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(text = "") {
    const note = document.createElement('div');
    note.classList.add('note');
    //    <button class="edit button" id="edit">
    //         <i class="fas fa-edit"></i>
    //     </button>
    note.innerHTML = `
    <div class="tools">
    <label class="seatButton ">
    <input type="checkbox"  class="edit"/>
    <span class="seatButton button" class="add"> <i class="fas fa-edit"></i></span>
  </label>
        <button class="delete button" id="delete">
            <i class="fas fa-trash-alt "></i>
        </button>
    </div>
    <div class="main ${text ? '' : 'hidden'} ">

    </div>
    <textarea class="${text ? 'hidden' : ''}" >

    </textarea>

 `


    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    textarea.value = text
    main.innerHTML = marked(text)

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textarea.classList.toggle('hidden')
    });
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });
    textarea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);
        updateLS();
    });

    document.body.appendChild(note);
    console.log("botao add")
}


function updateLS() {
    const notesData = document.querySelectorAll('textarea');

    const notes = [];

    notesData.forEach(note => {
        notes.push(note.value)
    });
    localStorage.setItem('notes', JSON.stringify(notes))
}