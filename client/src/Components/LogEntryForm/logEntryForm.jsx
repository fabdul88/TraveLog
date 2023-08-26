import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './logEntryForm.scss';
import { createLogEntry } from '../ReactMap/api';
import { motion } from 'framer-motion';

const LogEntryForm = ({ location, onClose }) => {
  const transition = {
    duration: 0.8,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);
      onClose();
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw new Error(error);
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
        <div className="entry-form-container__form-API-container">
          <label htmlFor="apiKey">Authorization Code</label>
          <input
            className="entry-form-container__API-input"
            type="password"
            name="apiKey"
            required
            placeholder="Authorization code here..."
            {...register('apiKey', { required: true })}
          />
        </div>
        <div className="entry-form-container__form-title-container">
          <label htmlFor="title">Title</label>
          <input
            className="entry-form-container__title-input"
            name="title"
            required
            placeholder="Travel Location"
            {...register('title')}
          />
        </div>
        <div className="entry-form-container__form-description-container">
          <label htmlFor="description">Description</label>
          <textarea
            className="entry-form-container__description-textarea"
            name="description"
            rows={3}
            placeholder="Description of the Location"
            {...register('description')}
          ></textarea>
        </div>
        <div className="entry-form-container__form-comments-container">
          <label htmlFor="comments">Comments</label>
          <textarea
            className="entry-form-container__comments-textarea"
            name="comments"
            rows={3}
            placeholder="Type comment here..."
            {...register('comments')}
          ></textarea>
        </div>
        <div className="entry-form-container__form-image-container">
          <label htmlFor="image">Image</label>
          <input
            className="entry-form-container__image-input"
            name="image"
            placeholder="Place image here..."
            {...register('image')}
          />
        </div>
        <div className="entry-form-container__form-image-container">
          <label htmlFor="rating">Rating</label>
          <input
            className="entry-form-container__image-input"
            name="rating"
            placeholder="Rating out of 10"
            {...register('rating')}
          />
        </div>
        <div className="entry-form-container__form-visit-container">
          <label htmlFor="visitDate">Visit Date</label>
          <input
            className="entry-form-container__visitdate-input"
            name="visitDate"
            type="date"
            required
            {...register('visitDate')}
          />
        </div>
        <div className="entry-form-container__button-container">
          <motion.button
            className="entry-form-container__button"
            disabled={loading}
            initial={{ opacity: 0, x: '-10vw' }}
            animate={{ opacity: 1, x: '0' }}
            exit={{ opacity: 0, x: '-10vw' }}
            transition={transition}
          >
            {loading ? 'Loading...' : 'create Log Entry !'}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default LogEntryForm;
