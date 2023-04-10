import Webcam from "react-webcam";

function WebCamera() {

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  return (
    <div class='centered'>
      <h1>Webcam</h1>
      <div className='Webcam'>
        <Webcam 
          mirrored={true}
          videoConstraints={videoConstraints}
        />
      </div>
    </div>
  );
}

export default WebCamera;
