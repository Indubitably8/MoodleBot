import { createClient } from '@supabase/supabase-js';

async function main(){

    //Finds number of quizzes passed today
    function numberPassed(){
        var date = new Date();
        var text = document.getElementsByClassName('cell c2');
        var dates = document.getElementsByClassName('statedetails')
        var result = 0;
        for(let i = 0; i < text.length; i++){
          if(Number(text[i].textContent) >= 8){
            if(text[i].parentNode.textContent.includes(', '+date.getDate())){
            result++;
            }
          }
        }
        return result;
      }
      //Finds attempt button
      var buttons = document.getElementsByClassName('btn btn-primary');
      var button = [];
      for(let i = 0; i < buttons.length; i++){
        if(buttons[i].type === 'submit'){
            button.push(buttons[i]);
        }
      }
        await chrome.storage.sync.get('stop', function(data) {
          if(!data.stop){
            window.alert('Quizzes Completed Today: '+numberPassed());
            if(button != null){
                button[button.length-1].click();
            }
          } else {
            if (numberPassed() < 15) {
              if (button != null) {
                button[button.length - 1].click();
              }
            } else {
              window.alert("All Done!");
            }
          }
      });
}
chrome.storage.sync.get('run', function(data) {
  if(data.run){
main();
  }
});