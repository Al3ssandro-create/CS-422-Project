import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import Box from "./Box";
import CourseCard from "./CourseCard";
import { SearchIcon } from "../icons/SearchIcon";

// good for both the course search and frineds search
const getCourses = async (): Promise<Class[]> => {
  console.log("get courses");
  return [
    {
      id: 1,
      name: "course 1",
      teacher: "teacher 1",
      semester: "Fall 2023",
    },
    {
      id: 2,
      name: "coruse 2",
      teacher: "teacher 2",
      semester: "Fall 2023",
    },
  ];
};

function SearchList() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Class[]>([]);

  useEffect(() => {
    const searchCourses = async () => {
      const courses = await getCourses();
      setResults(courses);
    };

    searchCourses();
  }, [search]);

  return (
    <>
      <div style={{marginTop: "1%", marginBottom: "1%"}}>
      <Input
        type="text"
        fullWidth={true}
        radius="full"
        placeholder="The course"
        startContent={<SearchIcon/>}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value.trimStart());
        }}
      />
      </div>
      <Box>
        {results.map((course: Class) => (
          <CourseCard course={course} />
        ))}
      </Box>
    </>
  );
}

export default SearchList;
