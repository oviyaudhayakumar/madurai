const questions = [
    {
        question: " ____ is a memorial museum for Gandhi located in the city of Madurai in Tamil Nadu, India.",
        optionA: " Mahatma memorial museum",
        optionB: "Gandhi memorial museum",
        optionC: "Sakthi memorial museum",
        optionD: "None of the above",
        correctOption: "optionB"
    },

    {
        question: "Madurai is popularly called __ the city that never sleeps.",
        optionA: "Thoonga Nagaram",
        optionB: "Kovil Nagaram",
        optionC: "Meenachi Nagaram",
        optionD: "None of the above",
        correctOption: "optionA"
    },

    {
        question: "Distance between Madurai Airport and Madurai City is ___ kms.",
        optionA: "10",
        optionB: "20",
        optionC: "15",
        optionD: "12",
        correctOption: "optionD"
    },

    {
        question: "The southern gopuram is the tallest of them all with a height of ___ feet.",
        optionA: "180",
        optionB: "175",
        optionC: "170",
        optionD: "185",
        correctOption: "optionC"
    },

    {
        question: "There are several halls in the temple complex including one known as the ___",
        optionA: "Hall of thousand pillars",
        optionB: "Meenakshi Nayakkar Mandapam",
        optionC: "None of the above",
        optionD: "Both A & B",
        correctOption: "optionD"
    },

    {
        question: "The most important festival associated with the temple is the ___",
        optionA: "Meenakshi Thirukkalyanam",
        optionB: "Meenakshi Festival",
        optionC: "Meenakshi Mandabam",
        optionD: "None of the above",
        correctOption: "optionA"
    },

    {
        question: "The ancient city of Madurai, more than 2,500 years old, was built by the __ king.",
        optionA: "Chera ",
        optionB: "Pandiya ",
        optionC: "Chola ",
        optionD: "Pallava ",
        correctOption: "optionB"
    },

    {
        question: "Thirumalai Nayak Palace is a 17th-century palace erected in ___ AD by King Tirumala Nayaka.",
        optionA: "1636",
        optionB: "1637",
        optionC: "1638",
        optionD: "1639",
        correctOption: "optionA"
    },

    {
        question: "Thirumalai Nayakar mahal is famous for its ___ pillars. Pillar’s height is 82 feet and width is 19 feet",
        optionA: "All the below",
        optionB: "Marble",
        optionC: "Large",
        optionD: "Giant",
        correctOption: "optionD"
    },

    {
        question: "This museum was inaugurated by the former Prime Minister Jawaharlal Nehru on __",
        optionA: "16 April 1959",
        optionB: "15 April 1960",
        optionC: "16 April 1960",
        optionD: "15 April 1959",
        correctOption: "optionD"
    },
]
let shuffledQuestions = [] 

function handleQuestions() { 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}
let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

