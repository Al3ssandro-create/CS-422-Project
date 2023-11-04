import React from "react";
import {Input} from "@nextui-org/react";
import Box from "./Box";

// good for both the course search and frineds search

function SearchList() {

  return (
    <>
      <Input
          type="text"
          fullWidth={true}
          radius="full"
          placeholder="The course"
          startContent={<>@</>}
          onChange={(e) => {
            const value = e.target.value.trim()

            if (value !== "")
             console.log(value)}}
        />
      <Box>
        <h2>course card</h2>
      </Box>
    </>
  );
}

export default SearchList;
