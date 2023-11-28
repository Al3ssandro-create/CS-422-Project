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

      let courses: Class[] = await getCourses(user.id, department, parseInt(code), instructor);
      courses = courses.sort((a, b) => {
        
        if (a.isFav && !b.isFav) return -1;
        if (!a.isFav && b.isFav) return 1;
  
        const aSemesterYear = parseInt(a.semester.split(' ')[1]);
        const bSemesterYear = parseInt(b.semester.split(' ')[1]);
  
        if (aSemesterYear > bSemesterYear) return -1;
        if (aSemesterYear < bSemesterYear) return 1;

        const semesterOrder = ['fall', 'summer', 'spring'];
        const aSemester = semesterOrder.indexOf(a.semester.split(' ')[0].toLowerCase());
        const bSemester = semesterOrder.indexOf(b.semester.split(' ')[0].toLowerCase());
  
        return aSemester - bSemester;
      });
      setCourses(courses);
    };

    obtainCourses();
  }, [user]);

  return (
    <>
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <Box style={{ paddingTop: "4%" }}>
          {user && courses.map((course) => (
            <SingleCourse
              key={course.id + course.semester}
              course={course}
              userGrade={course.grade}
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
