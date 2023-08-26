import { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { useForm } from 'react-hook-form';
import { editLogEntry } from '../ReactMap/api';
import MapPin from '../../assets/icons/map-pin1.svg';
import './logEntry.scss';
import Modal from '../Modal/Modal';
import { date2str } from '../../helpers/date2str';

const LogEntry = ({
  logEntries,
  showPopup,
  setShowPopup,
  viewport,
  onClose,
}) => {
  const { register, handleSubmit } = useForm();
  const [openInputEdit, setOpenInputEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setOpenInputEdit(false);

    try {
      await editLogEntry(data);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {logEntries?.map((entry) => (
        <div className="logEntry" key={entry._id}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Marker latitude={entry.latitude} longitude={entry.longitude}>
              <div
                onClick={() => {
                  setShowPopup({
                    [entry?._id]: true,
                  });
                }}
              >
                <img
                  className="logEntry__map-pin"
                  style={{
                    width: `${4 * viewport.zoom}px`,
                    height: `${4 * viewport.zoom}px`,
                  }}
                  src={MapPin}
                  alt="Map Pin"
                />
              </div>
            </Marker>
            {showPopup[entry?._id] ? (
              <Popup
                className="logEntry__map-popup"
                latitude={entry.latitude}
                longitude={entry.longitude}
                dynamicPosition={true}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div className="logEntry__map-popup-info-container">
                  {openInputEdit ? (
                    <div>
                      <div className="entry-form-container__error">
                        {error ? <h3>{error}</h3> : null}
                      </div>
                      <div className="entry-form-container__form-API-container">
                        {openInputEdit ? null : (
                          <>
                            <label htmlFor="apiKey">Authorization Code</label>
                            <input
                              className="entry-form-container__API-input"
                              type="password"
                              name="apiKey"
                              required
                              placeholder="Authorization code here..."
                              {...register('apiKey', { required: true })}
                            />
                          </>
                        )}
                        <div>
                          <input
                            type="text"
                            name="_id"
                            hidden
                            {...register('_id', { value: entry._id })}
                          />
                          <input
                            readOnly
                            type="number"
                            name="longitude"
                            {...register('longitude', {
                              value: entry.longitude,
                            })}
                          />
                          <input
                            readOnly
                            type="number"
                            name="latitude"
                            {...register('latitude', { value: entry.latitude })}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {openInputEdit ? (
                    <div>
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        name="title"
                        {...register('title', {
                          value: entry.title,
                          onChange: (e) => e.target.value,
                        })}
                      />
                    </div>
                  ) : (
                    <h3 className="logEntry__map-popup-info-heading">
                      {entry.title}
                    </h3>
                  )}
                  <hr className="logEntry__map-popup-hr" />
                  {openInputEdit ? (
                    <div>
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        {...register('description', {
                          value: entry.description,
                          onChange: (e) => e.target.value,
                        })}
                      />
                    </div>
                  ) : (
                    <p className="logEntry__map-popup-info-description">
                      {entry.description}
                    </p>
                  )}
                  <hr className="logEntry__map-popup-hr" />
                  {openInputEdit ? (
                    <div>
                      <label htmlFor="comments">Comments</label>
                      <input
                        type="text"
                        {...register('comments', {
                          value: entry.comments,
                          onChange: (e) => e.target.value,
                        })}
                      />
                    </div>
                  ) : (
                    <p className="logEntry__map-popup-info-comment">
                      {entry.comments}
                    </p>
                  )}
                  <div className="logEntry__map-popup-info-image-container">
                    {openInputEdit ? (
                      <div>
                        <label htmlFor="image">Image</label>
                        <input
                          type="text"
                          {...register('image', {
                            value: entry.image,
                            onChange: (e) => e.target.value,
                          })}
                        />
                      </div>
                    ) : (
                      entry.image && (
                        <img
                          className="logEntry__map-popup-info-image"
                          src={entry.image}
                          alt={entry.title}
                        />
                      )
                    )}
                  </div>

                  <div>
                    {openInputEdit ? (
                      <div>
                        <label htmlFor="rating">Rating</label>
                        <input
                          className="entry-form-container__API-input"
                          type="number"
                          name="rating"
                          required
                          placeholder="Authorization code here..."
                          {...register('rating', {
                            value: entry.rating,
                            onChange: (e) => e.target.value,
                          })}
                        />
                      </div>
                    ) : (
                      <p className="logEntry__map-popup-info-comment">
                        Rating: {entry.rating}/10
                      </p>
                    )}
                  </div>

                  {openInputEdit ? (
                    <div>
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        {...register('visitDate', {
                          value: date2str(
                            new Date(entry.visitDate),
                            'yyyy-MM-dd'
                          ),
                          onChange: (e) => e.target.value,
                        })}
                      />
                    </div>
                  ) : (
                    <small className="logEntry__map-popup-info-visited">
                      Visited on:{' '}
                      {new Date(entry.visitDate).toLocaleDateString()}
                    </small>
                  )}
                  <div>
                    <button
                      disabled={openInputEdit ? true : false}
                      onClick={(e) => {
                        e.preventDefault();
                        setModal(true);
                      }}
                    >
                      Delete entry
                    </button>
                    {!openInputEdit && (
                      <button
                        disabled={modal ? true : false}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenInputEdit(true);
                        }}
                      >
                        edit entry
                      </button>
                    )}
                    {openInputEdit && (
                      <button type="submit" disabled={modal ? true : false}>
                        save entry
                      </button>
                    )}
                  </div>
                </div>
                {modal ? (
                  <Modal entry={entry} setModal={setModal} onClose={onClose} />
                ) : null}
              </Popup>
            ) : null}
          </form>
        </div>
      ))}
    </>
  );
};

export default LogEntry;
