
import HomepageCourse from "../components/HomepageCourse";
import { Class, Distribution } from "../types/types";
import Box from "../components/Box";
import {useNavigate } from "react-router-dom";
import "../styles/css/card-course.css";
import { getFavCourses } from "../api/server";
import { useEffect, useState } from "react";

function Homepage() {
  const [courses, setCourses] = useState<Class[]>([]);
  const userId = 1;

  useEffect(() => {
    getFavCourses(userId).then((courses) => setCourses(courses));
  }, [])

  const navigate = useNavigate();
 
    return (
      <>
      <div style={{width:"100%", backgroundColor:"white", marginTop: "4%", marginBottom: "4%"}}>
        <Box> 
      {courses.map((item, index) => (
        <div onClick={() => navigate(`course/${item.name}`)} key={index} style={{width: "100%"}}>
          <HomepageCourse data={Object.values(item.distribution as Distribution)} name={item.name} teacher={item.teacher} semester={item.semester} />
        </div>
      ))}
        </Box>
      </div>
    </>
    );
  }
  
  export default Homepage;
  