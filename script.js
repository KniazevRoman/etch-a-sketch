function createField (columns = 16) {
    let sizeValue = document.querySelector('.controls__chosen-size');
    sizeValue.textContent = `${size.value} x ${size.value}`;

    let cellSize = Math.floor(400 / columns) + 'px';

    for (let i = 0; i < columns; i++) {
        let row = document.createElement('tr');
        for (let i = 0; i < columns; i++) {
            let cell = document.createElement('td');
            cell.classList.add('cell');
            cell.style.width = cellSize;
            cell.style.height = cellSize;
            row.append(cell);
        }
        field.append(row);
    }

    setColor();
}

function removeField() {
    field.innerHTML = '';
}

function setColor() {
    let chosenColor = document.querySelector('.controls__color-picker:checked');

    document.querySelector('.controls__chosen-color').textContent = chosenColor.value;

    if (chosenColor.value == 'rainbow') {
        field.addEventListener('pointerover', function(event) {
            chosenColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            if (event.target.tagName.toLowerCase() == 'td') {
                event.target.style.backgroundColor = chosenColor;
            }
        });
    } else {
        field.addEventListener('pointerover', function(event) {
            if (event.target.tagName.toLowerCase() == 'td') {
                event.target.style.backgroundColor = chosenColor.value;
            }
        });
    }

    let previousCircle = document.querySelector('.controls__color-checkmark_chosen');
    previousCircle.classList.remove('controls__color-checkmark_chosen');

    let colorCircle = document.querySelector('.controls__color-picker:checked ~ .controls__color-checkmark');
    colorCircle.classList.add('controls__color-checkmark_chosen');
}

let size = document.querySelector('.controls__size-input');
size.addEventListener('change', function() {
    let sizeValue = document.querySelector('.controls__chosen-size');
    sizeValue.textContent = `${size.value} x ${size.value}`;
});

let color = document.querySelector('.controls__color-radio');
color.addEventListener('click', function() {
    setColor();
});

let refresh = document.querySelector('.controls__refresh-button');
refresh.addEventListener('click', function() {
    let columns = +size.value;
    removeField();
    createField(columns);
});

let field = document.querySelector('.field');
createField(16);