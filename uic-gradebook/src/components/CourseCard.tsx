// to display courses' search results

import { Card, CardBody, CardHeader } from "@nextui-org/card";

function CourseCard({course}: {course: Class}) {
  return (
    <>
        <Card style={{marginTop: "1%", marginBottom: "1%"}}>
            <CardHeader>
                <p>{course.name}</p>
            </CardHeader>
            <CardBody>
                <p>{course.teacher}</p>
            </CardBody>
        </Card>
    </>
  )
}

export default CourseCard;