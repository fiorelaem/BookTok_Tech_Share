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
    <div className="centered">
      <h1>Screenshot</h1>
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <br></br>
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <br></br>
          <button onClick={() => setImg(null)}>Retake</button>
        </>
      )}
    </div>
  );
}

export default WebcamImage;