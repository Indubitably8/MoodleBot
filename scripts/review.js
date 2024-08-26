import { createClient } from '@supabase/supabase-js';

async function main (){
  //import('https://unpkg.com/@supabase/supabase-js@2)

  //const { createClient } = supabase;

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
  //Checks to ensure proper db
  if(document.body.textContent.includes('Mechley')){
    await chrome.storage.sync.set({ db: 'Mechley' });
  } else if(document.body.textContent.includes('Denning')){
    await chrome.storage.sync.set({ db: 'Denning' });
  }

  var dbSet = 'Mechley';
  await chrome.storage.sync.get('db', function(data) {
    dbSet = data.db ?? 'Mechley';
});

  var dataGlobal =
    (await _supabase.from(dbSet).select().or(request)).data ?? [];
var questionsGlobal = [];
var answersGlobal = [];
for(let i = 0; i < dataGlobal.length; i++){
  answersGlobal.push(dataGlobal[i]["answer"]);
  questionsGlobal.push(dataGlobal[i]["question"]);
}
for(let i = 0; i < questions.length; i++){
  if (
    !questionsGlobal.includes(
      questions[i]
    ) &&
    answerElements.length != 0
  ) {
    questionsUpdate.push(
      questions[i]
    );
    answersUpdate.push(
      answerElements[i].textContent.replace("The correct answer is:", "")
    );
  }
}
  //Extract Data
  for(let i = 0; i < questionsUpdate.length; i++){
    await _supabase.from(dbSet).insert({"question":questionsUpdate[i], "answer":answersUpdate[i]});
  }
  //Escape!
  document.getElementsByClassName('mod_quiz-next-nav')[0].click()

  //Finds the answer to each question
  function FindAnswer(q) {
    for (let i = 0; i < answersGlobal.length; i++) {
      if (questionsGlobal[i] === q) {
        return answersGlobal[i];
      }
    }
    if (devmode) {
      nullCount++;
    }
    return "IDFK";
  }

  //Checks for repeat questions
  function CheckError() {
    for (let i = 0; i < questionsSort.length; i++) {
      var error = "";
      if (i != 0) {
        if (questionsSort[i] === questionsSort[i - 1]) {
          error = error + "Duplicates Detected;";
        }
      }
    }
    if (questionsUpdate.length === 0) {
      error = error + "No Data Extracted";
    }
    if (error === "") {
      error = "Extraction Succesful";
    }
    return error;
  }

  function PostAnswer(findanswer) {
    for (let i = 0; i < questionsGlobal.length; i++) {
      if (questionsGlobal[i].includes(findanswer)) {
        window.alert(FindAnswer(questionsGlobal[i]));
      }
    }
  }
}
chrome.storage.sync.get('run', function(data) {
  if(data.run){
main();
  }
});