import { Card, CardHeader } from "@nextui-org/card";
import { useNavigate } from "react-router-dom";
import { DisplayClass } from "../types/types";

function CourseCard({ course }: { course: DisplayClass }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate(`/course/${course.name}`);
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