import React, { useState } from "react";
import "./App.css";
import jsPDF from "jspdf";

function App() {
  const [formName, setFormName] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formImages, setFormImages] = useState([]);
  const [formImageName, setFormImageName] = useState("");
  const [formComment, setFormComment] = useState("");
  const [formImageWidth, setFormImageWidth] = useState("");
  const [formImageHeight, setFormImageHeight] = useState("");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      setFormImageName(event.target.files[0].name);
      setFormImage(URL.createObjectURL(event.target.files[0]));
      //new version
      let newImage = { filename: event.target.files[0].name, filewidth: "5px" };
      setFormImages([...formImages, newImage]);
      console.log(formImages[1].filewidth);

    }
  };

  function createPDF(e) {
    e.preventDefault();
    let doc = new jsPDF();
    doc.text(formName, 10, 10);
    doc.text(formDate, 10, 20);
    doc.text(formComment, 10, 30);
    doc.addPage("a4", "0");
    doc.addImage(formImage, 10, 10, formImageWidth, formImageHeight);
    console.log("submitting");
    doc.save("a4.pdf");
  }

  return (
    <div className="App">
      <div className="mainContainer">
        <h2>Konverter dine kvitteringer til PDF</h2>
        <div className="seperatingLine"></div>
        <form onSubmit={createPDF}>
          <div className="formElement">
            <label htmlFor="name">Navn:</label>
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
            <label htmlFor="date">Dato:</label>
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
            <label htmlFor="kommentar">Kommentar:</label>
            <textarea
              value={formComment}
              onChange={(e) => {
                setFormComment(e.target.value);
              }}
              name="kommentar"
              id="kommentar"
            />
          </div>
          <div className="UploadButton">
            <label htmlFor="file">Upload billede</label>
            <input onChange={onImageChange} type="file" id="file" name="file" accept="image/*,.pdf" multiple></input>
          </div>
          <div className="ImageNameList">{formImageName}</div>
          <input className="SaveButton" type="submit" value="Save PDF" />
          {/* <button type="submit">Save PDF</button> */}
        </form>
        <section className="previewSection">
          <h3>Dine informationer:</h3>
          <p>Navn: {formName}</p>
          <p>Dato: {formDate}</p>
          <p>Kommentar: {formComment}</p>

          

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
            alt=""
          />
        </section>
      </div>
    </div>
  );
}

export default App;
