import { BehaviorSubject } from "rxjs";
import { storage } from "../firebase.config"; // Adjust the path if needed
import { getDownloadURL, ref } from "firebase/storage";


export const utility = {
  domain: "Susangam",
  isPublicPath: new BehaviorSubject(false),
  getFullName: (data: any) => {
    const { firstName, middleName, lastName } = data;
    return `${firstName} ${middleName} ${lastName}`;
  },
  getTimeFromDate: (date: any) => {
    const dt = new Date(date);
    const time = dt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    return time;
  },
  getCleanString: (str: string) => {
    return str
      .replace(/[^\w\s,]/g, "")
      .replace(/,+/g, ",")
      .replace(/,\s*$/, "")
      .replace(/\s+/g, " ")
      .trim();
  },
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