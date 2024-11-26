const container = document.querySelector(".circle-container");
const circleCount = 3; // Number of circles
const circles = [];

// Helper functions
function randomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function areCirclesColliding(circle1, circle2) {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < circle1.radius + circle2.radius;
}

// Fixed velocity for all circles
const fixedVelocity = 0.3; // Adjust this value for the desired speed

// Initialize circles
for (let i = 0; i < circleCount; i++) {
  let radius = randomValue(50, 100);
  let x, y;
  let tries = 0;
  do {
    x = randomValue(radius, window.innerWidth - radius);
    y = randomValue(radius, window.innerHeight - radius);
    var colliding = circles.some((c) =>
      areCirclesColliding({ x, y, radius }, c)
    );
    tries++;
  } while (colliding && tries < 10);

  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.width = circle.style.height = `${radius * 2}px`;
  container.appendChild(circle);

  // const velocityMultiplier = 2; // Adjust for slower speed
  // const velocityX = randomValue(-0.5, 0.5) * velocityMultiplier; // Slower random speed
  // const velocityY = randomValue(-0.5, 0.5) * velocityMultiplier; // Slower random speed

  // Assign fixed velocity with random direction
  const velocityX = Math.random() > 0.5 ? fixedVelocity : -fixedVelocity;
  const velocityY = Math.random() > 0.5 ? fixedVelocity : -fixedVelocity;

  circles.push({ x, y, radius, element: circle, velocityX, velocityY });
}

// Animation loop
function animateCircles() {
  circles.forEach((circle, i) => {
    // Move circle by its velocity
    circle.x += circle.velocityX;
    circle.y += circle.velocityY;

    // Check for boundary collisions and bounce
    if (
      circle.x <= circle.radius ||
      circle.x >= window.innerWidth - circle.radius
    ) {
      circle.velocityX *= -1;
    }
    if (
      circle.y <= circle.radius ||
      circle.y >= window.innerHeight - circle.radius
    ) {
      circle.velocityY *= -1;
    }

    // Check for collisions with other circles
    for (let j = i + 1; j < circles.length; j++) {
      const otherCircle = circles[j];
      if (areCirclesColliding(circle, otherCircle)) {
        circle.velocityX *= -1;
        circle.velocityY *= -1;
        otherCircle.velocityX *= -1;
        otherCircle.velocityY *= -1;
      }
    }

    // Update circle position
    circle.element.style.left = `${circle.x - circle.radius}px`;
    circle.element.style.top = `${circle.y - circle.radius}px`;
  });

  requestAnimationFrame(animateCircles);
}

// Start animation
animateCircles();
