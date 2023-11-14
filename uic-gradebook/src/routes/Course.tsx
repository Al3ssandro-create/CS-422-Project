import { Class } from "../types/types";
import Box from "../components/Box";
import SingleCourse from "../components/SingleCourse";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoursesByName, getUser, getUserId } from "../api/server";

function Course() {
  const [courses, setCourses] = useState<Class[]>([]);
  const [fav, setFav] = useState<number[]>([]);
  const [userId, setUserId] = useState<number>();
  const { courseName } = useParams();

  useEffect(() => {
    const obtainCourses = async () => {
      const id = await getUserId();

      const user = await getUser(id);

      if (user) {
        setFav(user.favClasses);
      }

      const courses = await getCoursesByName(courseName as string);

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
              fav={fav.includes(course.id)}
              userId={userId}
            />
          ))}
        </Box>
      </div>
    </>
  );
}

export default Course;
