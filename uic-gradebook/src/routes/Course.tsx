import { Class } from "../types/types";
import Box from "../components/Box";
import SingleCourse from "../components/SingleCourse";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourses, getUserId } from "../api/server";

function Course() {
  const [courses, setCourses] = useState<Class[]>([]);
  const [userId, setUserId] = useState<number>();
  const { department, code, instructor } = useParams();

  useEffect(() => {
    const obtainCourses = async () => {
      // const id = await getUserId();
      const id = 3;

      if ( department === undefined || code === undefined || instructor === undefined) return;

      const courses: Class[] = await getCourses(id, department, parseInt(code), instructor);

      setCourses(courses);
      setUserId(id);
    };

    obtainCourses();
  }, []);

  return (
    <>
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <Box style={{ marginTop: "4%" }}>
          {userId && courses.map((course) => (
            <SingleCourse
              key={course.id + course.semester}
              course={course}
              fav={course.isFav ?? false}
              userId={userId}
            />
          ))}
        </Box>
      </div>
    </>
  );
}

export default Course;
