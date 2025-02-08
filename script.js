document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;
    
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Course:', course);
    
    alert('Thank you for registering!');
});

let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
let startX, endX;

function showImage(index) {
    images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    endX = event.touches[0].clientX;
}

function handleTouchEnd() {
    if (startX - endX > 50) {
        showNextImage();
    } else if (endX - startX > 50) {
        showPrevImage();
    }
}

document.querySelector('.carousel').addEventListener('touchstart', handleTouchStart);
document.querySelector('.carousel').addEventListener('touchmove', handleTouchMove);
document.querySelector('.carousel').addEventListener('touchend', handleTouchEnd);

showImage(currentIndex);
