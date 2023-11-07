import { Class } from "../types/types";
import Box from "../components/Box";
import SingleCourse from "../components/SingleCourse";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearchCourses, getUser } from "../api/server";

function Course() {
  const [courses, setCourses] = useState<Class[]>([]);
  const [fav, setFav] = useState<number[]>([]);
  const { courseName } = useParams();

  useEffect(() => {
    getSearchCourses(courseName as string, 0).then((courses) => {
      console.log(courses.res);
      setCourses(courses.res);
    });
    getUser(1).then((user) => {
      if (user) {
        setFav(user.favClasses);
      }
    });
  }, []);

  return (
    <>
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <Box>
          {courses.map((course) => (
            <SingleCourse
              key={course.id}
              course={course}
              fav={fav.includes(course.id)}
            />
          ))}
        </Box>
      </div>
    </>
  );
}

export default Course;
