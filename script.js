function createField (columns = 16, field) {
    let sizeValue = document.querySelector('.controls__chosen-size');
    sizeValue.textContent = `${size.value} x ${size.value}`;

    let cellSize = 400/columns + 'px';

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

    setColor(setMethod());
}

function removeField() {
    field.innerHTML = '';
}

function setColor(method) {
    function setRainbowColor(event) {
        chosenColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            if (event.target.tagName.toLowerCase() == 'td') {
                event.target.style.backgroundColor = chosenColor;
            }
    }

    function setChosenColor(event) {
        if (event.target.tagName.toLowerCase() == 'td') {
            event.target.style.backgroundColor = chosenColor.value;
        }
    }

    for (let listener of fieldListeners) {
        removeListeners(listener);
    }

    let chosenColor = document.querySelector('.controls__color-picker:checked');
    document.querySelector('.controls__chosen-color').textContent = chosenColor.value;

    if (chosenColor.value == 'rainbow') {
        fieldListeners.push(setRainbowColor);
        field.addEventListener(method, setRainbowColor);
    } else {
        fieldListeners.push(setChosenColor);
        field.addEventListener(method, setChosenColor);
    }

    let previousCircle = document.querySelector('.controls__color-checkmark_chosen');
    previousCircle.classList.remove('controls__color-checkmark_chosen');

    let colorCircle = document.querySelector('.controls__color-picker:checked ~ .controls__color-checkmark');
    colorCircle.classList.add('controls__color-checkmark_chosen');
}

function setMethod() {
    let chosenMethod = document.querySelector('.controls__method-picker:checked');
    document.querySelector('.controls__chosen-method').textContent = chosenMethod.id;

    let previousMethod = document.querySelector('.controls__method-checkmark_chosen');
    previousMethod.classList.remove('controls__method-checkmark_chosen');

    let methodCircle = document.querySelector('.controls__method-picker:checked ~ .controls__method-checkmark');
    methodCircle.classList.add('controls__method-checkmark_chosen');

    return chosenMethod.value;
}

function removeListeners(handler) {
    field.removeEventListener('pointerover', handler);
    field.removeEventListener('click', handler);
}

let size = document.querySelector('.controls__size-input');
size.addEventListener('input', function() {
    let sizeValue = document.querySelector('.controls__chosen-size');
    sizeValue.textContent = `${size.value} x ${size.value}`;
});

let color = document.querySelector('.controls__color-radio');
color.addEventListener('click', function() {
    setColor(setMethod());
});

let method = document.querySelector('.controls__method');
method.addEventListener('click', function() {
    setColor(setMethod());
});

let refresh = document.querySelector('.controls__refresh-button');
refresh.addEventListener('click', function() {
    let columns = +size.value;
    removeField();
    createField(columns, field);
});

let field = document.querySelector('.field');
let fieldListeners = [];
createField(16, field);