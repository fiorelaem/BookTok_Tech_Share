// Code taken from https://blog.openreplay.com/capture-real-time-images-and-videos-with-react-webcam/
// with some slight modifications for our use in our tech share

import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamVideo() {
  // -------------------------------------------------------------------------
  // These values persist b/w renders. Used to keep track of previous state values.
  // mediaRecorderRef used to capture video data
  // -------------------------------------------------------------------------
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);


  // -------------------------------------------------------------------------
  // capturing is initialized to boolean value false 
  // initialize recordedChunks to an empty array
  // -------------------------------------------------------------------------
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);


  // -------------------------------------------------------------------------
  // arrow function with data parameter is used to update
  // recordedChunks with video data
  // -------------------------------------------------------------------------
  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );


  // -------------------------------------------------------------------------
  // use the MediaStream Recording API to capture data captured by a MediaStream
  // (interface that represents a stream of media content i.e. a video)

  // 1. capturing is set to true
  // 2. MediaRecorder object is created by telling it the source stream
  //      - mimeType is a read-only property specifying the media type (a video in this case)
  // 3. set event handler so that it gets called when new data is available 
  // 4. start() is called to begin recording
  // -------------------------------------------------------------------------
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


  // -------------------------------------------------------------------------
  // 1. stop() is called to stop recording
  // 2. capturing is set to false through setCapturing function
  // -------------------------------------------------------------------------
  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);


  // -------------------------------------------------------------------------
  // 1. to download video, first check if there's a video to download
  // 2. create a BLOB object (file-like object of raw data) with parameter recordedChunks (must be an array)
  //       - returns blob object that's a concatenation of the recordedChunks array
  // 3. create a string url that represents BLOB object
  // 4. download the video
  // 5. release url since a new one is created each time (memory management)
  // 6. set recordedChunks to an empty array

  // this process of packaging up the video data for download would be very 
  // similar to packaging up the data to send to a server
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // return webcam along with three possible buttons (start, stop, download)
  // -------------------------------------------------------------------------
  return (
    <div class = 'centered'>
      <h1>Video</h1>
      <div class='Webcam'>
        <Webcam
          height={400}
          width={350}
          audio={false}
          mirrored={true}
          ref={webcamRef}
          videoConstraints={videoConstraints}
        />
      </div>
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
