import { useState } from "react";
import { Input } from "@nextui-org/react";
import Box from "./Box";
import CourseCard from "./CourseCard";
import { SearchIcon } from "@primer/octicons-react";
import { Class } from "../types/types";
import { getSearchCourses } from "../api/server";

function SearchList() {
  const [search, setSearch] = useState("");
  const [searchId, setId] = useState(0);
  const [results, setResults] = useState<Class[]>([]);

  const searchCourses = async (query: string, sid: number) => {
    if (query === "") {
      setResults([]);
    }
    else {
      const { res, id } = await getSearchCourses("CS", query, sid);

      if (id === sid) {
        console.log(res);
        setResults(res);
      }
    }
  };

  return (
    <>
      <div style={{ marginTop: "4%", marginBottom: "4%", width: "100%" }}>
        <Input
          type="text"
          fullWidth
          radius="full"
          placeholder="The course or teacher"
          startContent={<SearchIcon size={24} />}
          value={search}
          onChange={(e) => {
            searchCourses(e.target.value.trim(), searchId + 1);

            setId(searchId + 1);
            setSearch(e.target.value.trim());
          }}
        />
      </div>
      <Box>
        {results.map((course: Class) => {
          return (
            <>
            <div key={course.name + course.teacher} style={{ width: "100%" }}>
              <CourseCard course={course} />
            </div></>
        )})}
      </Box>
    </>
  );
}

export default SearchList;
