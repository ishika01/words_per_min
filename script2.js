// function to display subscribed email ids
function displayEmails() {
    const emailList = document.getElementById("email-list");
    const emails =
        JSON.parse(localStorage.getItem("subscribedEmails")) || [];
    if (emails.length === 0) {
        emailList.innerHTML = "<tr><td>No subscriptions found</td></tr>";
    } else {
        emailList.innerHTML = emails
            .map((email) => `<tr><td>${email}</td></tr>`)
            .join("");
    }
}

