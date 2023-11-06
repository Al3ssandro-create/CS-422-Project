
import HomepageCourse from "../components/HomepageCourse";
import { Class } from "../types/types";
import Box from "../components/Box";
import {useNavigate } from "react-router-dom";
import "../styles/css/card-course.css";
const list: Array<Class> = [
  {
    id: 1,
    name: 'CS 450',
    teacher: 'Teacher 1',
    semester: 'Fall 2021',
    distribution: { a: 59 , b: 25, c: 25, d: 15, f: 10 }
  },
  {
    id: 2,
    name: 'CS 361',
    teacher: 'Teacher 2',
    semester: 'Spring 2022',
    distribution: { a: 30, b: 20, c: 25, d: 15, f: 10 }
  },
  {
    id: 3,
    name: 'CS 422',
    teacher: 'Teacher 3',
    semester: 'Fall 2022',
    distribution: { a: 20, b: 15, c: 25, d: 15, f: 10 }
  },
  // Add more classes as needed
];

function Homepage() {
  const navigate = useNavigate();
    return (
      <>
      <div style={{width:"100%", backgroundColor:"white"}}>
        <Box> 
      {list.map((item, index) => (
        <div onClick={() => navigate(`course/${item.name}`)} key={index}>
          <HomepageCourse data={Object.values(item.distribution)} name={item.name} teacher={item.teacher} semester={item.semester} />
        </div>
      ))}
        </Box>
      </div>
    </>
    );
  }
  
  export default Homepage;
  