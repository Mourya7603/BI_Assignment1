import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import Header from "../components/Header";

function EventList() {
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("Both");
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "https://meet-up-app-beige.vercel.app/events",
        {
          params: { type: eventType, search },
        }
      );
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [eventType, search]);

  return (
    <>
      <Header search={search} setSearch={setSearch} />

      <div className="container mt-4">
        {/* Title and filter on the same line */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 style={{ margin: 0 }}>Meetup Events</h2>

          <select
            className="form-select"
            style={{ width: "150px" }}
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="Both">Both</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        {/* Event cards grid */}
        <div className="row">
          {events.length ? (
            events.map((event) => (
              <div key={event._id} className="col-md-4 mb-3">
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default EventList;
