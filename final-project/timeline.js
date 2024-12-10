//gradient effect for the mouse-following background
const gradientOverlay = document.getElementById('gradient-overlay');

if (gradientOverlay) {
    document.addEventListener('mousemove', (event) => {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        gradientOverlay.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(64, 0, 255, 0.2), transparent 50%)`;
    });
}

//timeline-specific functionality (only runs if timeline exists on the page)
const timelineWrapper = document.querySelector('.timeline-wrapper');
const timeline = document.querySelector('.timeline');
const timelineNodes = Array.from(document.querySelectorAll('.timeline li'));
let activeIndex = 0; //start at the first node

if (timelineWrapper && timeline) {
    //initialize accessibility attributes
    timelineNodes.forEach((node, index) => {
        const popup = node.querySelector('.data');
        node.setAttribute('role', 'button');
        node.setAttribute('tabindex', '0');
        node.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
        popup.setAttribute('aria-hidden', 'true');
    });

    //handle timeline item toggle on mouse click
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

    //update timeline position and color based on mouse movement
    timelineWrapper.addEventListener('mousemove', (event) => {
        const rect = timelineWrapper.getBoundingClientRect();
        const mouseX = event.clientX - rect.left; //position relative to the wrapper
        const percentage = (mouseX / timelineWrapper.clientWidth) * 100; //calculate percentage of width

        //move the timeline
        const scrollWidth =
            (mouseX / timelineWrapper.clientWidth) *
            (timelineWrapper.clientWidth - timeline.clientWidth);
        timeline.style.left = `${scrollWidth.toFixed(1)}px`;

        //update gradient background
        updateProgressLine(mouseX);
    });

    //reset the timeline background on mouse leave
    timelineWrapper.addEventListener('mouseleave', () => {
        timeline.style.background = '#888';
    });
}

//image display on hover
if (timelineNodes.length > 0) {
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
}

//add keyboard navigation
document.addEventListener('keydown', (event) => {
    if (timelineNodes.length > 0) {
        if (event.key === 'ArrowRight') {
            //move to the next node
            activeIndex = (activeIndex + 1) % timelineNodes.length;
            updateFocus();
        } else if (event.key === 'ArrowLeft') {
            //move to the previous node
            activeIndex = (activeIndex - 1 + timelineNodes.length) % timelineNodes.length;
            updateFocus();
        } else if (event.key === ' ') {
            //simulate click with space key
            togglePopup();
            event.preventDefault(); //prevent page scrolling
        }
    }
});

//update focus to simulate hover
function updateFocus() {
    timelineNodes.forEach((node, index) => {
        const popup = node.querySelector('.data');
        const title = node.querySelector('.title');
        const img = node.querySelector('.popup-image');

        if (index === activeIndex) {
            node.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            title.style.opacity = '1'; //simulate hover title visibility
            node.setAttribute('aria-selected', 'true');

            //show image and expand the node
            if (img && !popup.classList.contains('show')) {
                showImage(img);
                expandNode(node);
            }

            //update progress line
            const nodeRect = node.getBoundingClientRect();
            const timelineRect = timelineWrapper.getBoundingClientRect();
            const positionX = nodeRect.left - timelineRect.left + nodeRect.width / 2;
            updateProgressLine(positionX);
        } else {
            title.style.opacity = '0'; //hide titles of non-hovered nodes
            node.setAttribute('aria-selected', 'false');

            //hide the image and reset the node
            if (img) {
                hideImage(img);
                resetNode(node);
            }

            //ensure no pop-ups are visible during navigation
            popup.classList.remove('show');
        }
    });
}

//toggle the pop-up for the active node
function togglePopup() {
    const activeNode = timelineNodes[activeIndex];
    const popup = activeNode.querySelector('.data');
    const img = activeNode.querySelector('.popup-image');
    const isPopupVisible = popup.classList.contains('show');

    popup.classList.toggle('show');
    popup.setAttribute('aria-hidden', isPopupVisible ? 'true' : 'false');

    //manage image visibility based on pop-up state
    if (img) {
        img.style.display = isPopupVisible ? 'block' : 'none';
    }
}

//update progress line color
function updateProgressLine(positionX) {
    const rect = timelineWrapper.getBoundingClientRect();
    const percentage = ((positionX - rect.left) / timelineWrapper.clientWidth) * 100; //calculate percentage of width
    timeline.style.background = `linear-gradient(to right, #4000ff ${percentage}%, #888 ${percentage}%)`;
}

//helper functions to manage node states
function expandNode(node) {
    node.style.transform = 'scale(1.3)';
    node.querySelector('.data').style.backgroundColor = 'var(--primary-color)';
}

function resetNode(node) {
    node.style.transform = 'scale(1)';
    node.querySelector('.data').style.backgroundColor = '#888';
}

//helper functions to manage image display
function showImage(img) {
    img.style.position = 'absolute';
    img.style.bottom = '65px';
    img.style.left = '85px';
    img.style.display = 'block';
}

function hideImage(img) {
    img.style.display = 'none';
}
