//Random Quotes Api URL
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;


const renderNewQuote = async () => {
    // Clear the previous quote section contents and reset mistakes count
    quoteSection.innerHTML = "";
    mistakes = 0;

    //Fetch contents from url
    const response = await fetch(quoteApiUrl);

    //Store response
    let data = await response.json();

    //Access quote
    quote = data.content;

    //Array of characters in the quote
    let arr = quote.split("").map((value) => {
        //wrap the characters in a span tag
        return "<span class='quote-chars'>" + value + "</span>";
    });
    //join array for displaying
    quoteSection.innerHTML += arr.join("");

    // Clear the classes "success" and "fail" from the span elements
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars.forEach((char) => {
        char.classList.remove("success", "fail");
    });
};


//Logic for comparing input words with quote
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    //Create an arrat from received span tags
    quoteChars = Array.from(quoteChars);

    //array of user input characters
    let userInputChars = userInput.value.split("");

    //loop through each character in quote
    quoteChars.forEach((char, index) => {
        //Check if char(quote character) = userInputChars[index](input character)
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
        }
        //If user hasn't entered anything or backspaced
        else if (userInputChars[index] == null) {
            //Remove class if any
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }
        //If user enter wrong character
        else {
            //Checks if we alreasy have added fail class
            if (!char.classList.contains("fail")) {
                //increment and display mistakes
                mistakes += 1;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }
        //Returns true if all the characters are entered correctly
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });
        //End test if all characters are correct
        if (check) {
            displayResult();
        }
    });
});

//Update Timer on screen
function updateTimer() {
    if (time == 0) {
        //End test if timer reaches 0
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}

//Sets timer
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

const saveResults = (wpm, accuracy) => {
    const results = JSON.parse(localStorage.getItem('typing-test-results')) || [];
    const newResult = {
        date: new Date().toLocaleString(),
        wpm,
        accuracy,
    };
    results.push(newResult);
    localStorage.setItem('typing-test-results', JSON.stringify(results));
};

//End Test
const displayResult = () => {
    //display result div
    document.querySelector(".result").style.display = "block";
    document.getElementById("restart-test").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText =
        (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
    document.getElementById("accuracy").innerText =
        Math.round(
            ((userInput.value.length - mistakes) / userInput.value.length) * 100
        ) + " %";
    const wpm = (userInput.value.length / 5 / timeTaken).toFixed(2);
    const accuracy = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100);
    saveResults(wpm, accuracy);
};

//Start Test
const startTest = () => {
    renderNewQuote();
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};

const restartTest = () => {
    mistakes = 0;
    clearInterval(timer);
    userInput.value = "";
    document.querySelector(".result").style.display = "none";
    // renderNewQuote();
    //timeReduce();
    userInput.disabled = false;
    document.getElementById("stop-test").style.display = "block";
    document.getElementById("restart-test").style.display = "none";
    document.getElementById("mistakes").innerText = "0"; // reset mistake count
    startTest(); // call startTest function
};

const loadResults = () => {
    const results = JSON.parse(localStorage.getItem('typing-test-results')) || [];

    // Create a new HTML document
    const resultPage = document.implementation.createHTMLDocument('Results');

    // Add a title to the page
    const title = resultPage.createElement('title');
    title.textContent = 'Typing Test Results';
    resultPage.head.appendChild(title);

    // Add the results to the page
    const resultList = resultPage.createElement('ul');
    results.forEach(result => {
        const li = resultPage.createElement('li');
        li.textContent = `${result.date} - WPM: ${result.wpm}, Accuracy: ${result.accuracy}%`;
        resultList.appendChild(li);
    });
    resultPage.body.appendChild(resultList);

    // Open the results in a new window
    const resultWindow = window.open();
    resultWindow.document.write("TEST RESULTS :");
    resultWindow.document.write(resultPage.documentElement.outerHTML);
}




window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    document.getElementById("restart-test").style.display = "none";
    userInput.disabled = true;
    // renderNewQuote();
};