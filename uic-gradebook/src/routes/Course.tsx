import { Class } from "../types/types";
import Box from "../components/Box";
import SingleCourse from "../components/SingleCourse";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoursesByName, getUser } from "../api/server";

function Course() {
  const [courses, setCourses] = useState<Class[]>([]);
  const [fav, setFav] = useState<number[]>([]);
  const { courseName } = useParams();

  useEffect(() => {
    getCoursesByName(courseName as string).then((courses) => {
      
      setCourses(courses);
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
              key={course.id + course.semester}
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
