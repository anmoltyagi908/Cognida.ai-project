import React from "react";
import Header from "./header.js";
import { useState, useEffect} from "react";
import {ref, UploadBytes, getDownloadURL, getMetadata, listAll, list} from "firebase/storage";
import {storage} from "./firebase";
import {v4} from 'uuid';

export default function Upload() {

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const imageListRef = ref(storage, "images/");

  const uploadFile = () => {
    if(imageUpload==null) return;
    const imageRef = ref(storage,)
  }
  return <div>
    
    </div>;
}
