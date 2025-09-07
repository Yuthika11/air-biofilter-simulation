let airParticles = [];
let pollutantParticles = [];
let humidity = 0.7;
let cooling = 0.8;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);

  // Air intake
  fill(0, 150, 255);
  ellipse(50, 200, 40, 40);

  // Generate air and pollutants
  if (frameCount % 5 == 0) {
    airParticles.push({x: 50, y: random(180, 220)});
    pollutantParticles.push({x: 50, y: random(180, 220)});
  }

  // Move air particles through filter
  for (let p of airParticles) {
    p.x += 2;
    fill(0, 150, 255);
    ellipse(p.x, p.y, 10, 10);
  }

  // Move pollutants and filter them
  for (let p of pollutantParticles) {
    p.x += 2;
    if (p.x > 200 && random() < 0.9) {
      // filtered out
      p.x = width + 100;
    } else {
      fill(255, 0, 0);
      ellipse(p.x, p.y, 8, 8);
    }
  }

  // Condenser
  fill(100);
  rect(300, 150, 20, 100);

  // Create drops at condenser output
  if (frameCount % 20 == 0) {
    fill(0, 0, 255);
    ellipse(350, 200, 10, 10);
  }

  // Water bio-filter
  fill(150, 75, 0);
  rect(500, 150, 20, 100);

  // Clean output
  fill(0, 0, 255);
  ellipse(650, 200, 15, 15);

  // Labels
  fill(0);
  text("Air Intake", 20, 150);
  text("Air Bio-filter", 150, 150);
  text("Condenser", 280, 140);
  text("Water Bio-filter", 480, 140);
  text("Potable Water", 620, 150);
}
