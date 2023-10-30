import React, { useEffect, useState, useRef } from "react";
import SearchInput from "./SearchInput";
import { FiMenu } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../features/sideBarSlice";
import { setText } from "../features/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { deleteCookie } from "../functions/cookies";
import logo from "../assets/wise_logo.svg";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useSelector((state) => state.search.text);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const onSearch = (text) => {
    if (text.trim() !== "") {
      dispatch(setText(text));
      navigate("/results");
    } else {
      console.log("not good");
    }
  };

  const logout = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 flex w-full h-[50px] lg:h-[70px] justify-center bg-secondary items-center shadow-topBar z-[1000]">
      <FiMenu
        onClick={() => dispatch(toggleSideBar())}
        className="w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] xl:hidden md:left-[53px] left-[26px] absolute"
        color="white"
      />
      <img
        onClick={() => navigate("/results")}
        src={logo}
        className="hidden xl:block absolute left-[75px] cursor-pointer"
        alt="logo"
      />
      <SearchInput onSearch={onSearch} />
      <div
        className="absolute md:right-[53px] right-[26px]"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}>
        <VscAccount
          color="white"
          className="h-[24px] w-[24px] lg:w-[30px] lg:h-[30px] xl:w-[40px] xl:h-[40px]"
          alt=""
        />
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute md:right-[-40px] right-[-23px] top-[23px] lg:top-[40px] md:w-[125px] w-[80px] rounded-lg shadow-lg bg-[#fff]">
            <Link to="/profile">
              <div
                onClick={() => setIsOpen(false)}
                className="w-full h-[50px] p-4 border-b cursor-pointer hover:bg-menu hover:text-[#fff] rounded-t-lg">
                Profile
              </div>
            </Link>
            <div
              onClick={() => logout()}
              className="w-full h-[50px] p-4 cursor-pointer hover:bg-menu hover:text-[#fff] rounded-b-lg">
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
