import React, { useCallback, useState } from "react";
import Webcam from "react-webcam";

export default function BackCamera() {
    let videoConstraints;

    // front camera is false
    // back camera is true
    const [camera, setCamera] = useState(false);

    const frontCamera = useCallback(() => {
        setCamera(false)
    }, [setCamera]);

    const backCamera = useCallback(() => {
        setCamera(true)
    }, [setCamera]);

    if(camera == true){
        videoConstraints = {
            width: 350,
            height: 400,
            facingMode: "environment",
          };    
    } else {
        videoConstraints = {
            width: 350,
            height: 400,
            facingMode: "user",
          };
    }

    // const videoConstraints = {
    //     width: 400,
    //     height: 400,
    //     facingMode: "environment",
    // };

    return (
        <div class='centered'>
            <h1>Front & Back Camera</h1>
            <h4>*will only work on devices with two cameras (e.g. a phone).</h4>
             <div class='Webcam'>
                <Webcam 
                    mirrored={false}
                    videoConstraints={videoConstraints}
                />
            </div>
            <br></br>
            {/* 
            ternary operator is used (conditon ? true : false)
            if camera is true, show front camera
            else (false), show back camera 
            */}

            {camera ? (
                <button onClick={frontCamera}>Front Camera</button>
            ) : (
                <button onClick={backCamera}>Back Camera</button>
            )}
        </div>
    );
}