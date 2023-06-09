// Code taken from https://blog.openreplay.com/capture-real-time-images-and-videos-with-react-webcam/
// with some slight modifications for our use in our tech share


import { useCallback, useRef, useState } from "react";
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
      <div className="Webcam">
        <Webcam
          mirrored={true}
          videoConstraints={videoConstraints}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
      <br></br>
      <button onClick={capture}>Capture photo</button> 
      
      <div className="Webcam">
        {img && (
            <img src={img} alt="capturedPhoto"/>
        )}
      </div>
    </div> 
  );
}

export default WebcamImage;
