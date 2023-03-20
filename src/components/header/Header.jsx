import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {}, [query, navigate])
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])
  
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      setQuery("");
      setShowSearch(false);
    }
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY)
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  
  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };
  
  const openMobileMenu = () => {
    setShowSearch(false);
    setMobileMenu(true);
  };
  
  return (
    <header className={`header${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem" onClick={openSearch} ><HiOutlineSearch /></li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {
            mobileMenu ? (
              <VscChromeClose onClick={()=>setMobileMenu(false)} />
              ) : (
                <SlMenu onClick={openMobileMenu} />
                )
          }
        </div>
      </ContentWrapper>
      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyUp={searchQueryHandler}
              type="text"
              placeholder="Search for a movie or tv show..." />
            <button onClick={searchQueryHandler}>Search</button>
          </div>
          <VscChromeClose onClick={()=>setShowSearch(false)} />
        </ContentWrapper>
      </div>}
    </header>
  );
};

export default Header;
