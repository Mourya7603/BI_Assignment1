import React from "react";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="card mb-3 shadow-sm">
      <img src={event.thumbnail} className="card-img-top" alt={event.title} />
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">
          <small className="text-muted">
            {new Date(event.date).toLocaleString()} | {event.type}
          </small>
        </p>
        <Link to={`/events/${event._id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
