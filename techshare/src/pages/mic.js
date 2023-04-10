// Code taken from https://www.assemblyai.com/blog/react-speech-recognition-with-react-hooks/
// with some slight modifications for our use in our tech share

// npm install --save react-mic

import MicRecorder from "mic-recorder-to-mp3"
import { useState, useRef, useCallback } from "react"

export default function MicAudio() {

  const recorder = useRef(null);                          // Used useRef to store img/video/audio
  const audioPlayer = useRef(null);                       // Used useRef to refer updated audio

  const [blobURL, setBlobUrl] = useState(null);           // Take a look at the stopRecording func
  const [audioFile, setAudioFile] = useState(null);       // To store the AudioFile

  const [isRecording, setIsRecording] = useState(null);   // when the user click start button setIsRecording(true)
                                                          // when the user click stop button setIsRecording(false)


  const startRecording = useCallback(() => {              // This function is called when the user starts recording.
    setIsRecording(true);                                 

    recorder.current = new MicRecorder();                 // Store the MicRecorder object to recorder.current (null before assinging)
    recorder.current.start();                             // Start Recording !

  }, [recorder, setIsRecording]);                         // If the function setIsRecording or recorder variable is changed then,
                                                          // It is called again.
  
  const stopRecording = useCallback(() => {               // This functin is called when the user stops recording.
    recorder.current.stop()                               // Stop Recording
    recorder.current.getMp3()                             // Get the buffer and blob from new Blob (see the getMp3 definition
    .then(([buffer, blob]) => {
      const file = new File(buffer, "audio.mp3")          
      const newBlobUrl = URL.createObjectURL(blob)        // create URL for downloading 

      setBlobUrl(newBlobUrl)
      setIsRecording(false)
      setAudioFile(file)
    })
    .catch((e) => console.log(e));
    
  }, [recorder, setIsRecording, setAudioFile, setBlobUrl]);       // If the function setIsRecording / setAudioFile / setBlobUrl or recorder variable is changed then,
                                                                  // It is called again.

  // The reason for disabled : To disallow two button(Start/Stop) clicks                                                    
  return (
    <div className="centered">
      <h1>Mic Recorder</h1>
      <audio ref={audioPlayer} src={blobURL} controls='controls' />
      <div>
        <button disabled={isRecording} onClick={startRecording}>    
          START
        </button>
        <button disabled={!isRecording} onClick={stopRecording}>
          STOP
        </button>
      </div>
    </div>
  )
}
