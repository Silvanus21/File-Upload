import React from 'react';
import './App.css';
import FileUpload from "./components/FileUpload"

function App() {
  return (
    <div className="container mt-4 App">
      <h4 className="display-4 mb-4 text-center">
      <i className="fab fa-react" /> React File Upload 
      </h4>
      <FileUpload />
    </div>
  );
}

export default App;
