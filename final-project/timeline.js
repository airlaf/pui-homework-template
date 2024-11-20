const timelineWrapper = document.querySelector('.timeline-wrapper');
const timeline = document.querySelector('.timeline');

// Handle timeline item toggle
const timelines = document.querySelectorAll('.timeline li .data');
for (const time of timelines) {
    time.onclick = () => time.classList.toggle('show');
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
