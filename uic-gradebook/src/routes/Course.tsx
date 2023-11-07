import { Class } from "../types/types";
import Box from "../components/Box";
import SingleCourse from '../components/SingleCourse';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearchCourses } from "../api/server";

function Course() {
  const [courses, setCourses] = useState<Class[]>([]);
  const { courseName } = useParams();

  useEffect(() => {
    getSearchCourses(courseName as string, 0).then((courses) => setCourses(courses.res));
  }, [])

  return (
    <>
        <div style={{width: "100%", backgroundColor: "white"}}>
          <Box>
            {courses.map(course => <SingleCourse key={course.id} course={course} />)}
          </Box>
        </div>
    </>
  );
}

export default Course;