const canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 500;

let default_color = "black";
let draw_color = default_color;
let draw_width = "1";
let is_drawing = false;
let is_writing = false;

canvas.addEventListener("touchstart", start_drawing, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start_drawing, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchend", stop_drawing, false);
canvas.addEventListener("mouseup", stop_drawing, false);
canvas.addEventListener("mouseout", stop_drawing, false);
canvas.addEventListener('click', write_text, false);

function start_drawing(event){
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function draw(event){
    if(is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.drawCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
}

function stop_drawing(event){
    if(is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();
}

let clearTool = document.querySelector('#clearTool');

clearTool.addEventListener('click', function(){
    context.fillStyle = 'white';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
});

document.querySelector('#textTool').addEventListener('click', start_writing);

function start_writing(){
    is_writing = true;
}

let xPos = 0;
let yPos = 0;

function write_text(event) {
    if(is_writing) {
        xPos = event.clientX;
        yPos = event.clientY;
        placeDiv(xPos, yPos);
    }
}

let input = document.querySelector('.text');
function placeDiv(xPos, yPos) {
    console.log(input);
    input.style.top = yPos + 'px';
    input.style.left = xPos + 'px';
    input.style.display = 'initial';
    input.value = '';
}

input.addEventListener('change', function () { input_text() });

function input_text(){
    context.fillText(input.value, xPos, yPos);
    input.style.display = 'none';
    is_writing = false;
}