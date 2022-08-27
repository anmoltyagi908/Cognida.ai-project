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
import List from "./List.js";
// import { upload } from "@testing-library/user-event/dist/upload.js";

import "./Upload.css";

export default function Upload() {
  const [fileUpload, setfileUpload] = useState(null);
  const [fileUrls, setfileUrls] = useState([]);
  const fileListRef = ref(storage, 'files/');

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `files/${fileUpload.name + v4()}`);
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    const metadata = { createDate: date };
    uploadBytes(fileRef, fileUpload, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setfileUrls((prev) => [
          ...prev,
          { url: url, name: fileRef.name, date: date },
        ]);
        alert("Upload Successfully");
        console.log(snapshot);
      });
    });
  };

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(item)
          const fileRef = ref(storage, `files/${item.name + v4()}`);
          getMetadata(fileRef).then((metadata) => {
            setfileUrls((prev) => [
              ...prev,
              { url: url, name: item.name, date: metadata.createDate },
            ]);
          });
        });
      });
    });
  });
  return (
    <div className="upload">
      <input
        type="file"
        className="inputBox"
        placeholder="hello"
        onChange={(event) => {
          // event.preventDefault();
          setfileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile} className="submitbutton">
        Upload
      </button>

      {fileUrls.map((item) => {
        return (
          <div>
          <li>
            <a href={item.url}>{item.name}</a>
            <p>Date:{item.date}</p>
          </li>
          </div>
        );
      })}
    </div>
  );
}
