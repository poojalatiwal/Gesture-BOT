const bots = [];
const gestures = [];

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
});
