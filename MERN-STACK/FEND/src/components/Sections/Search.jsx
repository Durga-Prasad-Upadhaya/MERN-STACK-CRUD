import { TextField } from "@mui/material";
import React from "react";

export const Search = ({ query, setQuery,setPage}) => {
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1)
  };

  return (
    <>
      <TextField
        className="m-3"
        size="small"
        label="Search"
        value={query}
        onChange={handleSearch}
      />
    </>
  );
};


