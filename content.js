(function() {
    document.body.style.fontFamily = 'Faruma, sans-serif';
    
    // Listen for messages from the popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "translate") {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
          sendResponse({text: selectedText});
        }
      }
    });
  })();