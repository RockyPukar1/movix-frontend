import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./style.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {

    }
  }

  return (
    <div className="heroBanner">
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">Million of movies, TV shows and people to discover. Explore now.</span>
          <div className="searchInput">
            <input
              onChange={() => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              type="text"
              placeholder="Search for a movie or tv show..." />
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner