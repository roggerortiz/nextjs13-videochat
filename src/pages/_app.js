import Head from "next/head";
import dynamic from "next/dynamic";
import Loader from "@/containers/loader";
import { ToastContainer } from "react-toastify";
import '@/styles/color.scss'

const ChatProvider = dynamic(import('@/helpers/context/chatContext/chatCtx'), { ssr: false });
const VideoCallProvider = dynamic(import('@/helpers/context/videoCallContext/videoCallCtx'), { ssr: false });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="sonar video chat" />
        <meta name="keywords" content="sonar video chat" />
        <meta name="author" content="sonar video chat" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <title>Video Chat</title>
      </Head>

      <ChatProvider>
        <VideoCallProvider>
          <Loader />
          <Component {...pageProps} />
        </VideoCallProvider>
      </ChatProvider>

      <ToastContainer />
    </>
  )
}
