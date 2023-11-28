import { useState } from "react";
import { Input } from "@nextui-org/react";
import Box from "./Box";
import CourseCard from "./CourseCard";
// import { SearchIcon } from "@primer/octicons-react";
import { getSearchCourses } from "../api/server";
import { db_Class_search } from "../types/backend";
import DeptSelect from "./DepartmentSelect";

function SearchList() {
  const [search, setSearch] = useState("");
  const [searchId, setId] = useState(0);
  const [dept, setDept] = useState("ALL");
  const [results, setResults] = useState<db_Class_search[]>([]);

  const searchCourses = async (query: string, sid: number) => {
    if (query === "") {
      setResults([]);
    } else {
      const { res, id } = await getSearchCourses(dept, query, sid);

      console.log(id, searchId);
      if (id === searchId + 1) {
        console.log(res);
        setResults(res);
      }
    }
  };

  return (
    <>
      <div
        style={{
          marginTop: "4%",
          marginBottom: "4%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <DeptSelect value={dept} setValue={setDept} /> */}
        <Input
          type="text"
          fullWidth
          radius="full"
          placeholder="The course or teacher"
          // startContent={<SearchIcon size={24} />}
          // startContent={<DeptSelectBase value={dept} setValue={setDept} />}
          startContent={<DeptSelect value={dept} setValue={setDept} />}
          value={search}
          onChange={(e) => {
            const value = e.target.value.trimStart();
            const id = searchId + 1;

            searchCourses(value, id);

            setId(id);
            setSearch(value);
          }}
        />
      </div>
      <Box>
        {results.map((course: db_Class_search) => {
          return (
            <>
              <div
                key={course.name + course.instructor}
                style={{ width: "100%" }}
              >
                <CourseCard course={course} />
              </div>
            </>
          );
        })}
      </Box>
    </>
  );
}

export default SearchList;
