// Hintergrundskript
chrome.runtime.onConnect.addListener(function(port) {
    console.log("Popup-Fenster verbunden");
  
    // Nachrichten empfangen
    port.onMessage.addListener(function(msg) {
      console.log("Nachricht empfangen: " + msg);
  
      // Hier können Sie die empfangene Nachricht verarbeiten
  
      // Antwort senden
      port.postMessage("Antwort vom Hintergrundskript");
    });
  
    // Port schließen, wenn keine Antwort empfangen wurde
    setTimeout(function() {
      if (port) {
        console.log("Keine Antwort empfangen. Port wird geschlossen.");
        port.disconnect();
        port = null;
      }
    }, 5000);
  });
  
  // Popup-Fenster
  var port = chrome.runtime.connect({name: "popup"});
  
  // Nachricht senden
  port.postMessage("Nachricht vom Popup-Fenster");
  
  // Antwort empfangen
  port.onMessage.addListener(function(msg) {
    console.log("Antwort empfangen: " + msg);
  });
  