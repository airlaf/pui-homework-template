const timelineWrapper = document.querySelector('.timeline-wrapper');
const timeline = document.querySelector('.timeline');
const gradientOverlay = document.getElementById('gradient-overlay');

// Handle timeline item toggle
const timelines = document.querySelectorAll('.timeline li .data');
for (const time of timelines) {
    time.onclick = () => {
        time.classList.toggle('show');

        // Hide the image if the pop-up is shown
        const parentNode = time.closest('li');
        const img = parentNode.querySelector('.popup-image');
        if (img) {
            img.style.display = time.classList.contains('show') ? 'none' : 'block';
        }
    };
}

// Update timeline position and color based on mouse movement
timelineWrapper.addEventListener('mousemove', (event) => {
    const rect = timelineWrapper.getBoundingClientRect();
    const mouseX = event.clientX - rect.left; // Mouse position relative to the wrapper
    const percentage = (mouseX / timelineWrapper.clientWidth) * 100; // Calculate percentage of width

    // Move the timeline
    let scrollWidth = (mouseX / timelineWrapper.clientWidth) * (timelineWrapper.clientWidth - timeline.clientWidth);
    timeline.style.left = scrollWidth.toFixed(1) + 'px';

    // Update the gradient background
    timeline.style.background = `linear-gradient(to right, #4000ff ${percentage}%, #888 ${percentage}%)`;
});

// Reset the timeline background on mouse leave
timelineWrapper.addEventListener('mouseleave', () => {
    timeline.style.background = '#888';
});

// Update gradient overlay based on mouse position
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    gradientOverlay.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(64, 0, 255, 0.2), transparent 50%)`;
});

// Handle image display on hover
document.querySelectorAll('.timeline li').forEach((node) => {
    const img = node.querySelector('.popup-image');
    if (img) {
        node.addEventListener('mouseover', () => {
            // Only show the image if the pop-up is not displayed
            const popup = node.querySelector('.data');
            if (!popup.classList.contains('show')) {
                img.style.position = 'absolute';

                // Example position logic; adjust as needed
                img.style.bottom = '65px';
                img.style.left = '85px';

                img.style.display = 'block';
            }
        });

        node.addEventListener('mouseout', () => {
            img.style.display = 'none';
        });
    }
});

