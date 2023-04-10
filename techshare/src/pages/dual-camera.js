import React, { useCallback, useState } from "react";
import Webcam from "react-webcam";

export default function WebCamera() {
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

    if(camera == 'true'){
        videoConstraints = {
            width: 400,
            height: 400,
            facingMode: "environment",
          };    
    } else {
        videoConstraints = {
            width: 400,
            height: 400,
            facingMode: "user",
          };
    }

    return (
        <div class='centered'>
            <Webcam 
                mirrored={true}
                videoConstraints={videoConstraints}
            />

            {/* 
            ternary operator is used (conditon ? true : false)
            if capturing (true), show stop button
            else (false), show start button 
            */}
            {camera ? (
                <button onClick={frontCamera}>Front Camera</button>
            ) : (
                <button onClick={backCamera}>Back Camera</button>
            )}
        </div>
    );
}