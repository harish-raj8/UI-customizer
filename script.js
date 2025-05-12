const bgColorInput = document.getElementById("bgColor");
const textColorInput = document.getElementById("textColor");
const fontSelect = document.getElementById("fontSelect");
const fontSizeInput = document.getElementById("fontSize");
const fontSizeLabel = document.getElementById("fontSizeLabel");
const elementSelector = document.getElementById("elementSelector");

const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const resetBtn = document.getElementById("resetBtn");

function applyTheme() {
  const selectedTag = elementSelector.value;
  const elements = document.querySelectorAll("h1, p");

  // Reset all
  elements.forEach(el => {
    el.style.color = "";
    el.style.fontFamily = "";
    el.style.fontSize = "";
  });

  // Apply only to selected tag
  document.querySelectorAll(selectedTag).forEach(el => {
    el.style.color = textColorInput.value;
    el.style.fontFamily = fontSelect.value;
    el.style.fontSize = fontSizeInput.value + "px";
  });

  document.body.style.backgroundColor = bgColorInput.value;
  fontSizeLabel.textContent = fontSizeInput.value + "px";
}

// Save theme
function saveTheme() {
  const theme = {
    bgColor: bgColorInput.value,
    textColor: textColorInput.value,
    font: fontSelect.value,
    fontSize: fontSizeInput.value,
    target: elementSelector.value
  };
  localStorage.setItem("theme", JSON.stringify(theme));
  alert("Theme saved!");
}

// Load theme
function loadTheme() {
  const theme = JSON.parse(localStorage.getItem("theme"));
  if (!theme) return alert("No theme found!");

  bgColorInput.value = theme.bgColor;
  textColorInput.value = theme.textColor;
  fontSelect.value = theme.font;
  fontSizeInput.value = theme.fontSize;
  elementSelector.value = theme.target;

  applyTheme();
  alert("Theme loaded!");
}

// Reset
function resetTheme() {
  bgColorInput.value = "#f5f5f5";
  textColorInput.value = "#000000";
  fontSelect.value = "Arial";
  fontSizeInput.value = "24";
  elementSelector.value = "h1";
  fontSizeLabel.textContent = "24px";

  applyTheme();
  localStorage.removeItem("theme");
  alert("Theme reset!");
}

// Event Listeners
[bgColorInput, textColorInput, fontSelect, fontSizeInput, elementSelector].forEach(el => {
  el.addEventListener("input", applyTheme);
});
saveBtn.addEventListener("click", saveTheme);
loadBtn.addEventListener("click", loadTheme);
resetBtn.addEventListener("click", resetTheme);

// Drag Function
const box = document.getElementById("customizerBox");
const header = box.querySelector(".drag-header");
let isDragging = false, offsetX, offsetY;

header.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - box.offsetLeft;
  offsetY = e.clientY - box.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    box.style.left = `${e.clientX - offsetX}px`;
    box.style.top = `${e.clientY - offsetY}px`;
  }
});


document.addEventListener("mouseup", () => {
  isDragging = false;
});