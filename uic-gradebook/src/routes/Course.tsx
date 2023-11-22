import { Class, User } from "../types/types";
import Box from "../components/Box";
import SingleCourse from "../components/SingleCourse";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourses } from "../api/server";

function Course({user}: {user: User}) {
  const [courses, setCourses] = useState<Class[]>([]);
  const { department, code, instructor } = useParams();

  useEffect(() => {
    const obtainCourses = async () => {
      if ( department === undefined || code === undefined || instructor === undefined) return;

      const courses: Class[] = await getCourses(user.id, department, parseInt(code), instructor);

      setCourses(courses);
    };

    obtainCourses();
  }, []);

  return (
    <>
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <Box style={{ marginTop: "4%" }}>
          {user && courses.map((course) => (
            <SingleCourse
              key={course.id + course.semester}
              course={course}
              fav={course.isFav ?? false}
              userId={user.id}
            />
          ))}
        </Box>
      </div>
    </>
  );
}

export default Course;
