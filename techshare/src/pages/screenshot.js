// Code taken from https://blog.openreplay.com/capture-real-time-images-and-videos-with-react-webcam/
// with some slight modifications for our use in our tech share

import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamImage() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <h1 class='centered'>Screenshot</h1>
      
      {img === null ? (
        <>
        <div class='Webcam'>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        </div>
        <br></br>
        <div  class='centered'>
          <button onClick={capture}>Capture photo</button>
        </div>
        </>
      ) : (
        <>
        <div class='Webcam'>
          <img src={img} alt="screenshot" />
        </div>
          <br></br>
        <div  class='centered'> 
          <button onClick={() => setImg(null)}>Retake</button>
        </div>
        </>
      )}
      
    </div>
  );
}

export default WebcamImage;