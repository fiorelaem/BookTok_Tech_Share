// Code taken from https://blog.openreplay.com/capture-real-time-images-and-videos-with-react-webcam/
// with some slight modifications for our use in our tech share

import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamVideo() {

  // These values persist b/w renders. 
  // mediaRecorderRef used to capture video data
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  // capturing is initialized to boolean value false 
  const [capturing, setCapturing] = useState(false);
  // initialize recordedChunks to an empty array
  const [recordedChunks, setRecordedChunks] = useState([]);


  // arrow function with data parameter is used to update
  // recordedChunks with video data
  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  // use the MediaStream Recording API to capture data captured by a MediaStream
  // (interface that represents a stream of media content i.e. a video)

  // 1. MediaRecorder object is created by telling it the source stream
  //    mimeType is a read-only property specifying the media type (a video in this case)
  // 2. set event handler so that it gets called when new data is available 
  // 3. start() is called to begin recording
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);


  // 1. stop() is called to stop recording
  // 2. capturing is set to false through setCapturing function
  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);


  // 1. to download video, first check if there's a video to download
  // 2. create a BLOB object with parameter recordedChuncks (must be an array)
  // 3. create a string url that represents BLOB object
  // 4. download the video
  // 5. set recordedChunks to an empty array
  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };


  return (
    <div className="Container">
      <Webcam
        height={400}
        width={400}
        audio={false}
        mirrored={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      <br></br>
      
      {/* 
        ternary operator is used (conditon ? true : false)
        if capturing (true), show stop button
        else (false), show start button 
      */}
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}

      {/* 
        logical && operator is used (condition ?? true)
        render only if condition is true
        if a video was recorded, show download button
      */}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </div>
  );
}
