// save a new memory to local storage
function saveMemory() {
  const input = document.getElementById("memoryInput").value;
  const mood = document.querySelector("input[name='mood']:checked").value;
  if (!input.trim()) return alert("please write something.");
  const memories = JSON.parse(localStorage.getItem("memories") || "[]");
  memories.push({ text: input, mood: mood, date: new Date().toLocaleDateString() });
  localStorage.setItem("memories", JSON.stringify(memories));
  alert("memory saved.");
  document.getElementById("memoryInput").value = "";
}

// display all saved memories
function displayMemories() {
  const container = document.getElementById("memoryList");
  const memories = JSON.parse(localStorage.getItem("memories") || "[]");
  if (!memories.length) {
    container.innerHTML = "<p>no memories yet.</p>";
    return;
  }
  container.innerHTML = memories.map(m => `
    <div class="highlight mood-${m.mood}">
      <strong>${m.date} — ${m.mood}</strong><br>${m.text}
    </div>
  `).join("");
}

// show a random memory from the list
function showRandomMemory() {
  const memories = JSON.parse(localStorage.getItem("memories") || "[]");
  if (!memories.length) return;
  const pick = memories[Math.floor(Math.random() * memories.length)];
  document.getElementById("randomMemory").innerHTML = `
    <div><strong>${pick.date} — ${pick.mood}</strong><br>${pick.text}</div>
  `;
}

// if on view page, show memories right away
if (document.getElementById("memoryList")) displayMemories();

// toggle dark mode on/off
document.getElementById("toggleMode").onclick = () => {
  document.body.classList.toggle("dark");
};

// create the stars in the background
const canvas = document.getElementById("stars-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let stars = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5
}));

// animate the stars
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
  });
  requestAnimationFrame(animateStars);
}
animateStars();