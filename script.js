document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu a');
    const contentSections = document.querySelectorAll('.content section');
    const modal = document.getElementById('modal');
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    const cvDownloadLink = document.getElementById('cv-download-link');
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmDownloadButton = document.getElementById('confirm-download');
    const cancelDownloadButton = document.getElementById('cancel-download');
    const loadingScreen = document.getElementById('loading-screen');
    const nameAnimation = document.querySelector('.name-animation');

    // Ensure the loading screen stays for at least the duration of the animation
    const minLoadingTime = 6000; // 6 seconds to match the CSS animation duration
    const startTime = Date.now();

    window.onload = () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - elapsedTime;

        setTimeout(() => {
            // Listen for the end of the name animation
            nameAnimation.addEventListener('animationend', (event) => {
                if (event.animationName === 'flyOut') {
                    setTimeout(() => { // Add delay before fading out the loading screen
                        loadingScreen.classList.add('hidden');
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 500); // Ensure this timeout is longer than the transition duration
                    }, 500); // Delay before starting the fade-out transition
                }
            });
        }, Math.max(remainingTime, 0));
    };

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            closeModal(() => {
                contentSections.forEach(section => {
                    if (section.id === targetId) {
                        section.classList.remove('hide');
                        section.classList.add('show');
                    } else {
                        section.classList.remove('show');
                        section.classList.add('hide');
                    }
                });
                showModal(); // Show the modal with animation
            });
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close menu when clicking outside of it
    window.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Show confirmation modal when clicking on the CV image
    cvDownloadLink.addEventListener('click', (e) => {
        e.preventDefault();
        confirmationModal.style.display = 'flex';
        console.log('Confirmation modal shown on CV click');
    });

    // Handle confirmation modal buttons
    confirmDownloadButton.addEventListener('click', () => {
        const tempLink = document.createElement('a');
        tempLink.href = cvDownloadLink.href;
        tempLink.download = cvDownloadLink.getAttribute('download');
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        confirmationModal.style.display = 'none';
        console.log('CV downloaded and confirmation modal hidden');
    });

    cancelDownloadButton.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
        console.log('Confirmation modal hidden on cancel');
    });
});

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
}

function showModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('hide');
    modal.classList.add('show');
    modal.style.display = 'block'; // Ensure the modal is displayed
    closeMenu(); // Close the menu when opening a modal
}

function closeModal(callback) {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    modal.classList.add('hide');
    setTimeout(() => {
        modal.style.display = 'none';
        if (callback) callback(); // Execute callback after modal is hidden
    }, 500); // Match the duration of the fade-out animation
}

function closeMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.remove('open');
}