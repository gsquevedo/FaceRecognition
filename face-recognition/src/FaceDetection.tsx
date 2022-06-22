import React, { useEffect } from 'react';
import { render } from 'react-dom';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { MediaPipeFaceMeshMediaPipeModelConfig } from '@tensorflow-models/face-landmarks-detection';

const FaceDetection: React.FC = (props) => {
    useEffect(() => {
        start()
    })

    const constraints = {
        audio: false,
        video: true
    };

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
        runtime: 'mediapipe', // or 'tfjs'
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    }
   
    async function start() {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        const video = document.getElementById('video') as HTMLVideoElement;
        video.srcObject = stream;
        const detector = await faceLandmarksDetection.createDetector(model, detectorConfig as MediaPipeFaceMeshMediaPipeModelConfig);
        const faces = await detector.estimateFaces(video);

        console.log(faces)
    }

    return (
        <div id="main">
            <div className="container">
                <div className="canvas-wrapper">
                    <canvas id="output"></canvas>
                    <video id="video" autoPlay>
                    </video>
                </div>
            </div>
        </div>
    )
}

export default FaceDetection

render(<FaceDetection />, document.getElementById('root'));
