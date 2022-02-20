import { FormControl, Input, InputAdornment } from "@material-ui/core";
import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { useState } from "react";

const SearchField = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  return (
    <FormControl className="search-field">
      <Input
        id="standard-adornment-weight"
        placeholder="Tìm kiếm tại đây..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onSubmit(value);
          }
        }}
        endAdornment={
          <InputAdornment position="end">
            {value && (
              <CancelIcon
                style={{ cursor: "pointer" }}
                color="action"
                onClick={() => {
                  onSubmit("");
                  setValue("");
                }}
              />
            )}
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
