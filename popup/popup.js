//Load on Start
document.addEventListener('DOMContentLoaded', async function() {
    await chrome.storage.sync.get('run', function(data) {
      if(!data.run){
        document.getElementsByClassName('checkbox')[0].checked = false;
      }
  });
      document
        .getElementsByClassName("checkbox")[0]
        .addEventListener("change", async function () {
            await chrome.storage.sync.set({ run: this.checked });
        });
    await chrome.storage.sync.get('db', function(data) {
      if(data.db === 'Denning'){
        document.getElementsByClassName('checkbox')[1].checked = true;
      }
  });
      document
        .getElementsByClassName("checkbox")[1]
        .addEventListener("change", async function () {
          if (this.checked) {
            await chrome.storage.sync.set({ db: 'Denning' });
          } else {
            await chrome.storage.sync.set({ db: 'Mechley' });
          }
        });
        await chrome.storage.sync.get('stop', function(data) {
            if(!data.stop){
              document.getElementsByClassName('checkbox')[2].checked = false;
            }
        });
        document
          .getElementsByClassName("checkbox")[2]
          .addEventListener("change", async function () {
              await chrome.storage.sync.set({ stop: this.checked });
          });
});