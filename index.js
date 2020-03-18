// wrapping the program in an anonymous function avoids the global scope
(function(){
    const questions = [
        {
        question: "Who among the Julio-Claudian emperors reigned the longest?",
        options: ["Augustus", "Tiberius", "Claudius", "Nero"],
        correctAnswer: "Augustus" 
        },
        {
        question: "What was Caligula's real name?",
        options: ["Marcus", "Titus", "Publius", "Gaius"],
        correctAnswer: "Gaius" 
        },
        {
        question: "Which emperor completed the conquest of Britain?",
        options: ["Tiberius", "Nero", "Claudius", "Caligula"],
        correctAnswer: "Claudius" 
        },
        {
        question: "Which of the emperors below was descended from both the Julian and Claudian families?",
        options: ["Augustus", "Claudius", "Tiberius", "Caligula"],
        correctAnswer: "Caligula" 
        },
        {
        question: "Who retired early to Rhodes, only to come out of retirement after just seven years?",
        options: ["Augustus", "Tiberius", "Claudius", "Nero"],
        correctAnswer: "Tiberius" 
        },
        {
        question: "Which emperor competed in the Olympic games?",
        options: ["Caligula", "Augustus", "Nero", "Claudius"],
        correctAnswer: "Nero" 
        },
        {
        question: "Which emperor invented and added letters to the Latin alphabet?",
        options: ["Claudius", "Augustus", "Caligula", "Tiberius"],
        correctAnswer: "Claudius" 
        },
        {
        question: "Which emperor conspired to have his own mother killed?",
        options: ["Caligula", "Claudius", "Tiberius", "Nero"],
        correctAnswer: "Nero" 
        },
        {
        question: "Who added Egypt to the Roman empire?",
        options: ["Tiberius", "Augustus", "Caligula", "Nero"],
        correctAnswer: "Augustus" 
        },
        {
        question: "Which of the Julio-Claudian emperors was the oldest when he died?",
        options: ["Tiberius", "Augustus", "Claudius", "Nero"],
        correctAnswer: "Tiberius" 
        }
    ];
    let currentQuestion = 1;
    let currentScore = 0;

    // begin quiz
    function beginQuiz() {
        $('.quiz-field').on('click', '.start-quiz', event => {
            loadNextQuestion();
        });
        $('.quiz-field').on('submit', event => {
            event.preventDefault();
            loadNextAnswer();
        });
        $('.quiz-field').on('click', '.next-question', event => {
            event.preventDefault();
            currentQuestion +=1;
            if (currentQuestion > questions.length) {
                finalScore();
            } else {
                loadNextQuestion();
            }
        });
        $('.quiz-field').on('click', '.restart', event => {
            event.preventDefault();
            restart();
        });
    }

    // fetch question
    function fetchQuestion() {
        return questions[currentQuestion-1];
    }

    // retrieve question from object in array
    function parseQuestion() {
        const nextQuestion = fetchQuestion();
        return nextQuestion.question;
    }

    // retrieve options from object in array
    function parseOptions() {
        const nextQuestion = fetchQuestion();
        return nextQuestion.options;
    }

    // retrieve correct answer from object in array
    function parseAnswer() {
        const nextQuestion = fetchQuestion();
        return nextQuestion.correctAnswer;
    }

    // load next question
    function loadNextQuestion() {
        const question = parseQuestion();
        const options = parseOptions();
        const optionsHTML = [];
        for (let option of options) {
            optionsHTML.push(`
                <label for="${option}" class="quiz-option">
                    <input id="${option}" type="radio" name="option" required>
                    ${option}
                </label>
            `);
        }
        $('.quiz-field').html(`
            <section class="question-section">
                <div class="question-text">
                    <section class="score-and-result">
                        <p>Quiz progress: ${currentQuestion}/${questions.length}</p>
                        <p>Current score: ${currentScore}/${questions.length}</p>
                    </section>
                    <h2>${question}</h2>
                    <form>
                        ${optionsHTML.join('\n')}
                        <button type="submit" class="check-answer button">Submit</button>
                    </form>
                </div>
                <img src="images/question-image.jpg" alt="Relief of four Roman men" class="question-image">
            </section>
        `);
    }

    // check answer
    function checkAnswer(correctAnswer) {
        return $(`#${correctAnswer}:checked`).val();
    }

    // obtain user's response
    function obtainUserResponse() {
        let selectedOption = '';
        const options = parseOptions();
        for (let option of options) {
            if ($(`#${option}:checked`).val()) {
                selectedOption = option;
            }
        }
        return selectedOption;
    }

    // load next answer
    function loadNextAnswer() {
        const question = parseQuestion();
        const selectedOption = obtainUserResponse();
        const correctAnswer = parseAnswer();
        const result = checkAnswer(correctAnswer);
        updateScore(result);
        (result) ? 
            $('.quiz-field').html(`
                <div class="answer-page">
                    <div class="answer-text">
                        <section class="score-and-result">
                            <p>Quiz progress: ${currentQuestion}/${questions.length}</p>
                            <p>Current score: ${currentScore}/${questions.length}</p>
                        </section>
                        <p>Question: "${question}"</p>
                        <h2>Correct! The answer is "${selectedOption}"!</h2>
                    </div>
                    <img src="images/${correctAnswer}-small.jpg" alt="Image of ${correctAnswer}" class="answer-image">
                </div>
                <button type="submit" class="next-question button">Next</button>
            `)
            : $('.quiz-field').html(`
                <div class="answer-page">
                    <div class="answer-text">
                        <p>Quiz progress: ${currentQuestion}/${questions.length}</p>
                        <p>Current score: ${currentScore}/${questions.length}</p>
                        <p>Question: "${question}"</p>
                        <h2>Sorry, your response of "${selectedOption}" is not correct</h2>
                        <h2>The correct answer is: "${correctAnswer}"</h2>
                    </div>
                    <img src="images/${correctAnswer}-small.jpg" alt="Image of ${correctAnswer}" class="answer-image">
                </div>
                    <button type="submit" class="next-question button">Next</button>
            `);
    }

    // increase score
    function updateScore(result) {
        if (result) currentScore +=1;
    }

    // display final score
    function finalScore() {
        const resultResponse = checkFinalScore();
        $('.quiz-field').html(`
            <div class="score-content">
                ${resultResponse}
            </div>
            <button type="submit" class="restart button">Retry</button>
        `);
    }

    // checks final score and returns appropriate content
    function checkFinalScore() {
        if (currentScore >= 8) {
            return `
                <div class="score-text">
                    <h2>You scored ${currentScore} out of ${questions.length}!</h2>
                    <p>Tacitus would be proud!</p>
                </div>
                <img src="images/Tacitus.jpg" alt="Engraving of the historian Tacitus" class="score-image"> 
            `;
        } else if (currentScore > 5) {
            return `
                <div class="score-text">
                    <h2>You scored ${currentScore} out of ${questions.length}!</h2>
                    <p>An effort worthy of Suetonius!</p>
                </div>
                <img src="images/Suetonius.jfif" alt="Bust of the biographer Suetonius" class="score-image">
            `;
        } else {
            return `
                <div class="score-text">
                    <h2>You scored ${currentScore} out of ${questions.length}!</h2>
                    <p>Perhaps you've been reading too much Livy and dwelling on the Republic...</p>
                </div>
                <img src="images/Livy.png" alt="Engraving of the historian Livy" class="score-image">
            `;
        }
    }

    // restart quiz
    function restart() {
        currentQuestion = 1;
        currentScore = 0;
        loadNextQuestion();
    }

    // initial callbackfunction
    function handleQuizApp () {
        beginQuiz();
    }

    $(handleQuizApp);})();
