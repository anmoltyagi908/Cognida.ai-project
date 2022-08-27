import React from "react";
import "./list.css";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, getMetadata, listAll } from "firebase/storage";
import { storage } from "./firebase";
import 

export default function List({ data }) {
  const [fileUrls, setfileUrls] = useState([]);
  const fileListRef = ref(storage, "files/");

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(item);
          const fileRef = ref(storage, `files/${item.name}`);
          getMetadata(fileRef).then((metadata) => {
            console.log("METADATA : ", metadata);
            setfileUrls((prev) => [
              ...prev,
              { url: url, name: item.name, date: metadata.timeCreated },
            ]);
          });
        });
      });
    });
  }, []);

  return (
    <div className="upload">
      <table>
        <tr>
          <th className="nameHeader">Name</th>
          <th className="timeHeader">Time Created</th>
        </tr>
        {fileUrls.map((item) => {
          return (
            <tr>
              <td>
                <a href={item.url}>{item.name}</a>
              </td>
              <td>
                <p>Date: {item.date}</p>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
