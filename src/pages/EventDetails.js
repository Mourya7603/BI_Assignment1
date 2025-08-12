import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await axios.get(
          `https://meet-up-app-beige.vercel.app/events/${id}`
        );
        setEvent(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvent();
  }, [id]);

  if (!event)
    return <p className="text-center my-5">Loading event details...</p>;

  const {
    title,
    date,
    type,
    thumbnail,
    description,
    price,
    venue,
    address,
    dressCode,
    ageRestrictions,
    tags,
    speakers,
    hostedBy = "Organizer",
  } = event;

  const formattedDate = new Date(date).toLocaleString(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <>
      {/* Header with search */}
      <Header search={search} setSearch={setSearch} />

      <main className="container my-5">
        <div className="row gx-5">
          {/* Left column */}
          <section className="col-md-7">
            <h1 className="mb-3">{title}</h1>
            <p className="text-muted mb-4">
              <strong>Hosted by:</strong> {hostedBy}
            </p>

            <img
              src={thumbnail}
              alt={title}
              className="img-fluid rounded mb-4 shadow-sm"
              style={{ maxHeight: "520px", objectFit: "cover", width: "100%" }}
            />

            <article className="mb-5">
              <h4>Event Details</h4>
              <p>{description}</p>
            </article>

            <aside>
              <h5>Additional Information</h5>
              <ul className="list-unstyled">
                {dressCode && (
                  <li className="mb-2">
                    <strong>Dress Code:</strong> {dressCode}
                  </li>
                )}
                {ageRestrictions && (
                  <li className="mb-2">
                    <strong>Age Restrictions:</strong> {ageRestrictions}
                  </li>
                )}
                {tags && tags.length > 0 && (
                  <li>
                    <strong>Tags:</strong>
                    <br />
                    <br />
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "22px",
                          padding: "9px 50px",
                          marginRight: "6px",
                          marginBottom: "6px",
                          fontSize: "0.85rem",
                          display: "inline-block",
                          cursor: "default",
                          userSelect: "none",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </li>
                )}
              </ul>
            </aside>
          </section>

          {/* Right column */}
          <aside className="col-md-5">
            <section className="mb-4 p-4 bg-light rounded shadow-sm">
              <h5 className="mb-3">Event Info</h5>
              <p>
                <strong>Time:</strong> <br />
                {formattedDate}
              </p>
              <p>
                <strong>Place:</strong> <br />
                {venue}, {address}
              </p>
              {price != null && (
                <p>
                  <strong>Cost:</strong> <br />₹{price.toLocaleString()}
                </p>
              )}
              <p>
                <strong>Type:</strong> <br />
                {type}
              </p>
            </section>

            <section className="p-4 bg-light rounded shadow-sm">
              <h5 className="mb-3">Speakers</h5>
              {speakers && speakers.length > 0 ? (
                speakers.map(({ name, role, image }, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-center mb-3"
                    style={{ gap: "1rem" }}
                  >
                    <img
                      src={image}
                      alt={name}
                      className="rounded-circle"
                      style={{ width: 60, height: 60, objectFit: "cover" }}
                    />
                    <div>
                      <p className="mb-0 fw-semibold">{name}</p>
                      <small className="text-muted">{role}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p>No speakers listed.</p>
              )}
            </section>
          </aside>
        </div>
      </main>
    </>
  );
};

export default EventDetails;
