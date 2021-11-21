import { FormControl, Input, InputAdornment } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";

const SearchField = ({ value, onChange }) => {
  return (
    <FormControl className="search-field">
      <Input
        id="standard-adornment-weight"
        placeholder="Tìm kiếm tại đây..."
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon color="action" />
          </InputAdornment>
        }
        aria-describedby="standard-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
        }}
      />
    </FormControl>
  );
};
export default SearchField;
