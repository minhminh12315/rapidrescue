import { createContext } from "react";

const VideoContext = createContext({
  videos: [],
  setVideos: () => {},
});

export default VideoContext;
