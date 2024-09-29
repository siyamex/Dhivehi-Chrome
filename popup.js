document.getElementById('translate').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: "translate"}, (response) => {
        if (response && response.text) {
          translateToDhivehi(response.text);
        } else {
          document.getElementById('result').textContent = "Please select some text to translate.";
        }
      });
    });
  });
  
  function translateToDhivehi(text) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=dv&dt=t&q=${encodeURIComponent(text)}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const translatedText = data[0].map(item => item[0]).join(' ');
        document.getElementById('result').textContent = translatedText;
      })
      .catch(error => {
        document.getElementById('result').textContent = "Translation failed. Please try again.";
      });
  }