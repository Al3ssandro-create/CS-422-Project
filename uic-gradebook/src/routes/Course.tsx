import React from 'react';
import  CourseCard  from "../components/CourseCard";
import { Class } from "../types/types";
import Box from "../components/Box";
import SingleCourse from '../components/SingleCourse';
function Course() {
  const courses: Class[] = [
    {
        id: 1,
        name: 'CS 450',
        teacher: 'John Doe',
        semester: 'Fall 2023',
        distribution: {
            a: 10,
            b: 20,
            c: 30,
            d: 20,
            f: 20
        }
    },
    {
      id: 1,
      name: 'CS 450',
      teacher: 'John Doe',
      semester: 'Spring 2023',
      distribution: {
          a: 10,
          b: 20,
          c: 30,
          d: 20,
          f: 20
      }
  },
  {
    id: 1,
    name: 'CS 450',
    teacher: 'John Doe',
    semester: 'Fall 2022',
    distribution: {
        a: 10,
        b: 20,
        c: 30,
        d: 20,
        f: 20
    }
},
    // Add more courses here...
];
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
