import HomepageCourse from "../components/HomepageCourse";
import { Class, Distribution, User } from "../types/types";
import Box from "../components/Box";
import { useNavigate } from "react-router-dom";
import "../styles/css/card-course.css";
import { getFavCourses } from "../api/server";
import LegendModal from "../components/LegendModal";
import {
  useDisclosure
} from "@nextui-org/react";
import { useEffect, useState } from "react";


function Homepage({user}: {user: User}) {
  const [courses, setCourses] = useState<Class[]>([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  useEffect(() => {
    getFavCourses(user.id).then((courses) => setCourses(courses));
  }, [user]);

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
        <LegendModal isOpen={isOpen} onOpenChange={onOpenChange} />
        <Box>
          <div id="reference" style={{width:"100%"}}>
          {courses.map((item, index) => (
            <div
              onClick={() => navigate(`course/${item.department}/${item.code}/${item.teacher}`)}
              key={index}
              style={{ width: "100%" }}
            >
              <HomepageCourse
                data={Object.values(item.distribution as Distribution)}
                name={item.name}
                department={item.department}
                code={item.code.toString()}
                teacher={item.teacher}
                semester={item.semester}
                onOpen={onOpen}
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
