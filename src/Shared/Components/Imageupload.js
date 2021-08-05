import React from "react";
import { useRef } from "react";
import "./Imageupload.css"
const Imageupload = (props) =>{
    const filePickerRef = useRef();
    const pickedHandler = () =>{

    }
  
    const pickImageHandler = () => {
      filePickerRef.current.click();
    };
    return(
        // <div>
        //     <input type = "file" style={{display:"none"}} />
        //     <button type="submit" onSubmit={filepicker}>Choose File</button>
        // </div>
        <div>
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: 'none' }}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && 'center'}`}>
          <div className="image-preview"> 
            <img src="" alt="Preview" />
          </div>
          <center><button type="button" onClick={pickImageHandler} className="uploadbtn">PICK IMAGE</button></center>
        </div>
      </div>
    );
}
export default Imageupload