function createField (columns = 16) {
    console.log(columns);

    let dimension = Math.floor(400 / columns) + 'px';

    let field = document.querySelector('.field');

    for (let i = 0; i < columns; i++) {
        let row = document.createElement('tr');
        for (let i = 0; i < columns; i++) {
            let cell = document.createElement('td');
            cell.classList.add('cell');
            cell.style.width = dimension;
            cell.style.height = dimension;
            row.append(cell);
        }
        field.append(row);
    }

    let color = document.querySelector('.controls__color-select').value;

    if (color == 'rainbow') {
        field.addEventListener('pointerover', function(event) {
            color = '#' + Math.floor(Math.random()*16777215).toString(16);
            if (event.target.tagName.toLowerCase() == 'td') {
                event.target.style.backgroundColor = color;
            }
        });
    } else {
        field.addEventListener('pointerover', function(event) {
            if (event.target.tagName.toLowerCase() == 'td') {
                event.target.style.backgroundColor = color;
            }
        });
    }
}

function removeField() {
    let field = document.querySelector('.field');
    field.innerHTML = '';
}

let dimensions = document.querySelector('.controls__dimensions-input');

dimensions.addEventListener('change', function() {
    let columns = +dimensions.value;
    if (columns > 64) {
        dimensions.classList.add('controls__dimensions-input_error');
    } else if(dimensions.classList.contains('controls__dimensions-input_error') && columns <= 64) {
        dimensions.classList.remove('controls__dimensions-input_error');
    }
});

let reload = document.querySelector('.controls__reload');
reload.addEventListener('click', function() {
    let columns = +dimensions.value;
    if (columns <= 64 && columns > 0) {
        removeField();
        createField(columns);
    } else if (columns == 0) {
        removeField();
        createField();
    } else {
        alert('Error: incorrent width! Please insert another value.');
    }
});

createField(16);