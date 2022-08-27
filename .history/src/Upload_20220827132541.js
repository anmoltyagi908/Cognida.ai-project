import React from "react";
import Header from "./header.js";
import { useState, useEffect } from "react";
import {
  ref,
  UploadBytes,
  getDownloadURL,
  getMetadata,
  listAll,
  list,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

export default function Upload() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const imageListRef = ref(storage, "images/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const current = new Date();
    const date = `${current.getDate()}-${
      current.getMonth() + 1
    }-${current.getFullYear()}`;
    const metadata = { cretaeDate: date };
    uploadBytes(imageRef, imageUpload, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [
          ...prev,
          { url: url, name: imageRef.name, date: date },
        ]);
        console.log(snapshot);
      });
    });
  };
  return <div></div>;
}
