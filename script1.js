
function subscribe() {
  // Get the email input value
  var email = document.getElementById("email").value;
  // Check if the email is valid
  if (validateEmail(email)) {
    // Check if there are already subscribed emails in localStorage
    if (localStorage.getItem("subscribedEmails")) {
      // Get the subscribed emails array from localStorage
      var subscribedEmails = JSON.parse(localStorage.getItem("subscribedEmails"));
      // Check if the email is already in the subscribed emails array
      if (subscribedEmails.includes(email)) {
        // Display message if the email is already subscribed
        document.getElementById("message").innerHTML = "You have already subscribed to our newsletter!";
      } else {
        // Add the email to the subscribed emails array and update localStorage
        subscribedEmails.push(email);
        localStorage.setItem("subscribedEmails", JSON.stringify(subscribedEmails));
        // Display message if the email is successfully subscribed
        document.getElementById("message").innerHTML = "Thank you for subscribing to our newsletter!";
      }
    } else {
      // If there are no subscribed emails in localStorage, create a new array with the email and store it in localStorage
      var subscribedEmails = [email];
      localStorage.setItem("subscribedEmails", JSON.stringify(subscribedEmails));
      // Display message if the email is successfully subscribed
      document.getElementById("message").innerHTML = "Thank you for subscribing to our newsletter!";
    }
  } else {
    // Display message if the email is invalid
    document.getElementById("message").innerHTML = "Invalid email address!";
  }
}

function validateEmail(email) {
  // Regular expression to check if the email format is valid
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}