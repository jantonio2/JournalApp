import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const inputArchivo = useRef(null);
  const {active} = useSelector(state => state.notes);
  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handlePictureUpload = () => {
    console.log("picture");
    inputArchivo.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      dispatch(startUploading(file));
      inputArchivo.current.value = '';
    }
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2021</span>

      <input 
        type="file"
        name="file"
        ref={inputArchivo}
        style= {{display: 'none'}}
        onChange={handleFileChange}
      />

      <div>
        <button 
          className="btn"
          onClick={handlePictureUpload}
        >
          Picture
        </button>
        
        <button 
          className="btn"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
