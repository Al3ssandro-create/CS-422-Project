import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import Box from "./Box";
import CourseCard from "./CourseCard";
import { SearchIcon } from "../icons/SearchIcon";
import { Class } from "../types/types";

const res = [
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
  {
    id: 3,
    name: "course 3",
    teacher: "teacher 3",
    semester: "Fall 2023",
  },
  {
    id: 4,
    name: "course 4",
    teacher: "teacher 4",
    semester: "Fall 2023",
  },
  {
    id: 5,
    name: "course 5",
    teacher: "teacher 5",
    semester: "Fall 2023",
  },
];

// good for both the course search and frineds search
const getCourses = async (
  query: string,
  id: number
): Promise<{ res: Class[]; id: number }> => {
  const app: Class[] = res.filter((course) => course.name.includes(query) || course.teacher.includes(query))

  return { res: app, id: id };
};

function SearchList() {
  const [search, setSearch] = useState("");
  const [searchId, setId] = useState(0);
  const [results, setResults] = useState<Class[]>([]);

  useEffect(() => {
    const searchCourses = async () => {
      if (search == "") return 
      const { res, id } = await getCourses(search, searchId);

      if (id == searchId) {
        setResults(res);
      }
    };

    searchCourses();
  }, [search, searchId]);

  return (
    <>
      <div style={{ marginTop: "1%", marginBottom: "1%" }}>
        <Input
          type="text"
          fullWidth
          radius="full"
          placeholder="The course or teacher"
          startContent={<SearchIcon />}
          value={search}
          onChange={(e) => {
            setId(searchId + 1);
            setSearch(e.target.value.trimStart());
          }}
        />
      </div>
      <Box>
        {results.map((course: Class) => (
          <div key={course.name}>
            <CourseCard course={course} />
          </div>
        ))}
      </Box>
    </>
  );
}

export default SearchList;
