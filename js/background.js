// Get the container element
const container = document.querySelector(".container");

// Repeat the process 100 times
for (let i = 0; i < 100; i++) {
  // Create circle container div
  const circleContainer = document.createElement("div");
  circleContainer.classList.add("circle-container");

  // Create circle div
  const circle = document.createElement("div");
  circle.classList.add("circle");

  // Append circle div to circle container div
  circleContainer.appendChild(circle);

  // Append circle container div to the main container
  container.appendChild(circleContainer);
}
