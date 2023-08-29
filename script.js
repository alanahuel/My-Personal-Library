document.addEventListener('DOMContentLoaded', function() {

    // Referencias a los elementos
    const addButton = document.getElementById('addButton');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const bookFormModal = document.getElementById('bookFormModal');
    const bookForm = document.getElementById('bookForm');
    const readBooksGrid = document.getElementById('readBooksGrid');
    const unreadBooksGrid = document.getElementById('unreadBooksGrid');


    bookFormModal.style.display = 'none';

    // Mostrar el formulario
    function showForm() {
        bookFormModal.style.display = 'block';
        bookFormModal.style.position = "fixed";
        bookFormModal.style.top = "0";
        bookFormModal.style.left = "0";
        bookFormModal.style.width = "100%";
        bookFormModal.style.height = "100%";
        bookFormModal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        bookFormModal.style.zIndex = "1000";
        bookFormModal.style.display = "flex";
        bookFormModal.style.alignItems = "center";
        bookFormModal.style.justifyContent = "center";

        document.getElementById('fileName').textContent = '';
        document.getElementById('bookImage').value = '';


    }

    // Ocultar el formulario
    function hideForm() {
        bookFormModal.style.display = 'none';
        bookForm.reset();

        document.getElementById('fileName').textContent = '';
        document.getElementById('bookImage').value = '';

    }

    // Agregar libro al estante correspondiente
    function addBookToShelf(event) {
        event.preventDefault(); // Evita el envío tradicional del formulario
    
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;
        const bookImage = document.getElementById('bookImage').files[0];
    
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const imageDiv = document.createElement('div')
        imageDiv.classList.add("book-image-container");

        const infoDiv = document.createElement('div')
        infoDiv.classList.add('book-info')
        infoDiv.innerHTML = `
            <h3>${title}</h3>
            <p>${author}</p>
            <p>${pages}</p>
        `;

        const actionDiv = document.createElement('div');
        actionDiv.classList.add('book-buttons');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton'); 
        deleteButton.innerText="Delete";
        deleteButton.addEventListener('click', () => bookElement.remove());

        actionDiv.appendChild(deleteButton);

        // Si se seleccionó una imagen, creamos un elemento img con ella
        if (bookImage) {
            bookElement.classList.add('with-image');
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement =document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.alt = title;
                imgElement.classList.add('book-image');
                
                imageDiv.appendChild(imgElement);
                bookElement.appendChild(imageDiv);
                bookElement.appendChild(infoDiv);
                bookElement.appendChild(actionDiv);


                if (read) {
                    readBooksGrid.appendChild(bookElement);
                } else {
                    unreadBooksGrid.appendChild(bookElement);
                }
            }
            reader.readAsDataURL(bookImage);
        } else {
            bookElement.classList.add('without-image');
            bookElement.appendChild(infoDiv);
            bookElement.appendChild(actionDiv)
            
            if (read) {
                readBooksGrid.appendChild(bookElement);
            } else {
                unreadBooksGrid.appendChild(bookElement);
            }
        }
    
        // Limpiar el formulario y ocultar el modal
        bookForm.reset();
        hideForm();
        
    }

    // Eventos
    addButton.addEventListener('click', showForm);
    closeFormBtn.addEventListener('click', hideForm);
    bookForm.addEventListener('submit', addBookToShelf);

    document.getElementById('bookImage').addEventListener('change', function() {
        const fileName = this.value.split('\\').pop();
        document.getElementById('fileName').textContent = fileName;
    });
});
