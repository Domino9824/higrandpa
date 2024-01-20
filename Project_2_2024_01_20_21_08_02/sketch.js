let clickToStartX;
let clickToStartY;
let images = [];
let currentImage = 0;
let started = false;
let textIndex = 0;
let soundEffect, backgroundMusic; // Variable for sound effect and background music
let textContent = [
  "I have been afraid of ghosts since I was a child.",
  "I know that in many children's imaginations, ghosts always look like a transparent white cloth floating in the air, revealing two deep, dark eyes.",
  "They are actually kind of cute."
];

function preload() {
  images[0] = loadImage('0.png');
  images[1] = loadImage('1.1.png');
  soundEffect = loadSound('mouse-click-153941.mp3');
  backgroundMusic = loadSound('0.mp3'); // Make sure this file name matches the uploaded file
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  clickToStartX = width / 4.3;
  clickToStartY = height / 1.27;
  backgroundMusic.loop(); // Start playing the background music
}

function draw() {
  clear();
  if (!started) {
    textFont('Creepster', 32);
    drawImageProportionally(images[0]);
    drawText("Click to start", clickToStartX, clickToStartY);
  } else {
    // Stop the music when the first image is no longer displayed
    if (backgroundMusic.isPlaying()) {
      backgroundMusic.stop();
    }
    textFont('Courier New', 15);
    drawImageProportionally(images[currentImage]);
    if (textIndex > 0 && textIndex <= textContent.length) {
      drawTextBox(textContent[textIndex - 1], width / 2, height - 50);
    }
  }
}

function mousePressed() {
  if (!started) {
    // Start or resume the background music
    if (!backgroundMusic.isPlaying()) {
      backgroundMusic.loop();
    }

    if (isMouseOverText("Click to start", clickToStartX, clickToStartY, 32)) {
      soundEffect.play();
      started = true;
      currentImage = 1;
      textIndex = 1; // Start with the first sentence
    }
  } else {
    // Increment textIndex and ensure it doesn't exceed the array length
    if (textIndex < textContent.length) {
      textIndex++;
    }
  }
}
function mouseMoved() {
  if (!started && isMouseOverText("Click to start", clickToStartX, clickToStartY, 32)) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function isMouseOverText(txt, x, y, size) {
  textSize(size);
  let textW = textWidth(txt);
  let textH = textSize();
  return mouseX > x - textW / 2 && mouseX < x + textW / 2 &&
         mouseY > y - textH / 2 && mouseY < y + textH / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawImageProportionally(img) {
  let imageAspectRatio = img.width / img.height;
  let windowAspectRatio = windowWidth / windowHeight;
  let drawWidth, drawHeight;

  if (windowAspectRatio > imageAspectRatio) {
    drawHeight = windowHeight;
    drawWidth = imageAspectRatio * drawHeight;
  } else {
    drawWidth = windowWidth;
    drawHeight = drawWidth / imageAspectRatio;
  }
  image(img, width / 2, height / 2, drawWidth, drawHeight);
}

function drawText(txt, x, y) {
  fill(255);
  stroke(0);
  strokeWeight(3);
  text(txt, x, y);
}

function drawTextBox(txt, x, y) {
  fill(0, 0, 0, 150);
  noStroke();
  rectMode(CENTER);
  let textBoxWidth = textWidth(txt) + 60;
  let textBoxHeight = 60;
  rect(x, y, textBoxWidth, textBoxHeight, 20);

  fill(255);
  textAlign(CENTER, CENTER);
  text(txt, x, y);
}
