import React, { Fragment, useState } from "react";
import axios from "axios";
import Message from "./Message"
import Progress from "./Progress"

export const FileUpload = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("")
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress : progressEvent => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))

          setTimeout(() => setUploadPercentage(0), 10000)
        }
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded")

    } catch (error) {
      if (error.response.status === 500) {
        setMessage("There was a problem with server.");
      } else {
        setMessage(error.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message && <Message msg={message}/>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={handleChange}
          />
          <label className="custom-file-label" for="customFile">
            {fileName}
          </label>
        </div>

        <Progress percentage={uploadPercentage}/>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile && (
        <div className="row mt-5">
          <div className="col-md-6 m-auto text-center">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              className="mt-4 mb-4"
              style={{ width: "70%" }}
              src={uploadedFile.filePath}
              alt=""
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FileUpload;
