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
import { upload } from "@testing-library/user-event/dist/upload.js";

export default function Upload() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const imageListRef = ref(storage, "images/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name }`);
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

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          const imageRef = ref(storage, `images/${item.name + v4()}`);
          getMetadata(imageRef).then((metadata) => {
            setImageUrls((prev) => [...prev, {url:url,name:item.name, date:metadata.createDate}]);
          })
        })
      })
    })
  })
  return <div className="upload">
    <input type="file" onChange={(event) => {
      event.preventDefault();
      setImageUpload(event.target.files[0]);
    }}/>
    <button onClick={uploadFile}>Upload</button>
    {imageUrls.map((item) => {
      return   <div> <li>
      
          <a href={item.url}>{item.name}</a>
          <p>Date:{item.date }</p>
       
      </li>
      </div>
    })}
  </div>;
}
