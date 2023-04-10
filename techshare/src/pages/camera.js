import Webcam from "react-webcam";

function WebCamera() {

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  return (
    <div className='Webcam'>
      <Webcam 
        mirrored={true}
        videoConstraints={videoConstraints}
      />
    </div>
  );
}

export default WebCamera;
