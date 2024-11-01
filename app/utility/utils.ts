import { BehaviorSubject } from "rxjs";
import { storage } from "../firebase.config"; // Adjust the path if needed
import { getDownloadURL, ref } from "firebase/storage";


export const utility = {
  domain: "Susangam",
  isPublicPath: new BehaviorSubject(false),
  getVideoUrl: async (videoPath: string) => {
    try {
      const videoRef = ref(storage, videoPath);
      const url = await getDownloadURL(videoRef);
      return url;
    } catch (error) {
      console.log("error while retrieving video: ", error);
      return null;
    }
  }
};