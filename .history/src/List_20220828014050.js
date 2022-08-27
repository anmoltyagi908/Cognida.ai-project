import React from 'react'
import './list.css'
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

export default function List({data}) {

  const [fileUrls, setfileUrls] = useState([]);
  const fileListRef = ref(storage, "files/");

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(item);
          const fileRef = ref(storage, `files/${item.name}`);
          getMetadata(fileRef).then((metadata) => {
            setfileUrls((prev) => [
              ...prev,
              { url: url, name: item.name, date: metadata.createdDate },
            ]);
          });
        });
      });
    });
  }, []);

  return (
    <div className="upload">
      {fileUrls.map((item) => {
        return (
          <div>
            <li>
              <a href={item.url}>{item.name}</a>
              <p>Date: {item.date}</p>
            </li>
          </div>
        );
      })}
    </div>
  );
}
