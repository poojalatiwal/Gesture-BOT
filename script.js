const bots = [];
const gestures = [];
const BASE_URL = 'http://localhost:8080/api';

function updateBotStatus() {
  const botStatusDiv = document.getElementById('bot-status');
  if (botStatusDiv) {
    botStatusDiv.innerHTML = bots.length
      ? `<p>Total Bots: ${bots.length}</p>`
      : `<p>No bots available.</p>`;
  }
}

function addBot() {
  const botName = prompt("Enter bot name:");
  if (botName) {
    bots.push(botName);
    saveData();
    renderBotList();
    updateBotStatus();
  }
}

function renderBotList() {
  const botListDiv = document.getElementById('bot-list');
  if (botListDiv) {
    botListDiv.innerHTML = bots.map(bot => `<p>${bot}</p>`).join('');
  }
}

function configureGestures() {
  const gestureName = prompt("Enter gesture name:");
  if (gestureName) {
    gestures.push(gestureName);
    saveData();
    renderGestureList();
  }
}

function renderGestureList() {
  const gestureListDiv = document.getElementById('gesture-list');
  if (gestureListDiv) {
    gestureListDiv.innerHTML = gestures.length
      ? gestures.map(gesture => `<p>${gesture}</p>`).join('')
      : `<p>No gestures configured.</p>`;
  }
}

function logout() {
  sessionStorage.clear();
  localStorage.clear();
  window.location.replace('Login.html');
}

function saveData() {
  localStorage.setItem('bots', JSON.stringify(bots));
  localStorage.setItem('gestures', JSON.stringify(gestures));
}

function loadData() {
  const savedBots = JSON.parse(localStorage.getItem('bots'));
  const savedGestures = JSON.parse(localStorage.getItem('gestures'));
  if (savedBots) bots.push(...savedBots);
  if (savedGestures) gestures.push(...savedGestures);
}

document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem("loggedIn")) {
    window.location.replace('Login.html');
    return;
  }

  const addBotButton = document.getElementById('add-bot');
  const configureGesturesButton = document.getElementById('configure-gestures');

  if (addBotButton) addBotButton.addEventListener('click', addBot);
  if (configureGesturesButton) configureGesturesButton.addEventListener('click', configureGestures);

  loadData();
  renderBotList();
  renderGestureList();
  updateBotStatus();
  fetchRobotStatus();
  loadLatestCommand();
  setInterval(fetchRobotStatus, 5000);
});

function sendCommand() {
  const cmdInput = document.getElementById('cmdInput');
  const botIdInput = document.getElementById('botIdInput');
  if (!cmdInput || !botIdInput) return alert("Command or Bot ID input field not found");

  const cmd = cmdInput.value.trim();
  const botId = botIdInput.value.trim();

  if (!cmd || !botId) return alert("Both command and Bot ID are required");

  fetch(`${BASE_URL}/command/set`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command: cmd, botId: parseInt(botId) })
  })
    .then(res => res.text())
    .then(alert)
    .catch(console.error);
}


function loadLatestCommand() {
  const botIdInput = document.getElementById('botIdInput');
  if (!botIdInput) {
    alert("Bot ID input field not found.");
    return;
  }

  const botId = botIdInput.value.trim();
  if (!botId) {
    alert("Please enter a valid Bot ID.");
    return;
  }

  fetch(`${BASE_URL}/command/latest/${botId}`)
    .then(res => res.text())
    .then(data => {
      const cmdElement = document.getElementById('latestCommand');
      if (cmdElement) {
        cmdElement.innerText = data;
      }
    })
    .catch(error => {
      console.error('Error fetching latest command:', error);
      alert("Failed to load the latest command.");
    });
}


function loadAllStatus() {
  fetch(`${BASE_URL}/status/all`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('statusList');
      if (!list) return;

      list.innerHTML = '';
      data.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `Gesture: ${item.gesture}, Distance: ${item.distance}, Obstacle: ${item.obstacle}`;
        list.appendChild(li);
      });
    })
    .catch(console.error);
}

async function fetchRobotStatus() {
  try {
    const response = await fetch(`${BASE_URL}/status/all`);
    const data = await response.json();
    const statusEl = document.getElementById('robot-status-message');
    if (!statusEl) return;

    if (data.length > 0) {
      const latest = data[data.length - 1];
      statusEl.textContent =
        `Gesture: ${latest.gesture}, Distance: ${latest.distance}, Obstacle: ${latest.obstacle}, Timestamp: ${latest.timestamp}`;
    } else {
      statusEl.textContent = "No status available.";
    }
  } catch (err) {
    const statusEl = document.getElementById('robot-status-message');
    if (statusEl) statusEl.textContent = "Error fetching data.";
    console.error(err);
  }
}
