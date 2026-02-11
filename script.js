const noBtn = document.getElementById('no-btn');
const landingPage = document.getElementById('landing-page');
const messagePage = document.getElementById('message-page');

// Make the 'No' button run away
// Initialize the No button position so it doesn't "jump" the first time
window.onload = () => {
    noBtn.style.left = noBtn.offsetLeft + "px";
    noBtn.style.top = noBtn.offsetTop + "px";
};

noBtn.addEventListener('mouseover', () => {
    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate "Safe Zone" (Window size minus button size)
    const maxX = window.innerWidth - btnWidth - 20; // 20px padding
    const maxY = window.innerHeight - btnHeight - 20;

    // Generate random coordinates within the safe zone
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
});

// Transition to Message Page
function nextPage() {
    landingPage.style.opacity = '0';
    setTimeout(() => {
        landingPage.classList.add('hidden');
        messagePage.classList.remove('hidden');
        messagePage.style.opacity = '1';
        startHeartRain(); // <--- THIS TRIGGERS THE HEARTS
    }, 800);
}
function startHeartRain() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '💖'; // You can mix in 💖 or 🌸
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 0.8 + 1.5 + 's';
        document.body.appendChild(heart);
        
        // Remove hearts after they fall to keep the computer fast
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

function showLetter() {
    messagePage.style.opacity = '0';
    setTimeout(() => {
        messagePage.classList.add('hidden');
        const letterPage = document.getElementById('letter-page');
        letterPage.classList.remove('hidden');
        letterPage.style.opacity = '1';
    }, 800);
}

function openLetter() {
    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.toggle('open');
}

function showFinalPage(event) {
    event.stopPropagation(); // Stops the envelope from closing when clicking "Continue"
    const letterPage = document.getElementById('letter-page');
    letterPage.style.opacity = '0';
    setTimeout(() => {
        letterPage.classList.add('hidden');
        // Trigger the final page show function here
        showFinalMessage(); 
    }, 800);
}
function showFinalPage(event) {
    if(event) event.stopPropagation();
    
    const letterPage = document.getElementById('letter-page');
    const photoPage = document.getElementById('photo-page'); // Our new page
    
    letterPage.style.opacity = '0';
    setTimeout(() => {
        letterPage.classList.add('hidden');
        photoPage.classList.remove('hidden');
        photoPage.style.opacity = '1';
        photoPage.style.display = 'block';
    }, 800);
}

// And the next function for the button at the bottom of the photos
//function showExpressionPage() {
//    const photoPage = document.getElementById('photo-page');
//    photoPage.style.opacity = '0';
//    setTimeout(() => {
//        photoPage.classList.add('hidden');
//        // We will build the "Expression & Inbox" part next!
//        console.log("Ready for Part 2 & 3!");
//    }, 800);
//}
function showExpressionPage() {
    const photoPage = document.getElementById('photo-page');
    const confessionPage = document.getElementById('confession-page');
    
    // 1. Start by fading out the current page
    photoPage.style.opacity = '0';
    
    setTimeout(() => {
        // 2. Completely hide the photo page so it takes up NO space
        photoPage.classList.add('hidden');
        
        // 3. Reveal the confession page
        confessionPage.classList.remove('hidden');
        confessionPage.style.display = 'flex'; // This forces it to center
        
        // 4. Fade it in
        setTimeout(() => {
            confessionPage.style.opacity = '1';
        }, 50);
    }, 800); // Matches the fade-out time
}


function flipCard(card) {
    card.classList.toggle('flipped');
}

function showValentinePage() {
    const confessionPage = document.getElementById('confession-page');
    const finalPage = document.getElementById('final-page');
    
    confessionPage.style.opacity = '0';
    setTimeout(() => {
        confessionPage.classList.add('hidden');
        finalPage.classList.remove('hidden');
        finalPage.style.display = 'flex';
        
        setTimeout(() => {
            finalPage.style.opacity = '1';
        }, 50);
    }, 800);
}
document.getElementById("valentine-form").addEventListener("submit", function(event) {
    event.preventDefault(); // This stops the redirect to Formspree!

    const form = event.target;
    const data = new FormData(form);
    const button = form.querySelector('.send-btn');
    
    // Change button text to show it's sending
    button.innerHTML = "Sending...";
    button.disabled = true;

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Success! Move to the Gratitude page
            showThankYouPage();
        } else {
            alert("Oops! There was a problem sending your message.");
            button.disabled = false;
            button.innerHTML = "Send My Heart to Yours ❤️";
        }
    }).catch(error => {
        alert("Oops! Connection error.");
        button.disabled = false;
        button.innerHTML = "Send My Heart to Yours ❤️";
    });
});

function showThankYouPage() {
    const finalPage = document.getElementById('final-page');
    const thankYouPage = document.getElementById('thank-you-page');
    
    finalPage.style.opacity = '0';
    setTimeout(() => {
        finalPage.classList.add('hidden');
        thankYouPage.classList.remove('hidden');
        thankYouPage.style.display = 'flex';
        setTimeout(() => {
            thankYouPage.style.opacity = '1';
        }, 50);
    }, 800);
}