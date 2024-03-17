function changeBackground() {
    var container = document.getElementById("projects-container");
    var scrollPosition = container.scrollTop;
    var backgroundColor;

    // Calculate the maximum scroll height
    var maxScrollHeight = container.scrollHeight - container.clientHeight;

    // Calculate how far from the bottom the user has scrolled
    var scrollFromBottom = maxScrollHeight - scrollPosition;

    // Change background color of the scrollable content based on scroll position
    if (scrollFromBottom < 100) {
        // When the user is near the bottom, change the background color to white
        backgroundColor = "white";
    } else {
        // Otherwise, keep the background color as gray
        backgroundColor = "gray"; // Example background color
    }

    container.style.backgroundColor = backgroundColor; // Change background color of the container
}