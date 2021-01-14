import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./logEntryForm.scss";
import { createLogEntry } from "../ReactMap/api";

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="entry-form-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="entry-form-container__form"
      >
        <div className="entry-form-container__error">
          {error ? <h3>{error}</h3> : null}
        </div>
        <div className="entry-form-container__form-title-container">
          <label htmlFor="title">Title</label>
          <input
            className="entry-form-container__title-input"
            name="title"
            required
            placeholder="Travel Location"
            ref={register}
          />
        </div>
        <div className="entry-form-container__form-description-container">
          <label htmlFor="description">Description</label>
          <textarea
            className="entry-form-container__description-textarea"
            name="description"
            rows={3}
            placeholder="Description of the Location"
            ref={register}
          ></textarea>
        </div>
        <div className="entry-form-container__form-comments-container">
          <label htmlFor="comments">Comments</label>
          <textarea
            className="entry-form-container__comments-textarea"
            name="comments"
            rows={3}
            placeholder="Type comment here..."
            ref={register}
          ></textarea>
        </div>
        <div className="entry-form-container__form-image-container">
          <label htmlFor="image">Image</label>
          <input
            className="entry-form-container__image-input"
            name="image"
            placeholder="Place image here..."
            ref={register}
          />
        </div>
        <div className="entry-form-container__form-visit-container">
          <label htmlFor="visitDate">Visit Date</label>
          <input
            className="entry-form-container__visitdate-input"
            name="visitDate"
            type="date"
            required
            ref={register}
          />
        </div>
        <div className="entry-form-container__button-container">
          <button className="entry-form-container__button" disabled={loading}>
            {loading ? "Loading..." : "create Log Entry !"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogEntryForm;
