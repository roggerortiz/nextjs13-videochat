import AgoraRTC from 'agora-rtc-sdk-ng';
import { AGORA_RTC_APP_ID, AGORA_RTC_CHANNEL, AGORA_RTC_TOKEN } from '../env';
import { getRandomNumber } from '../utils';

const getDevices = async () => {
  const devices = await AgoraRTC.getDevices();
  const audioInputs = devices.filter((item) => item.kind === 'audioinput');
  const videoInputs = devices.filter((item) => item.kind === 'videoinput');

  return {
    audioInputs,
    videoInputs
  }
}

const getClient = (joined) => {
  if (joined) {
    return;
  }

  return AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8"
  });
}

const join = async (client, { videoId, audioId, onUserPublished, onUserUnpublished }) => {
  try {
    if (client.connectionState === 'CONNECTED') {
      return;
    }

    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      console.log("subscribe success");

      if (mediaType == "video") {
        const remotePlayer = document.querySelector('#remotePlayer');
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack?.play(remotePlayer);

        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack?.play();

        onUserPublished({
          remoteVideoTrack,
          remoteAudioTrack
        });
      }

      if (mediaType == "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack?.play();

        onUserPublished({
          remoteVideoTrack: null,
          remoteAudioTrack
        });
      }

      client.on("user-unpublished", user => {
        console.log(user.uid + "has left the channel");
        onUserUnpublished();
      });
    });

    const uid = getRandomNumber();
    await client.join(AGORA_RTC_APP_ID, AGORA_RTC_CHANNEL, AGORA_RTC_TOKEN, uid);

    const localPlayer = document.querySelector('#localPlayer');
    const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await localVideoTrack.setDevice(videoId);

    const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await localAudioTrack.setDevice(audioId);

    await client.publish([localAudioTrack, localVideoTrack]);
    console.log("publish success!");

    localVideoTrack.play(localPlayer);
    localAudioTrack.play();

    return {
      localVideoTrack,
      localAudioTrack
    }
  }
  catch {
    return {
      localVideoTrack: null,
      localAudioTrack: null
    }
  }
}

const leave = async (client, { localVideoTrack, localAudioTrack, remoteVideoTrack, remoteAudioTrack }) => {
  try {
    closeTrack(localVideoTrack);
    closeTrack(localAudioTrack);

    closeTrack(remoteVideoTrack);
    closeTrack(remoteAudioTrack);

    await client.leave();
    console.log("You left the channel");
  }
  catch { }
}

const closeTrack = (track) => {
  try {
    if (!track) {
      return;
    }

    if (track.isPlaying) {
      track.stop();
    }

    track.close();
  }
  catch { }
}

export const agoraVideoCall = {
  join,
  leave,
  getClient,
  getDevices,
}