import React from "react";

const Header = ({ search, setSearch }) => {
  return (
    <header
      className="d-flex justify-content-between align-items-center p-3 border-bottom container"
      style={{ width: "100vw", boxSizing: "border-box" }}
    >
      {/* Left: Logo on far left edge */}
      <div style={{ flexShrink: 0 }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubs8OoTGktOH5FyiIUnK_oSH0sSDr5hC0Sg&s"
          alt="Meetup Logo"
          style={{ height: 100, display: "block" }}
        />
      </div>

      {/* Right: Search on far right edge */}
      <div style={{ minWidth: 250 }}>
        <input
          type="search"
          placeholder="Search by title or tag"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          style={{ maxWidth: "300px" }}
        />
      </div>
    </header>
  );
};

export default Header;
