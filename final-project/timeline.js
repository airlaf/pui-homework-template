const timelineWrapper = document.querySelector('.timeline-wrapper');
const timeline = document.querySelector('.timeline');
const gradientOverlay = document.getElementById('gradient-overlay');
const timelineNodes = Array.from(document.querySelectorAll('.timeline li'));
let activeIndex = 0; // Start at the first node

// Initialize accessibility attributes
timelineNodes.forEach((node, index) => {
    const popup = node.querySelector('.data');
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
    popup.setAttribute('aria-hidden', 'true');
});

// Handle timeline item toggle on mouse click
timelineNodes.forEach((node) => {
    const popup = node.querySelector('.data');
    const img = node.querySelector('.popup-image');

    node.addEventListener('click', () => {
        popup.classList.toggle('show');
        popup.setAttribute('aria-hidden', !popup.classList.contains('show'));
        if (img) {
            img.style.display = popup.classList.contains('show') ? 'none' : 'block';
        }
    });
});

// Update timeline position and color based on mouse movement
timelineWrapper.addEventListener('mousemove', (event) => {
    const rect = timelineWrapper.getBoundingClientRect();
    const mouseX = event.clientX - rect.left; // Position relative to the wrapper
    const percentage = (mouseX / timelineWrapper.clientWidth) * 100; // Calculate percentage of width

    // Move the timeline
    const scrollWidth = mouseX / timelineWrapper.clientWidth * (timelineWrapper.clientWidth - timeline.clientWidth);
    timeline.style.left = `${scrollWidth.toFixed(1)}px`;

    // Update the gradient background
    updateProgressLine(mouseX);
});

// Reset the timeline background on mouse leave
timelineWrapper.addEventListener('mouseleave', () => {
    timeline.style.background = '#888';
});

// Update gradient overlay based on mouse position
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    gradientOverlay.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(64, 0, 255, 0.2), transparent 50%)`;
});

// Handle image display on hover
timelineNodes.forEach((node) => {
    const img = node.querySelector('.popup-image');
    if (img) {
        node.addEventListener('mouseover', () => {
            const popup = node.querySelector('.data');
            if (!popup.classList.contains('show')) {
                showImage(img);
                expandNode(node);
            }
        });

        node.addEventListener('mouseout', () => {
            hideImage(img);
            resetNode(node);
        });
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        // Move to the next node
        activeIndex = (activeIndex + 1) % timelineNodes.length;
        updateFocus();
    } else if (event.key === 'ArrowLeft') {
        // Move to the previous node
        activeIndex = (activeIndex - 1 + timelineNodes.length) % timelineNodes.length;
        updateFocus();
    } else if (event.key === ' ') {
        // Simulate click with the Space key
        togglePopup();
        event.preventDefault(); // Prevent page scrolling
    }
});

// Update focus to simulate hover
function updateFocus() {
    timelineNodes.forEach((node, index) => {
        const popup = node.querySelector('.data');
        const title = node.querySelector('.title');
        const img = node.querySelector('.popup-image');

        if (index === activeIndex) {
            node.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            title.style.opacity = '1'; // Simulate hover title visibility
            node.setAttribute('aria-selected', 'true');

            // Show the image and expand the node
            if (img && !popup.classList.contains('show')) {
                showImage(img);
                expandNode(node);
            }

            // Update the progress line
            const nodeRect = node.getBoundingClientRect();
            const timelineRect = timelineWrapper.getBoundingClientRect();
            const positionX = nodeRect.left - timelineRect.left + nodeRect.width / 2;
            updateProgressLine(positionX);
        } else {
            title.style.opacity = '0'; // Hide titles of non-hovered nodes
            node.setAttribute('aria-selected', 'false');

            // Hide the image and reset the node
            if (img) {
                hideImage(img);
                resetNode(node);
            }

            // Ensure no pop-ups are visible during navigation
            popup.classList.remove('show');
        }
    });
}

// Toggle the pop-up for the active node
function togglePopup() {
    const activeNode = timelineNodes[activeIndex];
    const popup = activeNode.querySelector('.data');
    const img = activeNode.querySelector('.popup-image');
    const isPopupVisible = popup.classList.contains('show');

    popup.classList.toggle('show');
    popup.setAttribute('aria-hidden', isPopupVisible ? 'true' : 'false');

    // Manage image visibility based on pop-up state
    if (img) {
        img.style.display = isPopupVisible ? 'block' : 'none';
    }
}

// Update the progress line color
function updateProgressLine(positionX) {
    const rect = timelineWrapper.getBoundingClientRect();
    const percentage = ((positionX - rect.left) / timelineWrapper.clientWidth) * 100; // Calculate percentage of width
    timeline.style.background = `linear-gradient(to right, #4000ff ${percentage}%, #888 ${percentage}%)`;
}

// Helper functions to manage node states
function expandNode(node) {
    node.style.transform = 'scale(1.3)';
    node.querySelector('.data').style.backgroundColor = 'var(--primary-color)';
}

function resetNode(node) {
    node.style.transform = 'scale(1)';
    node.querySelector('.data').style.backgroundColor = '#888';
}

// Helper functions to manage image display
function showImage(img) {
    img.style.position = 'absolute';
    img.style.bottom = '65px';
    img.style.left = '85px';
    img.style.display = 'block';
}

function hideImage(img) {
    img.style.display = 'none';
}
