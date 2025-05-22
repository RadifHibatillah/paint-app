// Tangkap elemen dari DOM
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const brushBtn = document.getElementById("brush");
const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");
const colorPicker = document.getElementById("colorPicker"); // perbaikan id

// Set up canvas size
canvas.width = 800;
canvas.height = 500;

let painting = false;
let erasing = false;
let currentColor = "#000000";
let lineWidth = 5;

// Mulai gambar
function startPosition(e) {
  painting = true;
  ctx.beginPath(); // reset path
  draw(e);
}

// Berhenti gambar
function endPosition() {
  painting = false;
  ctx.beginPath(); // reset path
}

// Gambar di canvas
function draw(e) {
  if (!painting) return;

  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = erasing ? "#ffffff" : currentColor;

  // e.offsetX, e.offsetY sudah relatif ke canvas
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// Pilih brush
function selectBrush() {
  erasing = false;
  brushBtn.classList.add("active");
  eraserBtn.classList.remove("active");
}

// Pilih eraser
function selectEraser() {
  erasing = true;
  eraserBtn.classList.add("active");
  brushBtn.classList.remove("active");
}

// Bersihkan canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Ganti warna
function changeColor(e) {
  currentColor = e.target.value;
}

// Event listeners
brushBtn.addEventListener("click", selectBrush);
eraserBtn.addEventListener("click", selectEraser);
clearBtn.addEventListener("click", clearCanvas);
colorPicker.addEventListener("input", changeColor);

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mouseout", endPosition); // juga saat mouse keluar
canvas.addEventListener("mousemove", draw);
