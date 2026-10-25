
const dateElement = document.getElementById("current-date");
const todayDateElement = document.getElementById("today-date");
const welcomeHeading = document.querySelector(".welcome h1");

const today = new Date();

const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
};

dateElement.textContent = today.toLocaleDateString("en-US", dateOptions);

if (todayDateElement) {
    todayDateElement.textContent = today.toLocaleDateString("en-US", dateOptions);
}

const screens = document.querySelectorAll(".app-screen");
const screenButtons = document.querySelectorAll("[data-screen]");
const bottomButtons = document.querySelectorAll(".bottom-nav-item");

function showScreen(screenName) {
    const selectedScreen = document.getElementById("screen-" + screenName);

    if (!selectedScreen) return;

    screens.forEach(function (screen) {
        const isSelected = screen === selectedScreen;

        screen.hidden = !isSelected;
        screen.classList.toggle("active", isSelected);
    });

    bottomButtons.forEach(function (button) {
        const isSelected = button.dataset.screen === screenName;

        button.classList.toggle("active", isSelected);

        if (isSelected) {
            button.setAttribute("aria-current", "page");
        } else {
            button.removeAttribute("aria-current");
        }
    });

    window.scrollTo(0, 0);
}

screenButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        showScreen(button.dataset.screen);
    });
});

function getTimeGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good morning";
    } else if (hour < 17) {
        return "Good afternoon";
    }

    return "Good evening";
}

function updateGreeting(name = "") {
    const greeting = getTimeGreeting();

    if (name) {
        welcomeHeading.textContent = `${greeting}, ${name}! 👋`;
    } else {
        welcomeHeading.textContent = `${greeting}! 👋`;
    }
}

updateGreeting();
showScreen("home");

const helpButton = document.getElementById("help-button");

helpButton.addEventListener("click", function () {
    alert("You can ask your caregiver for help. Please use your usual phone or messaging app to contact them.");
});

const taskCheckboxes = document.querySelectorAll(".task-checkbox");
const taskProgress = document.getElementById("task-progress");
const taskStorageKey = "myecho-task-status-v1";

function updateTaskProgress() {
    let completedTasks = 0;
    const savedTasks = [];

    taskCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            completedTasks++;
        }

        savedTasks.push(checkbox.checked);

        checkbox.closest(".task-item").classList.toggle(
            "completed",
            checkbox.checked
        );
    });

    taskProgress.textContent = `${completedTasks} of ${taskCheckboxes.length} tasks completed`;

    try {
        localStorage.setItem(taskStorageKey, JSON.stringify(savedTasks));
    } catch (error) {
        console.log("Tasks could not be saved in this browser.");
    }
}

try {
    const savedTasks = JSON.parse(localStorage.getItem(taskStorageKey) || "[]");

    if (Array.isArray(savedTasks)) {
        taskCheckboxes.forEach(function (checkbox, index) {
            checkbox.checked = savedTasks[index] === true;
        });
    }
} catch (error) {
    console.log("Saved tasks could not be loaded.");
}

taskCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateTaskProgress);
});

updateTaskProgress();

const memoryGameButton = document.getElementById("memory-game-button");
const wordGameButton = document.getElementById("word-game-button");
const memoryGame = document.getElementById("memory-game");
const wordGame = document.getElementById("word-game");
const memoryBoard = document.getElementById("memory-board");
const memoryStatus = document.getElementById("memory-status");
const restartGameButton = document.getElementById("restart-game");

let firstCard = null;
let secondCard = null;
let lockedBoard = false;
let matchedPairs = 0;

const memorySymbols = ["🌸", "🐱", "🌸", "🐱", "⭐", "⭐"];

function startMemoryGame() {
    firstCard = null;
    secondCard = null;
    lockedBoard = false;
    matchedPairs = 0;

    memoryBoard.innerHTML = "";
    memoryStatus.textContent = "Pairs found: 0 of 3";

    const shuffledSymbols = [...memorySymbols];

    for (let i = shuffledSymbols.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffledSymbols[i], shuffledSymbols[randomIndex]] =
            [shuffledSymbols[randomIndex], shuffledSymbols[i]];
    }

    shuffledSymbols.forEach(function (symbol, index) {
        const card = document.createElement("button");

        card.type = "button";
        card.className = "memory-card";
        card.textContent = "❔";
        card.setAttribute("aria-label", `Hidden card ${index + 1}`);

        card.addEventListener("click", function () {
            if (lockedBoard || card === firstCard || card.dataset.matched === "true") {
                return;
            }

            card.textContent = symbol;
            card.setAttribute("aria-label", symbol);

            if (firstCard === null) {
                firstCard = card;
                return;
            }

            secondCard = card;
            lockedBoard = true;

            if (firstCard.textContent === secondCard.textContent) {
                firstCard.dataset.matched = "true";
                secondCard.dataset.matched = "true";

                firstCard.disabled = true;
                secondCard.disabled = true;

                matchedPairs++;

                memoryStatus.textContent = `Pairs found: ${matchedPairs} of 3`;

                firstCard = null;
                secondCard = null;
                lockedBoard = false;

                if (matchedPairs === 3) {
                    memoryStatus.textContent = "Wonderful! You found every pair! 🎉";
                }
            } else {
                const oldFirst = firstCard;
                const oldSecond = secondCard;

                firstCard = null;
                secondCard = null;

                setTimeout(function () {
                    oldFirst.textContent = "❔";
                    oldSecond.textContent = "❔";

                    oldFirst.setAttribute("aria-label", "Hidden card");
                    oldSecond.setAttribute("aria-label", "Hidden card");

                    lockedBoard = false;
                }, 850);
            }
        });

        memoryBoard.appendChild(card);
    });
}

memoryGameButton.addEventListener("click", function () {
    memoryGame.hidden = false;
    wordGame.hidden = true;

    startMemoryGame();
});

restartGameButton.addEventListener("click", startMemoryGame);

wordGameButton.addEventListener("click", function () {
    wordGame.hidden = false;
    memoryGame.hidden = true;
});

document.querySelectorAll(".word-option").forEach(function (button) {
    button.addEventListener("click", function () {
        const wordStatus = document.getElementById("word-status");

        if (button.textContent.includes("Apple")) {
            wordStatus.textContent = "That's right! Apple is a fruit! 🎉";
        } else {
            wordStatus.textContent = "Good try! Can you find the fruit? 🍎";
        }
    });
});

const contactButtons = document.querySelectorAll(".contact-button");
const contactStatus = document.getElementById("contact-status");

contactButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const contactName = button.dataset.contact;

        contactStatus.textContent =
            `${contactName} is one of your favorite people. ` +
            "To call or message them, use your usual phone app.";
    });
});

const greetingNameInput = document.getElementById("greeting-name");
const saveSettingsButton = document.getElementById("save-settings");
const settingsStatus = document.getElementById("settings-status");
const greetingNameKey = "myecho-preferred-name";

try {
    const savedName = localStorage.getItem(greetingNameKey);

    if (savedName) {
        greetingNameInput.value = savedName;
        updateGreeting(savedName);
    }
} catch (error) {
    settingsStatus.textContent = "Saving is unavailable in this browser.";
}

saveSettingsButton.addEventListener("click", function () {
    const preferredName = greetingNameInput.value.trim();

    if (preferredName.length > 30) {
        settingsStatus.textContent = "Please use a name with 30 characters or fewer.";
        return;
    }

    try {
        if (preferredName) {
            localStorage.setItem(greetingNameKey, preferredName);
        } else {
            localStorage.removeItem(greetingNameKey);
        }

        updateGreeting(preferredName);

        settingsStatus.textContent = preferredName
            ? "Your greeting has been updated! 💙"
            : "Your greeting has been reset.";
    } catch (error) {
        settingsStatus.textContent = "The change could not be saved in this browser.";
    }
});

const smallerTextButton = document.getElementById("smaller-text");
const defaultTextButton = document.getElementById("default-text");
const largerTextButton = document.getElementById("larger-text");
const textSizeStatus = document.getElementById("text-size-status");

const textSizeStorageKey = "myecho-text-size-v1";
const defaultTextSize = 18;
const minimumTextSize = 16;
const maximumTextSize = 24;
const textSizeStep = 2;

let currentTextSize = defaultTextSize;

function applyTextSize(size) {
    currentTextSize = Math.max(
        minimumTextSize,
        Math.min(maximumTextSize, size)
    );

    document.documentElement.style.fontSize = `${currentTextSize}px`;

    textSizeStatus.textContent = currentTextSize === defaultTextSize
        ? "Standard text size"
        : `Text size: ${currentTextSize}px`;

    try {
        localStorage.setItem(textSizeStorageKey, String(currentTextSize));
    } catch (error) {
        console.log("Text size preference could not be saved.");
    }
}

smallerTextButton.addEventListener("click", function () {
    applyTextSize(currentTextSize - textSizeStep);
});

defaultTextButton.addEventListener("click", function () {
    applyTextSize(defaultTextSize);
});

largerTextButton.addEventListener("click", function () {
    applyTextSize(currentTextSize + textSizeStep);
});

try {
    const savedTextSize = Number(localStorage.getItem(textSizeStorageKey));

    if (
        Number.isFinite(savedTextSize) &&
        savedTextSize >= minimumTextSize &&
        savedTextSize <= maximumTextSize
    ) {
        applyTextSize(savedTextSize);
    } else {
        applyTextSize(defaultTextSize);
    }
} catch (error) {
    applyTextSize(defaultTextSize);
}

const readAloudButton = document.getElementById("read-aloud-button");
const stopReadingButton = document.getElementById("stop-reading-button");
const readingStatus = document.getElementById("reading-status");

readAloudButton.addEventListener("click", function () {
    if (!("speechSynthesis" in window)) {
        readingStatus.textContent = "Read aloud is not supported by this browser.";
        return;
    }

    window.speechSynthesis.cancel();

    const reminder =
        "Welcome to MyEcho. You can check your plans for today, " +
        "enjoy an activity, explore your memories, or find someone " +
        "you know and trust. Take your time. You can ask your caregiver for help.";

    const speech = new SpeechSynthesisUtterance(reminder);

    speech.lang = "en-US";
    speech.rate = 0.85;

    speech.onstart = function () {
        readingStatus.textContent = "Reading your reminder aloud…";
    };

    speech.onend = function () {
        readingStatus.textContent = "Reminder finished.";
    };

    speech.onerror = function () {
        readingStatus.textContent = "Speech could not play. Please try again.";
    };

    window.speechSynthesis.speak(speech);
});

stopReadingButton.addEventListener("click", function () {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    readingStatus.textContent = "Reading stopped.";
});

const familiarPlaceInput = document.getElementById("familiar-place");
const savePlaceButton = document.getElementById("save-place");
const placeStatus = document.getElementById("place-status");
const familiarPlaceKey = "myecho-familiar-place";

try {
    const savedPlace = localStorage.getItem(familiarPlaceKey);

    if (savedPlace) {
        familiarPlaceInput.value = savedPlace;
        placeStatus.textContent = `Your saved place: ${savedPlace}`;
    }
} catch (error) {
    placeStatus.textContent = "Saving is unavailable in this browser.";
}

savePlaceButton.addEventListener("click", function () {
    const place = familiarPlaceInput.value.trim();

    if (!place) {
        placeStatus.textContent = "Please enter a familiar place first.";
        return;
    }

    try {
        localStorage.setItem(familiarPlaceKey, place);
        placeStatus.textContent = `Your saved place: ${place} 💙`;
    } catch (error) {
        placeStatus.textContent = "We couldn't save your place. Please try again.";
    }
});
