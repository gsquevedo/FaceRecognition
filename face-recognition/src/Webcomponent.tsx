/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import Webcam from "react-webcam";
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import "@tensorflow/tfjs-converter";
import '@mediapipe/face_mesh';
import { MediaPipeFaceMeshMediaPipeModelConfig } from '@tensorflow-models/face-landmarks-detection';

const WebcamComponent = () => {
  const webcam = useRef<Webcam>(null);
  const [detector, setDetector] = useState();

  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
  const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh'
  }
  useEffect(() => {
    (async () => {
      const detector = await faceLandmarksDetection.createDetector(model,detectorConfig as MediaPipeFaceMeshMediaPipeModelConfig);
      const faces = await detector.estimateFaces(webcam as any)
      setDetector(detector as any)
    })()
  })
  
  return (
    <>
      <Webcam
        audio={false}
        height={620}
        ref={webcam}
        width={620}
      />
    </>
  );
}
  
export default WebcamComponent;
