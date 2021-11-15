import React from 'react'
import { useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from './../../hooks/useForm';

export const NoteScreen = () => {

  const {active:note} = useSelector(state => state.notes);
  const [formValues, handleInputChange] = useForm(note);

  const {body, title} = formValues;

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input 
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="what happened today?"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {
          note.url &&
          <div className="notes__image">
            <img 
              src="https://neliosoftware.com/es/wp-content/uploads/sites/3/2018/07/aziz-acharki-549137-unsplash-1200x775.jpg"
              alt="imagen"
            />
          </div>
        }
      </div>

    </div>
  )
}
