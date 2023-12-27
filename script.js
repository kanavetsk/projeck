const questions = [
	{
	  question: "Скільки орієнтовно у Вас досвіду як ФОП?",
	  answers: ["До 1 року", "Більше 1 року"],
	},
	{
	  question: "Яка група вашого ФОП?",
	  answers: ["1 група", "2 група", "3 група", "Я ТОВ 😎"],
	},
	{
	  question: "Ви самі ведете свій ФОП чи у вас є спеціаліст?",
	  answers: ["Сам", "Бухгалтер"],
	},
	{
	  question: "Яку суму в місяць Ви сплачуєте за супровід вашого ФОП?",
	  answers: ["до 1000 грн", "Більше 1000 грн", "Мій роботодавець займається моїм ФОПом"],
	},
	{
	  question: "За шкалою, від 1 до 5 на скільки Ви задоволені якістю послуг вашого бухгалтера?",
	  answers: ["1", "2", "3", "4", "5"],
	},
	{
	  question: "Було б Вам зручно вести комунікацію з бухгалтером тільки в месенджері, без зайвих дзвінків і витрат часу?",
	  answers: ["Так", "Ні"],
	},
	{
	  question: "Коли ваш День народження? Ми полюбляємо дарувати подарунки ФОПам, яким робимо бухгалтерський супровід",
	  type: "text",
	},
	{
	  question: "Якщо Ви готові розглянути пропозицію крутого бухгалтера, напишіть ваш номер телефону або лінк в ТГ, для консультації по вашому питанню, ми залюбки допоможемо :)",
	  type: "text",
	},
  ];
  
  let currentQuestionIndex = 0;
  let userAnswers = [];
  
  function displayQuestion() {
	const questionContainer = document.getElementById("quiz");
	const currentQuestion = questions[currentQuestionIndex];
  
	const questionElement = questionContainer.querySelector(".quiz-header .title");
	questionElement.textContent = currentQuestion.question;
  
	const answersContainer = questionContainer.querySelector(".quiz-list");
	answersContainer.innerHTML = "";
  
	if (currentQuestion.type === "text") {
	  const answerInput = document.createElement("input");
	  answerInput.type = "text";
	  answerInput.classList.add("text-answer");
	  answersContainer.appendChild(answerInput);
	} else {
	  currentQuestion.answers.forEach((answer) => {
		const answerElement = document.createElement("li");
		const answerLabel = document.createElement("label");
		const input = document.createElement("input");
		input.type = "radio";
		input.name = "answer";
		input.value = answer;
		input.classList.add("answer");
		answerLabel.appendChild(input);
		answerLabel.innerHTML += `<span>${answer}</span>`;
		answerElement.appendChild(answerLabel);
		answersContainer.appendChild(answerElement);
	  });
	}
  
	const nextButton = questionContainer.querySelector(".quiz-submit");
	nextButton.textContent = "Відповісти";
	nextButton.addEventListener("click", showNextQuestion);
  }
  
  function showNextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === "text") {
        const answerInput = document.querySelector(".text-answer");
        if (answerInput.value) {
            userAnswers.push(answerInput.value);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                displayResults();
            }
        } else {
            alert("Треба відповісти на питання, щоб піти далі");
        }
    } else {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer && selectedAnswer.value) {
            userAnswers.push(selectedAnswer.value);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                displayResults();
            }
        } else {
            alert("Треба відповісти на питання, щоб піти далі");
        }
    }
}
  
function displayResults() {
    const questionContainer = document.getElementById("quiz");

    const questionElement = questionContainer.querySelector(".quiz-header .title");
    questionElement.innerHTML = "";

    const resultsTitle = document.createElement("h2");
    resultsTitle.textContent = "Дякую, ваша відповідь записана!";
    resultsTitle.style.textAlign = "center"; // Додано цей рядок для вирівнювання посередині
	resultsTitle.style.marginTop = "50px";
	questionElement.appendChild(resultsTitle);

    const answersContainer = questionContainer.querySelector(".quiz-list");
    answersContainer.innerHTML = "";

    const nextButton = questionContainer.querySelector(".quiz-submit");
    nextButton.style.display = "none";

    // Send answers to email
    const userAnswersText = userAnswers.join("\n"); // Combine answers into a single string

    // EmailJS parameters
    const templateParams = {
        message: userAnswersText,
    };

    emailjs.send('service_iasfbks', 'template_xntd82t', templateParams)
        .then(function (response) {
            console.log('Success!', response.status, response.text);
        }, function (error) {
            console.log('Error:', error);
        });
}
  
  
  displayQuestion();