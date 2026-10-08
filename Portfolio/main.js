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