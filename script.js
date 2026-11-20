
// CAMPUSCONNECT - JAVASCRIPT

// Load saved information
let assignments = JSON.parse(
    localStorage.getItem("campusAssignments")
) || [];

let studySessions = JSON.parse(
    localStorage.getItem("campusStudies")
) || [];

// Get HTML elements
const assignmentForm = document.getElementById("assignmentForm");
const assignmentList = document.getElementById("assignmentList");

const studyForm = document.getElementById("studyForm");
const studyList = document.getElementById("studyList");

// Save information
function saveData() {
    localStorage.setItem(
        "campusAssignments",
        JSON.stringify(assignments)
    );

    localStorage.setItem(
        "campusStudies",
        JSON.stringify(studySessions)
    );
}

// Display assignments
function displayAssignments() {
    assignmentList.innerHTML = "";

    if (assignments.length === 0) {
        assignmentList.innerHTML = "<p>No assignments added yet.</p>";
    }

    assignments.forEach((assignment, index) => {
        const item = document.createElement("div");
        item.className = "list-item";

        const details = document.createElement("span");
        details.textContent =
            assignment.title + " - Due: " + assignment.date;

        if (assignment.completed) {
            details.style.textDecoration = "line-through";
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent =
            assignment.completed ? "Completed" : "Complete";

        completeBtn.onclick = function () {
            assignments[index].completed =
                !assignments[index].completed;

            saveData();
            displayAssignments();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.background = "#dc2626";

        deleteBtn.onclick = function () {
            assignments.splice(index, 1);
            saveData();
            displayAssignments();
        };

        item.append(details, completeBtn, deleteBtn);
        assignmentList.appendChild(item);
    });

    updateStatistics();
}

// Add assignment
assignmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("assignmentTitle").value;
    const date = document.getElementById("assignmentDate").value;

    assignments.push({
        title: title,
        date: date,
        completed: false
    });

    saveData();
    displayAssignments();

    assignmentForm.reset();
});

// Display study sessions
function displayStudies() {
    studyList.innerHTML = "";

    if (studySessions.length === 0) {
        studyList.innerHTML = "<p>No study sessions added yet.</p>";
    }

    studySessions.forEach((session, index) => {
        const item = document.createElement("div");
        item.className = "list-item";

        const details = document.createElement("span");
        details.textContent =
            session.subject + " - " + session.time;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.background = "#dc2626";

        deleteBtn.onclick = function () {
            studySessions.splice(index, 1);
            saveData();
            displayStudies();
        };

        item.append(details, deleteBtn);
        studyList.appendChild(item);
    });
}

// Add study session
studyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const subject = document.getElementById("studySubject").value;
    const time = document.getElementById("studyTime").value;

    studySessions.push({
        subject: subject,
        time: time
    });

    saveData();
    displayStudies();

    studyForm.reset();
});

// Update statistics
function updateStatistics() {
    const total = assignments.length;

    const completed = assignments.filter(
        assignment => assignment.completed
    ).length;

    const pending = total - completed;

    document.getElementById("totalAssignments").textContent = total;

    document.getElementById("completedAssignments").textContent =
        completed;

    document.getElementById("pendingAssignments").textContent =
        pending;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("progressFill").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "% completed";
}

// Log out button
document.getElementById("logoutBtn").addEventListener(
    "click",
    function () {
        alert("You have exited the CampusConnect dashboard.");
    }
);

// Load saved information when page opens
displayAssignments();
displayStudies();
