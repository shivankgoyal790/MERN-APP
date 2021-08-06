import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./Imageupload.css"
const Imageupload = (props) =>{
    const [newfile, setnewfile] = useState();
    const [previewurl , seturl] = useState();
    const filePickerRef = useRef();
    
    
    const pickedHandler = (event) =>{
      const filepicked = event.target.files[0];  
      setnewfile(filepicked);
       props.oninput(filepicked);

    }

    useEffect(() => {
      if (!newfile) {
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
        seturl(fileReader.result);
      };
      fileReader.readAsDataURL(newfile);
    }, [newfile]);
  
    const pickImageHandler = () => {
      filePickerRef.current.click();
    };
    return(
        // <div>
        //     <input type = "file" style={{display:"none"}} />
        //     <button type="submit" onSubmit={filepicker}>Choose File</button>
        // </div>
        <div>
        <label htmlFor="fileinput"></label>
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: 'none' }}
          type="file"
          name="fileinput"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && 'center'}`}>
          <div className="image-preview" style={{borderRadius:props.circle }}> 
            <img src={previewurl} alt="Preview" style={{borderRadius:props.circle }}/>
          </div>
          <center><button type="button" onClick={pickImageHandler} className="uploadbtn">PICK IMAGE</button></center>
        </div>
      </div>
    );
}
export default Imageupload