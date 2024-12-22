import { useRef } from "react";

function useSpeechRecognition(formik) {
  const speechRecognitionRef = useRef(null);

  const startSpeechRecognition = (fieldName) => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    speechRecognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      formik.setFieldValue(fieldName, transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
      if (event.error === "network") {
        alert(
          "Speech recognition is not working due to network restrictions. Please check browser settings or permissions."
        );
      }
    };

    recognition.start();
  };

  return startSpeechRecognition;
}

export default useSpeechRecognition;
