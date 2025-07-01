let startX = 0, startY = 0;
let newCard;  // This will store the duplicate card

// Select all cards
const cards = document.querySelectorAll('.card');
let box = document.querySelector(".mouth-container");

// Set the background images for each card based on the data-image attribute
cards.forEach(card => {
    const imageUrl = card.getAttribute('data-image');
    card.style.backgroundImage = `url('${imageUrl}')`;  // Fix the syntax for setting background
    card.style.backgroundSize = 'cover'; // Ensures the image covers the card
    card.style.backgroundPosition = 'center'; // Centers the image
    card.style.backgroundRepeat = 'no-repeat'; // Prevents image repeat
});

// Add mouse event listeners for each card
cards.forEach(card => {
    card.addEventListener('mousedown', mouseDown);
});

function mouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;
    const card = e.target; // Get the clicked card
      e.preventDefault();

    // Create the duplicate card only once when the user clicks
    if (!newCard) {
      newCard = card.cloneNode(true);  // Clone the card
      newCard.style.position = 'absolute';  // Make it moveable
      newCard.style.top = `${e.clientY - card.offsetHeight / 2}px`;
      newCard.style.left = `${e.clientX - card.offsetWidth / 2}px`;
      newCard.style.opacity = '1';  // Set visible for the duplicate
      newCard.style.width = `${card.offsetWidth}px`;  // Explicitly set the width
      newCard.style.height = `${card.offsetHeight}px`;  // Explicitly set the height
      newCard.classList.add('duplicate');  // Add a class to identify duplicates
      newCard.style.transition = 'none'; 

      document.body.appendChild(newCard);
        // Set the <p> inside the newCard to be invisible
    const newCardText = newCard.querySelector("p");
    if (newCardText) {
        newCardText.style.opacity = '0';
    }
  }

    // Set the background image of the new card to the clicked card's image
    const imageUrl = card.getAttribute('data-image');
    newCard.style.backgroundImage = `url('${imageUrl}')`;

    // Track the mouse movement continuously after initial click
    document.addEventListener('mousemove', moveCard);
    document.addEventListener('mouseup', mouseUp);

    // Add a mousedown event to the duplicate card itself, allowing it to be dragged again
    newCard.addEventListener('mousedown', handleDuplicateClick);
      e.preventDefault();
}

function moveCard(e) {
    // Update the duplicate card's position based on the mouse movement
    newCard.style.top = `${e.clientY - newCard.offsetHeight / 2}px`;
    newCard.style.left = `${e.clientX - newCard.offsetWidth / 2}px`;
  e.preventDefault();
    // Check if the duplicate card overlaps with the mouth container
    checkOverlapWithDuplicate();
}

function mouseUp(e) {
    // Stop moving the card when the mouse is released
    document.removeEventListener('mousemove', moveCard);
}

// Check overlap between the duplicate card and the mouth container
function checkOverlapWithDuplicate() {
    const newCardRect = newCard.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();

    // Check if the duplicate card overlaps with the mouth container
    const isOverlapping = !(newCardRect.right < boxRect.left || 
                            newCardRect.left > boxRect.right || 
                            newCardRect.bottom < boxRect.top || 
                            newCardRect.top > boxRect.bottom);

    // Make the duplicate card invisible when it overlaps with the mouth container
    if (isOverlapping) {
        newCard.style.opacity = '0'; // Make the duplicate card invisible (disappear)
    } else {
        newCard.style.opacity = '1'; // Make the duplicate card visible again
    }
}

// Allow the duplicate card to be dragged again when clicked
function handleDuplicateClick(e) {
    startX = e.clientX;
    startY = e.clientY;

    // Reattach mousemove and mouseup listeners to the duplicate card when clicked again
    document.addEventListener('mousemove', moveCard);
    document.addEventListener('mouseup', mouseUp);

    // Prevent the default behavior to avoid unintentional selection of the card
    e.preventDefault();
}

// Mouse cursor disappears when near the mouth container
var mouthContainer = document.querySelector(".mouth-container");
var radius = 80; // Adjust this value to set the radius size

document.addEventListener("mousemove", function(event) {
  var mouthRect = mouthContainer.getBoundingClientRect();
  var mouthCenterX = mouthRect.left + mouthRect.width / 2;
  var mouthCenterY = mouthRect.top + mouthRect.height / 2;
  var distance = Math.sqrt(Math.pow(event.clientX - mouthCenterX, 2) + Math.pow(event.clientY - mouthCenterY, 2));

  // Hide the cursor when near the mouth container
  if (distance <= radius) {
    document.body.style.cursor = "none";
  } else {
    document.body.style.cursor = "default";
  }
});

// Pupils follow the mouse
var balls = document.getElementsByClassName("pupil");
document.onmousemove = function(event) {
  var x = event.clientX * 100 / window.innerWidth + "%";
  var y = event.clientY * 100 / window.innerHeight + "%";

  for(var i = 0; i < balls.length; i++) {
    balls[i].style.left = x;
    balls[i].style.top = y;
    balls[i].style.transform = "translate(-" + x + ",-" + y + ")";
  }
};

// Animation trigger for the open mouth
var openDivs = document.getElementsByClassName("open");
for (var i = 0; i < openDivs.length; i++) {
  openDivs[i].addEventListener("click", function() {
    this.style.animationPlayState = "running";
  });
}


// Close the overlay when clicked
document.addEventListener('DOMContentLoaded', function() {
  const closeButton = document.getElementById('closeOverlay');
  const overlay = document.getElementById('overlay');
  

  closeButton.addEventListener('click', function() {
      overlay.classList.add('hidden'); // Hide overlay

});
});
// Toggle visibility of the hidden content



document.addEventListener("DOMContentLoaded", () => {
  const mouthContainer = document.querySelector(".mouth-container");
  const hoverText = document.getElementById("hover_text");
  const hiddenContent = document.getElementById('hiddenContent');
  const revealButton = document.getElementById('revealButton');
  const card25 = document.querySelector('p');
  const openMouth = document.querySelector(".open");
  document.getElementById("revealButton").style.backgroundImage = "url('./images/fridge open 1.svg')";
  hoverText.style.transform = 'scale(1,1)';

  // Set transition for smooth opacity change
  hoverText.style.transition = "opacity 0.4s ease-out"; // Smooth opacity transition

 

  

  // Handle mouseenter on mouthContainer (only run animation if not disabled)
  let animationInProgress = false;

  function isInTopLeftHalf(container, event) {
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const halfWidth = container.offsetWidth / 1.5;
    const halfHeight = container.offsetHeight / 1.5;
  
    return mouseX <= halfWidth && mouseY <= halfHeight;
  }


  mouthContainer.addEventListener("mouseenter", () => {
    if (hoverText.dataset.disabled === "true" || animationInProgress) return;
    if (animationInProgress) return;
       animationInProgress = true;
    openMouth.classList.add("shrinking");
  });
  
  // Animation end listener
  openMouth.addEventListener("animationend", (event) => {
    
    if (hoverText.dataset.disabled === "true") {
      animationInProgress = false;
      return; // if disabled, DO NOTHING
    }
    if (event.animationName === "example") {
      hoverText.style.opacity = "1";
      animationInProgress = false;
    }
  });
  
  // Mouseleave resets everything
  mouthContainer.addEventListener("mouseleave", () => {
    openMouth.classList.remove("shrinking");
    hoverText.style.opacity = "0";
    animationInProgress = false;
  });
  // Handle mouseleave on mouthContainer, reset hoverText opacity to 0
  mouthContainer.addEventListener("mouseleave", () => {
    if (hoverText.dataset.disabled === "true" ) return; // If disabled or animation in progress, do nothing
    hoverText.style.opacity = "0"; // Opacity reset with smooth transition
  });


// Handle revealButton click event
revealButton.addEventListener('click', () => {
  if (hiddenContent.style.display === 'none') {
    hiddenContent.style.display = 'block';
    revealButton.style.backgroundImage = "url('./images/fridge closed1.svg')";
    hoverText.style.opacity = "0";
    hoverText.dataset.disabled = "true"; // Prevent hoverText from being animated again
   // FULL RESET
   hoverText.style.opacity = "0";                // Immediately hide hoverText
   hoverText.dataset.disabled = "true";           // Set disabled
   openMouth.classList.remove("shrinking");       // Remove shrinking animation class
   openMouth.style.animation = "none";            // Kill any animation
   void openMouth.offsetWidth;                    // Force reflow
   openMouth.style.animation = null;              // Reset animation property cleanly

  } else {
    hiddenContent.style.display = 'none';
    revealButton.style.backgroundImage = "url('./images/fridge open 1.svg')";
    hoverText.style.opacity = "0";
    hoverText.dataset.disabled = "false"; // Enable hoverText animation again if needed
  }
});


  revealButton.addEventListener("mouseenter", () => {
    if (hiddenContent.style.display === 'none') {
      revealButton.style.setProperty("filter", "drop-shadow(0 0 0.75rem white)");
    }
  });

  revealButton.addEventListener("mouseleave", () => {
    revealButton.style.setProperty("filter", "drop-shadow(0 0 0rem crimson)");
  });
});
