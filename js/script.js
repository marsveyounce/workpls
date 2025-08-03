document.addEventListener("DOMContentLoaded", function () {
    // COMIC PAGE NAVIGATION
    const comicContainer = document.querySelector('.comic-container');
    const comicPageNavigation = document.querySelector('navigation');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('page-indicator');
    const toggleViewButton = document.getElementById('toggleView');
    const comicPages = document.querySelectorAll('.comic-page');

    let currentPage = 0;
    let viewAllMode = false;
    const totalPages = isLandscape() ? comicPages.length - 1 : comicPages.length;

    const jumpToInput = document.getElementById('jumpToInput');
    const jumpToButton = document.getElementById('jumpToButton');


    function isLandscape() {
        return window.innerWidth > window.innerHeight;
    }

    function updateComicPosition() {
        if (viewAllMode) {
            pageIndicator.style.display = "none";
        } else {
            pageIndicator.style.display = "block";
            comicContainer.style.transform = isLandscape()
                ? `translateX(-${currentPage * 50}%)`
                : `translateX(-${currentPage * 100}%)`;
            updatePageIndicator();
        }
    }

    function updatePageIndicator() {
        pageIndicator.textContent = `${currentPage + 1} / ${totalPages}`;
    }

    prevPageButton.addEventListener('click', () => {
        if (!viewAllMode && currentPage > 0) {
            currentPage--;
            updateComicPosition();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (!viewAllMode && currentPage < totalPages - 1) {
            currentPage++;
            updateComicPosition();
        }
    });

    toggleViewButton.addEventListener("click", () => {
        viewAllMode = !viewAllMode;

        if (viewAllMode) {
            comicContainer.classList.add("all-pages-view");
            toggleViewButton.textContent = "View Per Page";
            pageIndicator.style.display = "none";
            prevPageButton.style.display = "none";
            nextPageButton.style.display = "none";
        } else {
            comicContainer.classList.remove("all-pages-view");
            toggleViewButton.textContent = "View All";
            pageIndicator.style.display = "block";
            prevPageButton.style.display = "block";
            nextPageButton.style.display = "block";
            updateComicPosition();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (viewAllMode) return;

        switch (event.key) {
            case "ArrowLeft":
                if (currentPage > 0) {
                    event.preventDefault();
                    currentPage--;
                    updateComicPosition();
                }
                break;
            case "ArrowRight":
                if (currentPage < totalPages - 1) {
                    event.preventDefault();
                    currentPage++;
                    updateComicPosition();
                }
        }
    })

    jumpToButton.addEventListener('click', () => {
        if (viewAllMode) return;

        const targetPage = parseInt(jumpToInput.value, 10) - 1;

        if (!isNaN(targetPage) && targetPage >= 0 && targetPage < totalPages) {
            currentPage = targetPage;
            updateComicPosition();
        } else {
            alert(`Enter a number between 1 and ${totalPages}`);
        }

        jumpToInput.value = '';
    });

    jumpToInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            jumpToButton.click();
        }
    });

    updatePageIndicator();
});