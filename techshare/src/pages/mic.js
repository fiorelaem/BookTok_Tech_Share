// Code taken from https://www.assemblyai.com/blog/react-speech-recognition-with-react-hooks/
// with some slight modifications for our use in our tech share


import MicRecorder from "mic-recorder-to-mp3"
import { useState, useRef, useCallback } from "react"

export default function MicAudio() {

  const recorder = useRef(null);
  const audioPlayer = useRef(null);

  const [blobURL, setBlobUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(null);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    recorder.current = new MicRecorder({ 
      bitRate: 128 
    });
    recorder.current.start();
  }, [recorder, setIsRecording]);


  const stopRecording = useCallback(() => {
    recorder.current.stop();

    recorder.current.getMp3()
    .then(([buffer, blob]) => {
      const file = new File(buffer, "audio.mp3", {
        type: blob.type,
        lastModified: Date.now(),
      })
      const newBlobUrl = URL.createObjectURL(blob)
      setBlobUrl(newBlobUrl)
      setIsRecording(false)
      setAudioFile(file)
    })
  }, [recorder, setIsRecording, setAudioFile, setBlobUrl]);

  return (
    <div class='centered'>
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

// Implementation of microphone without using callback React hooks:

// import MicRecorder from "mic-recorder-to-mp3"
// import { useEffect, useState, useRef } from "react"

// const App = () => {
//   // Mic-Recorder-To-MP3
//   const recorder = useRef(null) //Recorder
//   const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
//   const [blobURL, setBlobUrl] = useState(null)
//   const [audioFile, setAudioFile] = useState(null)
//   const [isRecording, setIsRecording] = useState(null)

//   useEffect(() => {
//     //Declares the recorder object and stores it inside of ref
//     recorder.current = new MicRecorder({ bitRate: 128 })
//   }, [])

//   const startRecording = () => {
//     // Check if recording isn't blocked by browser
//     recorder.current.start().then(() => {
//       setIsRecording(true)
//     })
//   }

//   const stopRecording = () => {
//     recorder.current
//       .stop()
//       .getMp3()
//       .then(([buffer, blob]) => {
//         const file = new File(buffer, "audio.mp3", {
//           type: blob.type,
//           lastModified: Date.now(),
//         })
//         const newBlobUrl = URL.createObjectURL(blob)
//         setBlobUrl(newBlobUrl)
//         setIsRecording(false)
//         setAudioFile(file)
//       })
//       .catch((e) => console.log(e))
//   }

//   return (
//     <div>
//       <h1>React Mic</h1>
//       <audio ref={audioPlayer} src={blobURL} controls='controls' />
//       <div>
//         <button disabled={isRecording} onClick={startRecording}>
//           START
//         </button>
//         <button disabled={!isRecording} onClick={stopRecording}>
//           STOP
//         </button>
//       </div>
//     </div>
//   )
// }

// export default App