import { Card, CardHeader } from "@nextui-org/card";
import { useNavigate } from "react-router-dom";
import { Class } from "../types/types";

function CourseCard({ course }: { course: Class }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate(`/course/${course.department}/${course.code}/${course.teacher}`);
        }}
      >
        <Card shadow="lg" style={{ marginTop: "1%", marginBottom: "1%" }} fullWidth>
          <CardHeader>
            <p>{`${course.name} ${course.teacher}`}</p>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

export default CourseCard;