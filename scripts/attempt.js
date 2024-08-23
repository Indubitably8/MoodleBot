import { createClient } from '@supabase/supabase-js';

async function main(){
    var questionElements = document.getElementsByClassName("qtext");
    var answerElements = document.getElementsByClassName("rightanswer");
  
    const _supabase = createClient(
      "https://qkkfntqgpswhpsvjjquu.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFra2ZudHFncHN3aHBzdmpqcXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxMTY5MjgsImV4cCI6MjAzOTY5MjkyOH0.wOdgv_aiZmmbNlSaLkM7JLxBPgvrMfGAmgts-NK4olA"
    );
  
    var questionsUpdate = [];
    var answersUpdate = [];
  
    var nullCount = 0;
  
  
    //Extracts Data
    var questions = [];
    var questionIds = [];
    var answers = [];
  
    var filterText = function(string){
      return string.replace('"', "")
      .replace("Answer Question 10", "")
      .replace("Answer Question 1", "")
      .replace("Answer Question 2", "")
      .replace("Answer Question 3", "")
      .replace("Answer Question 4", "")
      .replace("Answer Question 5", "")
      .replace("Answer Question 6", "")
      .replace("Answer Question 7", "")
      .replace("Answer Question 8", "")
      .replace("Answer Question 9", "")
      .replace(/(\r\n|\n|\r)/gm, "")
      .replace('"', "");
    }
    if (questionElements.length != 0) {
      for (let i = 0; i < questionElements.length; i++) {
        var filteredText = 
        questionIds[i] = Number(
          questionElements[i].parentNode.parentNode.parentNode.id.split("-")[2]
        );
        questions.push(
          filterText(questionElements[i].textContent)
        );
      }
    }
    //Fetches data from supabase
    var request = '';
  
    for(let i = 0; i < questions.length; i++){
      if(i > 0){
        request = request+',';
      }
      request = request + 'question.eq.' + questions[i];
    }
  
    var dataGlobal =
      (await _supabase.from("Latin").select().or(request)).data ?? [];
  var questionsGlobal = [];
  var answersGlobal = [];
  for(let i = 0; i < dataGlobal.length; i++){
    answersGlobal.push(dataGlobal[i]["answer"]);
    questionsGlobal.push(dataGlobal[i]["question"]);
  }

var questionsSort = [];
for(let i = 0; i < questionsGlobal.length; i++){
  questionsSort.push(questionsGlobal[i]);
}
questionsSort.sort();

//Finds the answer to each question
function FindAnswer (q){
  for(let i = 0; i < answersGlobal.length; i++){
    if(questionsGlobal[i] === q){
      return answersGlobal[i];
    }
  }
  return "IDFK";
}

for(let i = 0; i < questions.length; i++){
  answers.push(FindAnswer(questions[i]));
}

var inputs = document.getElementsByClassName('form-control d-inline');
//Button method
if(questionElements.length != 0){
  for(let i = 0; i < questions.length; i++){
    var button = document.createElement("BUTTON");
    button.id = 'button'+i;
    button.appendChild(document.createTextNode('Reveal Answer'));
    //questionElements[i].appendChild(button);
    button.addEventListener('click', function onButtonClick(){
  questionElements[i].textContent = questionElements[i].textContent+' == '+FindAnswer(questions[i])
  button.remove();
  questionElements[i].textContent = questionElements[i].textContent.replace('Reveal Answer', '');
});
  }
}
//Button Shortcut
function shortCut (){
for(let i = 0; i < inputs.length; i++){
  if(inputs[i].value.includes('`')){
    document.getElementById('button'+String(Number(inputs[i].id.slice(9).replace('_answer', ''))-1)).click();
    inputs[i].value = '';
  }
}
}
setInterval(shortCut, 100);

//Auto Completes
function auto(options = {}){
  var speed = options.fast || 1;
  var dumb = options.dumb || false;
  var pauseInterval = 3000+Math.floor(Math.random() * 4500);
  var correctGoal = Math.floor(Math.random() * 100);
  if(dumb){
  if(correctGoal < 6){
    correctGoal = 5;
  } else {
  if(correctGoal < 14){
    correctGoal = 6;
  } else {
  if(correctGoal < 30){
    correctGoal = 7;
  } else {
    if(correctGoal < 39){
      correctGoal = 8;
    } else {
      if(correctGoal < 88){
        correctGoal = 9;
      } else {
        correctGoal = 10;
      }}}}}
  } else {
    if(correctGoal < 7){
    correctGoal = 7;
  } else {
    if(correctGoal < 53){
      correctGoal = 8;
    } else {
      if(correctGoal < 82){
        correctGoal = 9;
      } else {
        correctGoal = 10;
      }}}
  }
  var correct = inputs.length-10;
  for(let i = 0; i < inputs.length; i++){
    var id = Number(inputs[i].id.slice(9).replace('_answer', ''));
    if(correct != correctGoal){
      if(FindAnswer(questions[questionIds.indexOf(Number(inputs[i].id.slice(9).replace('_answer', '')))]) != 'IDFK'){
    setTimeout(() => inputs[i].value = FindAnswer(questions[questionIds.indexOf(Number(inputs[i].id.slice(9).replace('_answer', '')))]), i*pauseInterval/speed)
    correct++;
      } else {
        setTimeout(() => inputs[i].value = ' ', i*pauseInterval/speed)
      }
    } else {
      setTimeout(() => document.getElementById('mod_quiz-next-nav').click(), 9*pauseInterval/speed+1000)
      break;
    }
  }
  setTimeout(() => document.getElementById('mod_quiz-next-nav').click(), inputs.length*pauseInterval/speed+1000)
  var time = ((pauseInterval*9+1000)/1000/speed).toFixed();
  var display = 'Questions Correct: '+correctGoal+';   '+time+' Seconds to Complete;   Unknown Answers: '+nullCount;
  return display;
}
function PostAnswer(findanswer){
    for(let i = 0; i < questionsGlobal.length; i++){
      if(questionsGlobal[i].includes(findanswer)){
        window.alert(FindAnswer(questionsGlobal[i]));
      }
    }
  }
  function numberPassed(){
    var text = document.getElementsByClassName('cell c2');
    var dates = document.getElementsByClassName('statedetails')
    var result = 0;
    for(let i = 0; i < text.length; i++){
      if(Number(text[i].textContent) >= 8){
        if(text[i].parentNode.textContent.includes(dates[dates.length-2].textContent.substring(0, 30))){
        result++;
        }
      }
    }
    return 'Quizzes passed: '+result;
  }
var devmode = true;
  window.addEventListener('click', function (e) {
if(devmode){
  if(questionsUpdate.length != 0){
  extract();
  }
}
  devmode = false;
});
auto();
}
main();