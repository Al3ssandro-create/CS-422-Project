import { Card, CardHeader } from "@nextui-org/card";
import { useNavigate } from "react-router-dom";
import { db_Class_search } from "../types/backend";

function CourseCard({ course }: { course: db_Class_search }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate(`/course/${course.department}/${course.number}/${course.instructor}`);
        }}
      >
        <Card shadow="lg" style={{ marginTop: "1%", marginBottom: "1%" }} fullWidth>
          <CardHeader style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
            <p>{`${course.department} ${course.number}`}</p>
            <p>{`${course.name}`}</p>
            <p>{`${course.instructor}`}</p>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

export default CourseCard;