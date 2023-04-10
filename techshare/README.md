Try out our webcam and mic tech share [here](https://booktok-tech-share.onrender.com)!!

## React Webcam & Microphone Recorder to Mp3
React webcam is a React Javascript library that helps web developers utilize the web camera to record in-progress pictures or videos. It supports both mobile and desktop devices that have embedded cameras and it has several adaptable functions that you can use with your applications. React Mic Recorder to MP3 is a separate JS library that records audio.
## Getting Started

First, clone repository:

```bash
# enter techshare folder
cd techshare
# install 
npm install react-webcam mic-recorder-to-mp3
# run
npm run dev
```

## Sources

Our tech share used the following sources: 

- [React Webcam](https://www.npmjs.com/package/react-webcam)
- [Microphone Recorder to Mp3](https://www.npmjs.com/package/mic-recorder-to-mp3?activeTab=readme)
- [Capture Real-Time Images And Videos With React-Webcam](https://blog.openreplay.com/capture-real-time-images-and-videos-with-react-webcam/)
- [React Speech Recognition with React Hooks](https://www.assemblyai.com/blog/react-speech-recognition-with-react-hooks/)


## Quick Intro to React Hooks Used

### [useCallback](https://react.dev/reference/react/useCallback)

```bash
const cachedFn = useCallback(fn, dependencies)
```
- lets you cache a function definition between re-renders
- returns function from previous render if it's dependencies haven't changed
- used to optimize performance
- React doesn't call the function. The function is returned to you so you can call it whenever you want. 
- dependencies are all the reactive values (props, state, variables, and functions) referenced inside the fn code