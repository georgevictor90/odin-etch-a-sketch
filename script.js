// DEFINE DEFAULT VALUES
const DEFAULT_COLOR = '#37474F';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

//ASSIGN DEFAULT VALUES TO CURRENT MODES
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;


//ASSIGN NEW VALUES TO CURRENT SETTINGS
function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}


//SELECT ELEMENTS
const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const darkenBtn = document.getElementById('darkenBtn');
const eraserBtn = document.getElementById('eraserBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const resetBtn = document.getElementById('resetBtn');
const grid = document.getElementById('gridContainer');


//SET EVENT LISTENERS AND FUNCTIONS
colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
darkenBtn.onclick = () => setCurrentMode('darken');
eraserBtn.onclick = () => setCurrentMode('eraser');
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);
resetBtn.onclick = () => reloadGrid();


//DEFINE FUNCTIONS THAT RUN ON EVENT LISTENERS
function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function updateSizeValue(value) {
  sizeValue.textContent = `${value} x ${value}`;
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = '';
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.addEventListener('mouseover', changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (currentMode === 'rainbow') {
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'darken') {
    e.target.style.backgroundColor = '#222222';
    e.target.style.opacity -= -0.1;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#FFFFFF';
  }
}

function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active');
  } else if (currentMode === 'color') {
    colorBtn.classList.remove('active');
  } else if (currentMode === 'darken') {
    darkenBtn.classList.remove('active');
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active');
  }

  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active');
  } else if (newMode === 'color') {
    colorBtn.classList.add('active');
  } else if (newMode === 'darken') {
    darkenBtn.classList.add('active');
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active');
  }
}


//CALL INITIAL FUNCTION ON PAGE LOAD
window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton( DEFAULT_MODE);
}