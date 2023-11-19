import HomepageCourse from "../components/HomepageCourse";
import { Class, Distribution } from "../types/types";
import Box from "../components/Box";
import { useNavigate } from "react-router-dom";
import "../styles/css/card-course.css";
import { getFavCourses, getUserId } from "../api/server";
import { useEffect, useState } from "react";

function Homepage() {
  const [courses, setCourses] = useState<Class[]>([]);
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    getUserId().then((id) => setUserId(id));
  }, []);

  useEffect(() => {
    getFavCourses(userId as number).then((courses) => setCourses(courses));
  }, [userId]);

  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          paddingTop: "4%",
          paddingBottom: "4%"
        }}
      >
        <Box>
          <div id="reference" style={{width:"100%"}}>
          {courses.map((item, index) => (
            <div
              onClick={() => navigate(`course/${item.name}`)}
              key={index}
              style={{ width: "100%" }}
            >
              <HomepageCourse
                data={Object.values(item.distribution as Distribution)}
                name={item.name}
                teacher={item.teacher}
                semester={item.semester}
              />
            </div>
          ))}
          </div>
        </Box>
      </div>
    </>
  );
}

export default Homepage;
