function toggleDetails(detailsId) {
    let detailsRow = document.getElementById(detailsId);
    let projectRow = detailsRow.previousElementSibling; // Get the row above the details

    if (detailsRow.style.display === "table-row") {
        detailsRow.style.display = "none";
        projectRow.classList.remove("active"); // Remove active class
    } else {
        // Hide all open details before opening a new one
        document.querySelectorAll(".project-details").forEach(row => {
            row.style.display = "none";
            row.previousElementSibling.classList.remove("active");
        });

        detailsRow.style.display = "table-row";
        projectRow.classList.add("active");
    }
}

// Tab Switching Function
function showTab(tabName) {
    let currentTable = document.querySelector('.tab-content.active');
    let newTable = document.getElementById(tabName);
    let allButtons = document.querySelectorAll('.tab-button');

    allButtons.forEach(button => button.classList.remove('active'));

    // Fade out old content
    if (currentTable) {
        currentTable.classList.add('fade-out');

        setTimeout(() => {
            currentTable.classList.remove('active', 'fade-out');
            newTable.classList.add('active', 'fade-in');

            setTimeout(() => {
                newTable.classList.remove('fade-in');
            }, 500);
        }, 300);
    } else {
        newTable.classList.add('active', 'fade-in');

        setTimeout(() => {
            newTable.classList.remove('fade-in');
        }, 500);
    }

    event.currentTarget.classList.add('active');
}
