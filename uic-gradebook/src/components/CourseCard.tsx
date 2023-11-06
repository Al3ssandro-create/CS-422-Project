import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useNavigate } from "react-router-dom";

function CourseCard({ course }: { course: Class }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate(`/course/${course.name}`);
        }}
      >
        <Card shadow="lg" style={{ marginTop: "1%", marginBottom: "1%" }}>
          <CardHeader>
            <p>{course.name}</p>
          </CardHeader>
          <CardBody>
            <p>{course.teacher}</p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default CourseCard;