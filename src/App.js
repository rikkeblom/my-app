import React, { useState } from "react";
import "./App.css";
import jsPDF from "jspdf";

function App() {
  const [formName, setFormName] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formImageWidth, setFormImageWidth] = useState("");
  const [formImageHeight, setFormImageHeight] = useState("");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      setFormImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  function createPDF(e) {
    e.preventDefault();
    let doc = new jsPDF();
    doc.text(formName, 10, 10);
    doc.text(formDate, 10, 20);
    doc.addImage(formImage, 10, 30, formImageWidth, formImageHeight);
    console.log("submitting");
    doc.save("a4.pdf");
  }

  return (
    <div className="App">
      <h2>This is a form</h2>
      <form onSubmit={createPDF}>
        <div className="formElement">
          <label htmlFor="name">Name:</label>
          <input
            value={formName}
            onChange={(e) => {
              setFormName(e.target.value);
            }}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="formElement">
          <label htmlFor="date">Date of reciept:</label>
          <input
            value={formDate}
            onChange={(e) => {
              setFormDate(e.target.value);
            }}
            type="date"
            name="date"
            id="date"
          />
        </div>
        <div className="formElement">
          <label htmlFor="file">Upload image of reciept:</label>
          <input onChange={onImageChange} type="file" id="file" name="file" accept="image/*,.pdf"></input>
        </div>
        <input type="submit" value="Save PDF" />
        {/* <button type="submit">Save PDF</button> */}
      </form>

      <h3>Your information:</h3>
      <p>Name: {formName}</p>
      <p>Date: {formDate}</p>
      <img
        onLoad={(e) => {
          if (e.target.width > 150) {
            let ratio = e.target.width / 150;
            let newHeight = e.target.height / ratio;
            let newWidth = e.target.width / ratio;
            setFormImageWidth(newWidth);
            setFormImageHeight(newHeight);
            console.log("adjusted for width: " + newWidth + "/" + newHeight);
            if (newHeight > 250) {
              let ratio = e.target.height / 250;
              let newHeight = e.target.height / ratio;
              let newWidth = e.target.width / ratio;
              setFormImageWidth(newWidth);
              setFormImageHeight(newHeight);
              console.log("adjusted for height: " + newWidth + "/" + newHeight);
            }
          } else {
            setFormImageWidth(e.target.width);
            setFormImageHeight(e.target.height);
          }
        }}
        src={formImage}
        alt="Your uploaded image"
      />
    </div>
  );
}

export default App;
