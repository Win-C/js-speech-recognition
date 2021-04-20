"use strict";

// speech recognition is a global variable that lives in the browser
window.SpeechRecognition = (
  window.SpeechRecognition || window.webkitSpeechRecognition
);

const recognition = new SpeechRecognition();
recognition.interimResults = true; // as you are speaking, it's populating

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', evt => {
  const transcript = Array.from(evt.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join('');
  
  p.textContent = transcript;

  if(evt.results[0].isFinal){
    p = document.createElement('p');
    words.appendChild(p);
  }
})

recognition.addEventListener('end', recognition.start);

recognition.start();
