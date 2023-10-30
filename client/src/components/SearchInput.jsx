import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = ({ onSearch}) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="relative">
      <input
        className="w-[205px] md:w-[300px] lg:w-[690px] h-[24px] lg:h-[40px] bg-white rounded-full py-2 text-[10px] lg:text-[16px] pr-6 pl-4 lg:pr-10 focus:outline-none"
        type="text"
        placeholder="How to install mods"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <FiSearch
        className="absolute top-[13px] lg:top-[20px] right-[10px] -translate-y-[50%] w-[12px] h-[12px] lg:w-[20px] lg:h-[20px] cursor-pointer"
        color="#757575"
        onClick={() => onSearch(searchText)}
      />
    </div>
  );
};

export default SearchInput;
