var supported = false;

if (!('webkitSpeechRecognition' in window)) {
  supported = false;
} else {
  supported = true;
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  //var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
}


import fiBirdNames from '@/json/birdNamesFI.json';

export class SpeechRecognizer
{
  startBtn = null;
  stopBtn = null;
  result = null;
  resultContainer = null;
  mic = null;

  recognition = null;
  grammar = null;
  speechRecognitionList = null;

  constructor(startBtn, result, stopBtn, container, mic) 
  {
    this.startBtn = startBtn;
    this.result = result;
    this.stopBtn = stopBtn;
    this.resultContainer = container;
    this.mic = mic;
  }

  startRecognizing() {
    if(supported) {
      this.stopBtn.style.display = "block";
      this.startBtn.disabled = true;
      this.startBtn.textContent = 'Hetki...';
      this.resultContainer.classList.remove('isResult');

      this.grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + fiBirdNames.FIbirds.join(' | ') + ' ;';
      this.recognition = new SpeechRecognition();
      this.speechRecognitionList = new SpeechGrammarList();
      this.speechRecognitionList.addFromString(this.grammar, 1);
      this.recognition.grammars = this.speechRecognitionList;
      this.recognition.lang = 'fi-FI';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.result.innerHTML = '';
      this.recognition.start();

      this.recognition.addEventListener('result', event => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at position 0.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object 
        var speech = event.results[0][0].transcript.toLowerCase();
        this.result.innerHTML = speech;
      })

      this.recognition.addEventListener('audiostart', event => {
        //Fired when the user agent has started to capture audio.
        this.startBtn.innerHTML = 'Sano lintulaji tai linnun tuntomerkkejä';
        this.mic.style.display = "flex";
        this.mic.classList.add("recognizing");
      })

      this.recognition.addEventListener('speechend', event => {
        this.stopRecognizing();
        this.mic.style.display = "none";
        this.mic.classList.remove("recognizing");
      })

      this.recognition.addEventListener('error', event => {
        var err = event.error;
        
        switch(err) {
          case 'abort':
            this.result.innerHTML = 'Puheentunnistus peruutettu. Kokeile uudestaan?';
            break;
          case 'no-speech':
            this.result.innerHTML = 'Puhetta ei tunnistettu. Kokeile uudestaan?';
            break;
        }
        this.stopRecognizing();
        this.mic.style.display = "none";
        this.mic.classList.remove("recognizing");
      })

      /*
      this.recognition.addEventListener('end', event => {
        //Fired when the speech recognition service has disconnected.
        console.log('end');
      })
      this.recognition.addEventListener('nomatch', event => {
        console.log('nomatch');
      })
      this.recognition.addEventListener('audioend', event => {
        //Fired when the user agent has finished capturing audio.
        console.log('audioend');
      })
      this.recognition.addEventListener('soundstart', event => {
        //Fired when any sound — recognisable speech or not — has been detected.
        console.log('sounstart');
      })
      this.recognition.addEventListener('soundend', event => {
        //Fired when any sound — recognisable speech or not — has stopped being detected.
        console.log('soundend');
      })
      this.recognition.addEventListener('speechstart', event => {
        //Fired when sound that is recognised by the speech recognition service as speech has been detected.
        console.log('speechstart');
      })
      this.recognition.addEventListener('start', event => {
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('start');
      })
      */
    }
    else {
      this.result.innerHTML = 'Valitettavasti selaimesi ei tue puheentunnistusta.'+
                               '<a href="/lintuhaku">Palaa takaisin</a>';
    }
  }

  stopRecognizing() {
    this.recognition.stop();
    this.startBtn.disabled = false;
    this.stopBtn.style.display = "none";
    this.startBtn.textContent = 'Etsi uudestaan';

    if(this.result.innerHTML === '') {
      this.result.innerHTML = 'Hetkonen<br>bongataan lintua...';
    }
  }

  abortRecognizing() {
    this.recognition.abort();
    this.startBtn.disabled = false;
    this.stopBtn.style.display = "none";
    this.startBtn.textContent = 'Etsi uudestaan';
    this.result.innerHTML = 'Puheentunnistus peruutettu. Kokeiletko uudestaan?';
  }

}