import HomepageCourse from "../components/HomepageCourse";
import { Class, Distribution, User } from "../types/types";
import Box from "../components/Box";
import { useNavigate } from "react-router-dom";
import "../styles/css/card-course.css";
import { getFavCourses } from "../api/server";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  useDisclosure
} from "@nextui-org/react";
import { useEffect, useState } from "react";

function LegendModal({isOpen, onOpenChange}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {

  const color = ["#2CE574", "#CDF03A", "#FFE500", "#FF9600", "#FF3924"];
  const labels = ["A", "B", "C", "D", "F"];

  const legendItems = labels.map((label, index) => ({
    label,
    color: color[index]
  }));

  return (
  <>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur" size="xs">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Pie Chart Legend</ModalHeader>
              <ModalBody style={{color: "black"}}>
                <ul>
            {legendItems.map((item, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: "center" }}>
                <span 
                  style={{ 
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    backgroundColor: item.color,
                    marginRight: '10px' 
                  }}
                />
                {item.label}
              </li>
            ))}
          </ul>
              </ModalBody>
              <ModalFooter style={{display: "flex", justifyContent: "center"}}>
                <Button color="primary" onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  </>)
}

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
