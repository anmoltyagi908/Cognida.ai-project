import React from 'react'
import './list.css'
export default function List({data}) {

  const [fileUrls, setfileUrls] = useState([]);
  const fileListRef = ref(storage, "files/");

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `files/${fileUpload.name}`);
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    const metadata = { createdDate: date };
    console.log("INSIDE_UPLOAD");
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
      <input
        type="file"
        className="inputBox"
        placeholder="fileName"
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
              <p>Date: {item.date}</p>
            </li>
          </div>
        );
      })}
    </div>
  );
}
