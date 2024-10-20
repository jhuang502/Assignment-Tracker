var assignments = [];
function addEvent() {
    // values from the input fields
    var eventName = document.getElementById("event").value;
    var eventDate = document.getElementById("date").value;
    var eventTime = document.getElementById("time").value;

    // check if not blank
    if (eventName === "" || eventDate === "" || eventTime === "") {
        alert("Please fill in all fields.");
        return;  // Exit the function if any fields are empty
    }

    // make new div to hold the event details
    var eventDiv = document.createElement("div");
    eventDiv.className = "event-item"; //add class to make box

    // add the info as text content inside the new div
    eventDiv.innerHTML = `<strong>Assignment:</strong> ${eventName}<br> 
                          <strong>Date:</strong> ${eventDate} <br>
                          <strong>Time:</strong> ${eventTime} <br>
                          <select class="completion" id="completion" onchange="changeStatus(this)">
                              <option value="none">--------</option>    
                              <option value="notStarted">Not Started</option>
                              <option value="inProgress">In Progress</option>
                              <option value="completed">Completed</option>
                          </select>
                          <button class="delete-btn" onclick="deleteEvent(this)">
                              <i class="fas fa-trash"></i>
                          </button><br>`;

    // change the new event div to the 'center' div where the schedule is displayed
    document.getElementById("schedule").appendChild(eventDiv);
    
    assignments.push({
        name: eventName,
        date: eventDate,
        time: eventTime,
        element: eventDiv
    });
    sortAssignments();
    noAssignments();


    // clear the input fields after the assignment is added
    document.getElementById("event").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
}

function changeStatus(selectElement) {
    // Get the selected value
    var status = selectElement.value;
    // Change the background color of the select
    if (status === "notStarted") {
        selectElement.style.backgroundColor = "rgba(255, 99, 99, 0.486)";
    } else if (status === "inProgress") {
        selectElement.style.backgroundColor = "rgba(255, 237, 99, 0.486)";
    } else if (status === "completed") {
        selectElement.style.backgroundColor = "rgba(146, 255, 99, 0.486)";
        launchConfetti();
    } else if (status === "none") {
        selectElement.style.backgroundColor = "#ffffff";
    }
    
}

function deleteEvent(button) {
    var assignmentDiv = button.parentElement;
    assignments = assignments.filter(function(assignment) {
        return assignment.element !== assignmentDiv;
    });
    // Remove the assignment
    button.parentElement.remove();
    sortAssignments();
    noAssignments();

}

function launchConfetti() {
    // Launches conffetti when uses completes and assignment
    confetti({
        particleCount: 100, 
        spread: 70,
        origin: { y: 0.6 },
    });
}


function noAssignments() {
    // Shows "No Assignments" if there are no assignments present
    var schedule = document.getElementById("schedule");
    var noAssignmentMessage = document.getElementById("no-assignments");

    if (schedule.childElementCount === 0) {
        noAssignmentMessage.style.display = "block";
    } else {
        noAssignmentMessage.style.display = "none";
    }
}
function sortAssignments() {
    // Sort the assignments array by date and time
    assignments.sort(function(a, b) {
        var dateA = new Date(a.date + " " + a.time);
        var dateB = new Date(b.date + " " + b.time);
        return dateA - dateB;  // Compare the two dates
    });

    // Clear the current schedule
    var scheduleDiv = document.getElementById("schedule");
    scheduleDiv.innerHTML = "";

    // Append the sorted assignments back to the schedule div
    assignments.forEach(function(assignment) {
        scheduleDiv.appendChild(assignment.element);
    });

    noAssignments();  // Check if there are no assignments and show/hide the "No Assignments" message
}
