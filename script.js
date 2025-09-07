let airParticles = [];
let pollutantParticles = [];

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);

  // Draw filter zone
  fill(200);
  rect(200, 100, 100, 200);
  fill(0);
  textSize(16);
  text("Air Bio-filter", 220, 90);
  text("Air Intake", 20, 90);
  text("Clean Air Output", 500, 90);

  // Generate particles
  if (frameCount % 5 == 0) {
    airParticles.push({x: 50, y: random(150, 250)});
    pollutantParticles.push({x: 50, y: random(150, 250)});
  }

  // Move and display air particles
  for (let p of airParticles) {
    p.x += 2;
    fill(0, 150, 255);
    ellipse(p.x, p.y, 10, 10);
  }

  // Move and filter pollutants
  for (let p of pollutantParticles) {
    p.x += 2;
    if (p.x > 200 && random() < 0.9) {
      // Filter out 90% of pollutants
      p.x = width + 100;
    } else {
      fill(255, 0, 0);
      ellipse(p.x, p.y, 8, 8);
    }
  }
}
