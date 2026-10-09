const page = document.documentElement;

document.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") {
        return;
    }

    page.style.setProperty("--cursor-x", `${event.clientX}px`);
    page.style.setProperty("--cursor-y", `${event.clientY}px`);
    page.style.setProperty("--cursor-light-opacity", "1");
});

document.addEventListener("pointerleave", () => {
    page.style.setProperty("--cursor-light-opacity", "0");
});

let scrollAnimationFrame;

function scrollToPosition(targetY) {
    if (scrollAnimationFrame) {
        cancelAnimationFrame(scrollAnimationFrame);
    }

    const startY = window.scrollY;
    const startTime = performance.now();
    const duration = 300;

    function animateScroll(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = progress < 0.5
            ? 4 * progress ** 3
            : 1 - (-2 * progress + 2) ** 3 / 2;

        window.scrollTo(0, startY + (targetY - startY) * easedProgress);

        if (progress < 1) {
            scrollAnimationFrame = requestAnimationFrame(animateScroll);
        } else {
            scrollAnimationFrame = undefined;
        }
    }

    scrollAnimationFrame = requestAnimationFrame(animateScroll);
}

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
        const section = document.getElementById(button.dataset.scrollTarget);
        const topOffset = section.id === "about" ? 280 : 0;
        const targetY = section.getBoundingClientRect().top + window.scrollY - topOffset;
        scrollToPosition(targetY);
    });
});

const backToTopButton = document.querySelector(".back-to-top");

function updateBackToTopVisibility() {
    const isAtBottom = window.scrollY + window.innerHeight >= page.scrollHeight - 1;
    backToTopButton.classList.toggle("is-visible", isAtBottom);
}

window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
window.addEventListener("resize", updateBackToTopVisibility);
updateBackToTopVisibility();

backToTopButton.addEventListener("click", () => {
    scrollToPosition(0);
});