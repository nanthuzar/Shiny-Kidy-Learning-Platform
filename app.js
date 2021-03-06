





const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");


let questionCounter =0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


//push the questions into availableQuestions Array
function setAvailableQuestions(){
	const totalQuestion = quiz.length;
	for (var i = 0; i < totalQuestion; i++) {
		availableQuestions.push(quiz[i]);
	}
}

// set question number and question and options
function getNewQuestion(){
	//set question number
	questionNumber.innerHTML = "Question" + (questionCounter + 1) + "of" + quiz.length;

	//set question text
	// get random question

	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
	currentQuestion =questionIndex;
	questionText.innerHTML = currentQuestion.q;

	//get the position of 'questionindex' from the availableQuestion Array;
	const index1 = availableQuestions.indexOf(questionIndex);

	//remove the 'questionindex' from the availableQuestion Array, so that the question does not repeat
	availableQuestions.splice(index1,1);
	//console.log(index1);
	/*console.log(questionIndex);
	console.log(availableQuestions);*/

	//set options
	//get the length of options
	const optionLen = currentQuestion.options.length;
	//console.log(currentQuestion.options);


	//push options into availableOptions Array
	for (var i = 0; i < optionLen; i++) {
		availableOptions.push(i);
	}
	//console.log(availableOptions)
	//questionCounter++;

	//console.log(questionIndex);
	optionContainer.innerHTML = '';

	let animationDelay = 0.2;
	//create option in html
	for (let i = 0; i < optionLen; i++) {
		//random option
		const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		//const optionIndex = availableOptions[Math.floor(Math)]
		//get the position of 'optionIndex' from the availableOptions
		const index2 = availableOptions.indexOf(optionIndex);

		//remove the options 'optionIndex' from the availableOptions Array, so that the option does not repeat
		availableOptions.splice(index2,1);
		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[optionIndex];
		option.id = optionIndex;
		option.style.animationDelay = animationDelay + 's';
		animationDelay = animationDelay + 0.2;
		option.className = "option";
		optionContainer.appendChild(option);
		option.setAttribute("onclick", "getResult(this)");
	}
	questionCounter++;
}

function getResult(element){
	const id = parseInt(element.id);
	//get the answer by comparing the id of clicked option
	if(id === currentQuestion.answer){
		//set the green color to the correct option
		element.classList.add("correct");
		//add the indicator to correct mark
		updateAnswerIndicator("correct");
		correctAnswers++;
	}else{
		//set the red color to the wrong option
		element.classList.add("wrong");

		//add the indicator to wrong mark
		updateAnswerIndicator("wrong");
		

		//wrong answer pyay yin correct answer par pya 
		const optionLen = optionContainer.children.length;
		for(let i=0; i<optionLen; i++){
			if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
				optionContainer.children[i].classList.add("correct");
			}
		}
	}
	attempt++;
	unclickableOptions();
}

//make all the options unclickable once the user select a option(Restrict the user to change the option again)
function unclickableOptions(){
	const optionLen = optionContainer.children.length;
	for(let i=0 ; i<optionLen; i++){
		optionContainer.children[i].classList.add("already-answered");
	}
}

function answersIndicator(){
	answersIndicatorContainer.innerHTML = '';
	const totalQuestion = quiz.length;
	for(let i=0; i<totalQuestion; i++){
		const indicator = document.createElement("div");
		answersIndicatorContainer.appendChild(indicator);
	}
}

function updateAnswerIndicator(markType){
	answersIndicatorContainer.children[questionCounter-1].classList.add(markType);

}

function next(){
	if (questionCounter === quiz.length) {
		//console.log("quiz over");
		quizOver();
	}
	else{
		getNewQuestion();
	}
}

function quizOver(){

	quizBox.classList.add("hide");
	//show result Box
	resultBox.classList.remove("hide");

	quizResult();
}

//get the quiz result
function quizResult(){
	resultBox.querySelector(".total-score").innerHTML =correctAnswers + "out of" + quiz.length;
}

function resetQuiz(){
	questionCounter = 0;
	correctAnswers = 0;
	attempt = 0;
}

function tryAgainQuiz(){
	//hide the resultBox
	resultBox.classList.add("hide");
	//show the quizBox
	quizBox.classList.remove("hide");

	resetQuiz();
	startQuiz();
}

function goToHome(){
	//hide result Box
	resultBox.classList.add("hide");

	//show home box
	homeBox.classList.remove("hide");

	resetQuiz();
}

//starting point
function startQuiz(){

	//hide home box
	homeBox.classList.add("hide");

	//show quiz box
	quizBox.classList.remove("hide");

	//first we will set all questions in availableQuestions Array
	setAvailableQuestions();
	//second we will call getNewQuestion() function
	getNewQuestion();

	//to create indicator of answers
	answersIndicator();
}

window.onload = function(){
	homeBox.querySelector(".total-questions").innerHTML = quiz.length;
}
