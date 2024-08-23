//Submit all and finish
async function main(){
    async function progress(){
        var buttons = document.getElementsByClassName('btn btn-primary');
        for(let i = buttons.length-1; i > -1; i--){
            if(buttons[i].textContent == 'Submit all and finish'){
                await buttons[i].click();
                break;
            }
        }
    }
    await progress().then(() => {
        progress();
    })
}
main();