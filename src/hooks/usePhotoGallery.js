import {
  Camera,
  CameraSource,
} from "@capacitor/camera";
import { useState } from "react";

export function usePhotoGallery() {
  const [blobUrl, setBlobUrl] = useState();

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        source: CameraSource.Photos,
      });
      setBlobUrl(photo.webPath);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    takePhoto,
    blobUrl,
  };
}
