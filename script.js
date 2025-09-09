let airParticles = [];
let pollutantParticles = [];
let droplets = [];
let water = [];


function setup() {
  createCanvas(600, 1000); // Taller canvas for vertical flow
}

function draw() {
  background(220);

  // Draw filter zone
  fill(200);
  rect(100, 130, 300, 700);
  fill(100);
  rect(100, 130, 300, 20);
  fill(50);
  rect(100, 250, 300, 50); // Horizontal filter zone
  fill(0);
  textSize(16);
  text("Air Bio-filter", 5, 280);
  text("Air Intake", 5, 145);

  fill(100, 200, 255);
  rect(300, 350, 50, 100); // Cold side
  fill(255, 100, 100);
  rect(350, 350, 50, 100); // Hot side with fan
  fill(0);
  textSize(16);
  text("Cold Side", 230, 400);
  text("Hot Side", 410, 400);
  text("Peltier cooler", 300, 470);
  text("Water", 410, 550);
  text("Water Bio-filter", 410, 650);
  text("Portable Water", 410, 770);

  fill(0, 0, 200);
  rect(100, 500, 300, 100);
  fill(100);
  rect(100, 500, 20, 10);
  fill(10);
  rect(100, 600, 300, 100);
  fill(10);
  rect(70, 800, 30, 10);
  fill(0, 0, 300, 150);
  rect(100, 700, 300, 130 )

  // Generate particles
  if (frameCount % 5 == 0) {
    airParticles.push({ x: random(120, 280), y: 0, slowed: false, coolingTime: 0 });
    pollutantParticles.push({ x: random(120, 280), y: 0 });
  }

  // Move and display pollutant particles
  for (let p of pollutantParticles) {
    p.y += 2;
    if (p.y > 300 && random() < 0.9) {
      p.y = height + 100;
    } else {
      fill(255, 0, 0);
      ellipse(p.x, p.y, 8, 8);
    }
  }

  // Move and display air particles
  for (let p of airParticles) {
    // Check if in cold zone
    if (p.y > 350 && p.y < 450) {
      p.slowed = true;
      p.coolingTime += 1;
      p.y += 0.5; // Slow movement
      if (p.coolingTime > 10 && random() < 0.2) {
        // After being in the zone for some frames, turn into droplet
        droplets.push({ x: p.x, y: p.y });
        p.y = height + 100; // Remove particle
      }
    } else {
      p.y += 2; // Normal speed
    }

    // Draw particle
    if (p.slowed) {
      fill(0, 100, 255); // cooled air
    } else {
      fill(0, 150, 255); // normal air
    }
    ellipse(p.x, p.y, 10, 10);
  }

  // Move and display air particles
for (let p of airParticles) {
  if (p.y > 350 && p.y < 450) {
    p.slowed = true;
    p.coolingTime += 1;
    p.y += 0.5; // Slow movement
    if (p.coolingTime > 10 && random() < 0.2) {
      droplets.push({ x: p.x, y: p.y });
      p.y = height + 100; // Mark for removal
    }
  } else {
    p.y += 2; // Normal speed
  }

  if (p.y <= height) {
    // Draw only if inside the canvas
    fill(p.slowed ? color(0, 100, 255) : color(0, 150, 255));
    ellipse(p.x, p.y, 10, 10);
  }
}

// Remove air particles that are off-screen
airParticles = airParticles.filter(p => p.y <= height);

// Move and display droplets
for (let d of droplets) {
  d.y += 3;
  if (d.y > 500) {
    water.push({ x: d.x, y: 500, size: 6 });
    d.y = height + 100; // Mark for removal
  } else {
    fill(0, 0, 255);
    ellipse(d.x, d.y, 6, 6);
  }
}

// Remove droplets that are off-screen
droplets = droplets.filter(d => d.y <= height);

// Draw and animate collected water
for (let w of water) {
    // Check if the water element has been alive for more than 300 frames (~5 seconds at 60fps)
    if (frameCount - w.timeCreated < 600) {
      w.size = min(w.size + 0.1, 50); // Keep growing until max size
      w.x += random(-0.5, 0.5); // simulate flow
    }
    fill(0, 0, 200, 150);
    ellipse(w.x, w.y, w.size, w.size * 0.3); // Always draw, even if paused
  }

}

