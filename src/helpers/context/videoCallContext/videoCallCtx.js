import EasyTimer from "easytimer.js";
import { useState, useEffect } from 'react';
import { agoraVideoCall } from "@/helpers/agora/videoCall";
import { getUrlSearchParams } from "@/helpers/utils";
import { useChat } from "../chatContext";
import VideoCallContext from ".";

const VideoCallProvider = (props) => {
  const { user, contact } = useChat();

  const [timer] = useState(new EasyTimer);
  const [videoCall, setVideoCall] = useState(false);
  const [videoMaximize, setVideoMaximize] = useState(false);
  const [videoFullScreen, setVideoFullScreen] = useState(false);
  const [timeValues, setTimeValues] = useState('00:00:00');
  const [joined, setJoined] = useState(false);
  const [muteVideo, setMuteVideo] = useState(true);
  const [muteAudio, setMuteAudio] = useState(true);
  const [audioInputs, setAudioInputs] = useState([]);
  const [videoInputs, setVideoInputs] = useState([]);
  const [audioInput, setAudioInput] = useState(null);
  const [videoInput, setVideoInput] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
  const [remoteAudioTrack, setRemoteAudioTrack] = useState(null);
  const [rtcClient] = useState(agoraVideoCall.getClient(joined));

  const tickTimer = () => {
    const timeValues = timer.getTimeValues().toString();
    setTimeValues(timeValues);
  }

  const startTimer = () => {
    setTimeValues('00:00:00');

    timer.start();
    timer.addEventListener("secondsUpdated", tickTimer);
  }

  const stopTimer = () => {
    timer.stop();
    timer.removeEventListener("secondsUpdated", tickTimer);
  }

  const toggleVideoCall = () => {
    if (videoCall) {
      leaveVideoCall();
    }

    setVideoCall(!videoCall);
  }

  const setDevices = async () => {
    const { videoInputs, audioInputs } = await agoraVideoCall.getDevices();

    setVideoInputs(videoInputs);
    setAudioInputs(audioInputs);

    setVideoInput(videoInputs[0]);
    setAudioInput(audioInputs[0]);
  }

  const joinVideoCall = async () => {
    if (joined || !audioInput || !videoInput || !videoCall) {
      return;
    }

    const { localVideoTrack, localAudioTrack } = await agoraVideoCall.join(rtcClient, {
      videoId: videoInput.deviceId,
      audioId: audioInput.deviceId,
      onUserPublished: ({ remoteVideoTrack, remoteAudioTrack }) => {
        setRemoteVideoTrack(remoteVideoTrack);
        setRemoteAudioTrack(remoteAudioTrack);
      },
      onUserUnpublished: () => {
        setRemoteVideoTrack(null);
        setRemoteAudioTrack(null);
      }
    });

    startTimer();
    setJoined(true);
    setMuteVideo(false);
    setMuteAudio(false);
    setLocalVideoTrack(localVideoTrack);
    setLocalAudioTrack(localAudioTrack);
  }

  const leaveVideoCall = async () => {
    agoraVideoCall.leave(rtcClient, {
      localVideoTrack,
      localAudioTrack,
      remoteVideoTrack,
      remoteAudioTrack
    });

    stopTimer();
    setJoined(false);
    setMuteVideo(true);
    setMuteAudio(true);
    setLocalVideoTrack(null);
    setLocalAudioTrack(null);
    setRemoteVideoTrack(null);
    setRemoteAudioTrack(null);
  }

  const changeVideoInput = async (deviceId) => {
    try {
      const videoInput = videoInputs.find(item => item.deviceId === deviceId);

      if (videoInput) {
        await localVideoTrack.setDevice(videoInput.deviceId);
        setVideoInput(videoInput);
      }
    }
    catch { }
  }

  const changeAudioInput = async (deviceId) => {
    try {
      const audioInput = audioInputs.find(item => item.deviceId === deviceId);

      if (audioInput) {
        await localAudioTrack.setDevice(audioInput.deviceId);
        setAudioInput(audioInput);
      }
    }
    catch { }
  }

  const toggleMuteVideo = async () => {
    await localVideoTrack.setEnabled(muteVideo);
    setMuteVideo(!muteVideo);
  }

  const toggleMuteAudio = async () => {
    await localAudioTrack.setEnabled(muteAudio);
    setMuteAudio(!muteAudio);
  }

  const toggleVideoMaximize = () => {
    setVideoMaximize(!videoMaximize);
  }

  const fullScreenChange = () => {
    setVideoFullScreen(document.fullscreenElement ? true : false);
  }

  useEffect(() => {
    setDevices();
    document.addEventListener("fullscreenchange", fullScreenChange);
    return () => document.removeEventListener("fullscreenchange", fullScreenChange);
  }, [])

  useEffect(() => {
    if (user && contact) {
      const query = getUrlSearchParams()
      const isVideo = (query?.mode === 'video')
      setVideoCall(isVideo);

      if (isVideo) {
        document.querySelector('.sidebar-toggle').classList.add('mobile-menu');
      }
    }
  }, [
    user,
    contact,
  ])

  useEffect(() => {
    joinVideoCall();
  }, [
    videoCall,
    audioInput,
    videoInput
  ])

  return (
    <VideoCallContext.Provider
      value={{
        videoInputs,
        audioInputs,
        videoInput,
        audioInput,
        timeValues,
        videoCall,
        videoMaximize,
        videoFullScreen,
        muteVideo,
        muteAudio,
        startTimer,
        stopTimer,
        toggleVideoCall,
        joinVideoCall,
        leaveVideoCall,
        changeVideoInput,
        changeAudioInput,
        toggleMuteVideo,
        toggleMuteAudio,
        toggleVideoMaximize
      }}
    >
      {props.children}
    </VideoCallContext.Provider>
  );
};

export default VideoCallProvider;
