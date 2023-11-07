import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import Box from "./Box";
import CourseCard from "./CourseCard";
import { SearchIcon } from "@primer/octicons-react";
import { DisplayClass } from "../types/types";
import { getSearchCourses } from "../api/server";

function SearchList() {
  const [search, setSearch] = useState("");
  const [searchId, setId] = useState(0);
  const [results, setResults] = useState<DisplayClass[]>([]);

  useEffect(() => {
    const searchCourses = async () => {
      if (search == "") return 
      const { res, id } = await getSearchCourses(search, searchId);

      if (id == searchId) {
        setResults(res);
      }
    };

    searchCourses();
  }, [search, searchId]);

  return (
    <>
      <div style={{ marginTop: "4%", marginBottom: "4%", width: "100%" }}>
        <Input
          type="text"
          fullWidth
          radius="full"
          placeholder="The course or teacher"
          startContent={<SearchIcon size={24}/>}
          value={search}
          onChange={(e) => {
            setId(searchId + 1);
            setSearch(e.target.value.trimStart());
          }}
        />
      </div>
      <Box>
        {results.map((course: DisplayClass) => (
          <div key={course.name} style={{width: "100%"}}>
            <CourseCard course={course} />
          </div>
        ))}
      </Box>
    </>
  );
}

export default SearchList;