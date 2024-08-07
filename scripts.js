document.addEventListener('DOMContentLoaded', function() {
    const imageCategory = document.getElementById('images');
    const videoCategory = document.getElementById('videos');
    const testimonialForm = document.getElementById('testimonial-form');
    const testimonialList = document.querySelector('.testimonial-list');
    const starRating = document.getElementById('star-rating');
    let selectedRating = 0;

    // Array of your creations
    const creations = [
        { type: 'image', src: 'assets/image1.jpg' },
        { type: 'image', src: 'assets/image2.jpg' },
        { type: 'image', src: 'assets/image3.jpg' },
        { type: 'image', src: 'assets/image4.jpg' },
        { type: 'image', src: 'assets/image5.jpg' },
        { type: 'image', src: 'assets/image6.jpg' },
        { type: 'video', src: 'assets/video1.mp4' },
        { type: 'video', src: 'assets/video2.mp4' }
    ];

    // Insert each creation into the appropriate category
    creations.forEach(creation => {
        let element;
        if (creation.type === 'image') {
            element = document.createElement('img');
            element.src = creation.src;
            element.alt = "Gallery Image"; // Alt text for accessibility
            element.classList.add('gallery-content-item');
            imageCategory.appendChild(element);
        } else if (creation.type === 'video') {
            element = document.createElement('video');
            element.src = creation.src;
            element.controls = true;
            element.classList.add('gallery-content-item');
            videoCategory.appendChild(element);
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Tab switching logic
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tab).classList.add('active');
        });
    });

    // Set default active tab
    tabButtons[0].classList.add('active');
    tabContents[0].classList.add('active');

    // Star rating logic
    starRating.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-star')) {
            selectedRating = e.target.getAttribute('data-rating');
            document.getElementById('rating').value = selectedRating;
            updateStarRating(selectedRating);
        }
    });

    function updateStarRating(rating) {
        const stars = starRating.querySelectorAll('.fa-star');
        stars.forEach(star => {
            star.classList.remove('active');
            if (star.getAttribute('data-rating') <= rating) {
                star.classList.add('active');
            }
        });
    }

    // Handle testimonial form submission
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const rating = document.getElementById('rating').value;
        const reason = document.getElementById('reason').value;

        if (name && rating && reason) {
            const testimonial = document.createElement('div');
            testimonial.classList.add('testimonial');
            testimonial.innerHTML = `
                <p><strong>${name}</strong> rated ${rating} star${rating > 1 ? 's' : ''}</p>
                <p>${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
                <p><em>Reason: ${reason}</em></p>
            `;

            testimonialList.appendChild(testimonial);

            // Clear the form
            testimonialForm.reset();
            updateStarRating(0); // Reset star rating
        }
    });

    // Background music control
    const backgroundMusic = document.getElementById('background-music');
    const playMusicButton = document.getElementById('play-music');
    const pauseMusicButton = document.getElementById('pause-music');
    const startMusicButton = document.getElementById('start-music');
    const musicModal = document.getElementById('music-modal');

    // Show modal on page load
    musicModal.style.display = 'flex';

    // Play background music when the user clicks "Start Music" button
    startMusicButton.addEventListener('click', function() {
        backgroundMusic.play();
        musicModal.style.display = 'none';
    });

    playMusicButton.addEventListener('click', function() {
        backgroundMusic.play();
    });

    pauseMusicButton.addEventListener('click', function() {
        backgroundMusic.pause();
    });

    // Set initial volume to a low level
    backgroundMusic.volume = 0.2;
});