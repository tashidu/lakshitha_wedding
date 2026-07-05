$(window).on('load', function () {
    // Initialize falling sakura leaves
    $('body').sakura();
});

// Set the date we're counting down to
// UPDATE THIS TO THE ACTUAL WEDDING DATE
var countDownDate = new Date("Sep 3, 2026 00:00:00").getTime(); 

// Update the count down every 1 second
var countdownTimer = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("time").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("time").innerHTML = "HAPPILY MARRIED!";
    }
}, 1000);

// Handle RSVP Form Submission
function submitRSVP(event) {
    event.preventDefault(); // Prevent page reload
    
    const form = document.getElementById('rsvpForm');
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Saving...';
    submitBtn.disabled = true;

    // Google Apps Script Web App URL (Your personal Google Sheet)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzrcS3ZPnzdT4lrfTe_T8d6IY7tZ-h3oAMwdFsxB3J05jyc0QRIgwYLcBYzVBsWn6in/exec';

    fetch(scriptURL, { 
        method: 'POST', 
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        alert('Thank you! 🎉 Your RSVP has been saved to the Google Sheet.');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Oops! Something went wrong. Please try again.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Music Player Logic
const musicPlayer = document.getElementById('musicPlayer');
const weddingMusic = document.getElementById('weddingMusic');
const musicIcon = document.getElementById('musicIcon');
let isMusicPlaying = false;

function toggleMusic() {
    if (isMusicPlaying) {
        weddingMusic.pause();
        musicIcon.classList.remove('fa-spin');
        musicPlayer.classList.remove('playing');
        isMusicPlaying = false;
    } else {
        weddingMusic.play();
        musicIcon.classList.add('fa-spin');
        musicPlayer.classList.add('playing');
        isMusicPlaying = true;
    }
}

musicPlayer.addEventListener('click', toggleMusic);

// Autoplay attempt on first user interaction with the page (Mobile & Desktop)
function startMusic() {
    if (!isMusicPlaying) {
        weddingMusic.play().then(() => {
            musicIcon.classList.add('fa-spin');
            musicPlayer.classList.add('playing');
            isMusicPlaying = true;
        }).catch(err => {
            console.log("Autoplay blocked. User needs to interact.");
        });
    }
    // Remove the event listeners after first trigger
    document.body.removeEventListener('click', startMusic);
    document.body.removeEventListener('touchstart', startMusic);
    window.removeEventListener('keydown', startMusic);
}

// Add multiple event types to catch the first interaction
document.body.addEventListener('click', startMusic, { once: true });
document.body.addEventListener('touchstart', startMusic, { once: true });
window.addEventListener('keydown', startMusic, { once: true });
