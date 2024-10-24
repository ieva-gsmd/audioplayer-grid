let d = 50;
let player1, player2, player3, player4;
let currentPlayer = null;
let audioStarted = false;
let startButton;

function preload() {
  // Load audio files with fadeIn and fadeOut times
  player1 = new Tone.Player({
    url: "samples/drone-1.mp3",
    fadeIn: 0.5,
    fadeOut: 0.5
  }).toDestination();

  player2 = new Tone.Player({
    url: "samples/drone-2.mp3",
    fadeIn: 0.5,
    fadeOut: 0.5
  }).toDestination();

  player3 = new Tone.Player({
    url: "samples/drone-3.mp3",
    fadeIn: 0.5,
    fadeOut: 0.5
  }).toDestination();

  player4 = new Tone.Player({
    url: "samples/drone-4.mp3",
    fadeIn: 0.5,
    fadeOut: 0.5
  }).toDestination();
}

function setup() {
  createCanvas(400, 400);

  // Create a start/stop button to toggle audio
  startButton = createButton('Start Audio');
  startButton.position(20, 20);
  startButton.mousePressed(toggleAudio);
}

function draw() {
  background(220);

  if (audioStarted) {
    if (mouseX < 200 && mouseY < 200) {
      background(0, 200, 10);
      switchPlayer(player1);
    } else if (mouseX >= 200 && mouseY < 200) {
      background(200, 50, 10);
      switchPlayer(player2);
    } else if (mouseY >= 200 && mouseX < 200) {
      background(0, 200, 200);
      switchPlayer(player3);
    } else if (mouseY >= 200 && mouseX >= 200) {
      background(200, 200, 10);
      switchPlayer(player4);
    }
  }

  // Draw circle and grid lines
  circle(mouseX, mouseY, d);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
}

function switchPlayer(newPlayer) {
  if (currentPlayer !== newPlayer) {
    if (currentPlayer) {
      currentPlayer.stop();  // Fade out the current player
    }
    newPlayer.start();  // Fade in the new player
    currentPlayer = newPlayer;
  }
}

// Function to toggle audio on or off
function toggleAudio() {
  if (!audioStarted) {
    // Start the audio context on user gesture
    Tone.start().then(() => {
      audioStarted = true;
      startButton.html('Stop Audio');
    });
  } else {
    // Stop all audio and reset
    stopAllPlayers();
    audioStarted = false;
    startButton.html('Start Audio');
  }
}

// Stop all players when stopping the audio
function stopAllPlayers() {
  if (player1) player1.stop();
  if (player2) player2.stop();
  if (player3) player3.stop();
  if (player4) player4.stop();
  currentPlayer = null;
}