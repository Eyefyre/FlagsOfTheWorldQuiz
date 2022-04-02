var jsonFlags = null;
var quizSet = [];
var answers = [];
var usedFlags = [];

function startQuiz() {
    quizSet = [];
    answers = [];
    usedFlags = [];
    var noOfQuestions = 2;
    pickQuestionsForQuiz(noOfQuestions);
    for (var i = 0; i < noOfQuestions; i++) {
        appendQuizQuestion(quizSet[i].name, i + 1)
    }
}

function pickQuestionsForQuiz(noOfQuestions) {
    for (var i = 0; i < noOfQuestions; i++) {
        isUsed = false;
        do {
            var flag = jsonFlags[Math.floor(Math.random() * jsonFlags.length)];
            if (usedFlags.includes(flag)) {
                isUsed = true;
            }
            else {
                quizSet.push(flag);
                usedFlags.push(flag);
                isUsed = false;
            }
        } while (isUsed);
    }
    console.log(quizSet);
}

async function loadJSONData() {
    const jsonData = await fetch("json_data.json");
    jsonFlags = await jsonData.json();
    startPageRandomFlag();
}

function startPageRandomFlag() {
    $("#starticon").attr("src", "./FlagData/" + jsonFlags[Math.floor(Math.random() * jsonFlags.length)].name + ".png");
}

$(document).ready(function () {
    $("#startQuizButton").click(function () {
        $(".startBlock").fadeOut(function () {
            $(".startBlock").attr("style", "display: none !important");
            $("#quiz-screen").fadeIn();
        });
    });
    $("#playAgainButton").click(function () {
        $("#resultsScreen").fadeOut(function () {
            $("#quiz-screen").empty();
            $("#resultsScreen").attr("style", "display: none !important");
            $(".startBlock").fadeIn();
        });
    });
    $("body").on("click", ".choiceButton", function () {
        if ($(this).text() === $(this).parent().parent().siblings("img").attr("id")) {
            logAnswers(true, $(this).parent().parent().parent().attr("id"))
            $(this).addClass("right") //attr("style", "background-color:green")
        }
        else {
            logAnswers(false, $(this).parent().parent().parent().attr("id"))
            $(this).addClass("wrong") //attr("style", "background-color:red")
            $("button:contains(" + $(this).parent().parent().siblings("img").attr("id") + ")").addClass("right") //attr("style", "background-color:green")

        }
        var currentQuestion = parseInt($(this).parent().parent().parent().attr("id").replace("question", ""));
        var nextQuestion = currentQuestion + 1;
        console.log(currentQuestion);
        console.log(nextQuestion);
        $(".choiceButton").prop("disabled", true)
        $(this).parent().parent().parent().delay(1500).fadeOut(function () {
            $(".choiceButton").prop("disabled", false);
            if (currentQuestion == quizSet.length) {
                $("#quiz-screen").fadeOut(function () {
                    $("#quiz-screen").attr("style", "display: none !important");
                    updateResultsScreen();
                    $("#resultsScreen").fadeIn();
                });

            }
            else {
                $("#question" + nextQuestion.toString()).fadeIn();
            }
        });
    });
});

function logAnswers(answer, questionNumber) {
    answers.push({ questionNumber: questionNumber.replace("question", ""), answer: answer })
    console.log(answers);
}

function updateResultsScreen() {
    var correct = 0;
    for (var i = 0; i < answers.length; i++) {
        if (answers[i].answer == true) {
            correct++;
        }
    }
    $("#result").text(correct.toString() + "/" + quizSet.length.toString());
    result
}

function appendQuizQuestion(countryFlag, flagNum) {
    var choiceArray = [];
    choiceArray.push(jsonFlags[Math.floor(Math.random() * jsonFlags.length)].name);
    choiceArray.push(jsonFlags[Math.floor(Math.random() * jsonFlags.length)].name);
    choiceArray.push(jsonFlags[Math.floor(Math.random() * jsonFlags.length)].name);
    choiceArray.push(countryFlag);
    choiceArray = shuffle(choiceArray);
    var answer1 = choiceArray[0];
    var answer2 = choiceArray[1];
    var answer3 = choiceArray[2];
    var answer4 = choiceArray[3];
    if (flagNum === 1) {
        var line1 = "<div class='text-center' id='question" + flagNum + "'>" +
            "<img class='img questionFlag' src='./FlagData/" + countryFlag + ".png' id='" + countryFlag + "' alt='User Icon' />" +
            "<div class='row'>" +
            "<div class='col'><button type='button' class='col-9 btn choiceButton' id='choice1'>" + answer1 + "</button>" +
            "</div>" +
            "<div class='col'><button type='button' class='col-9 btn choiceButton' id='choice2'>" + answer2 + "</button>" +
            "</div>" +
            "</div>" +
            "<div class='row'>" +
            "<div class='col'><button type='button' class='col-9 btn choiceButton' id='choice3'>" + answer3 + "</button>" +
            "</div>" +
            "<div class='col'><button type='button' class='col-9 btn choiceButton' id='choice4'>" + answer4 + "</button>" +
            "</div>" +
            "</div>" +
            "</div>"
    }
    else {
        var line1 = "<div class='text-center' style='display:none' id='question" + flagNum + "'>" +
            "<img class='img questionFlag' src='./FlagData/" + countryFlag + ".png' id='" + countryFlag + "' alt='User Icon' />" +
            "<div class='row'>" +
            "<div class='col'><button type='button' class='col-9 btn choiceButton' id='choice1'>" + answer1 + "</button>" +
            "</div>" +
            "<div class='col'><button type='button' class='col-9 btn choiceButton' id='choice2'>" + answer2 + "</button>" +
            "</div>" +
            "</div>" +
            "<div class='row'>" +
            "<div class='col'><button type='button' class='col-9 btn choiceButton' id='choice3'>" + answer3 + "</button>" +
            "</div>" +
            "<div class='col'><button type='button' class='col-9 btn choiceButton' id='choice4'>" + answer4 + "</button>" +
            "</div>" +
            "</div>" +
            "</div>"
    }
    $("#quiz-screen").append(line1);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}