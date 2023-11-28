import { useEffect, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import { FaStar,FaRegStar } from "react-icons/fa";
import { Class, Distribution } from "../types/types";
import * as d3 from "d3";
import { addFavorite, addGrade, modifyGrade, removeFavorite, removeGrade } from "../api/server";
interface CourseCardProps {
  course: Class;
  userGrade?: string;
  fav: boolean;
  userId: number;
}

function BarChart({ distribution }: { distribution: Distribution | undefined }) {
    const color = ["#2CE574", "#CDF03A", "#FFE500", "#FF9600", "#FF3924"];
    const data = Object.entries(distribution).map(([grade, count]) => ({ grade, count }));
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 200 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    const xScale = d3.scaleBand().domain(data.map(d => d.grade)).range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.count) || 0]).range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d => d.toUpperCase()).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '1%' }}>
            <svg style={{ paddingTop: '5%', paddingBottom: '5%' }} width="100%" height="100%" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet">
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {data.map((d, i) => (
                        <rect
                            key={i}
                            x={xScale(d.grade)}
                            y={yScale(d.count)}
                            width={xScale.bandwidth()}
                            height={height - yScale(d.count)}
                            fill={color[i]}
                        />
                    ))}
                    <g ref={node => d3.select(node).call(xAxis)} transform={`translate(0, ${height})`} />
                    <g ref={node => d3.select(node).call(yAxis)} />
                </g>
            </svg>
        </div>
    );
}
function SingleCourse({ course, userGrade, fav, userId }: CourseCardProps) {
    const [starFilled, setStarFilled] = useState(fav);
    const [gradeInput, setGradeInput] = useState('');
    useEffect(() => {
      setStarFilled(fav);
      setGradeInput(userGrade || '');
    }, [fav, userGrade]);
    
    const handleGradeChange = (event) => {
      console.log(event.target.value, gradeInput)
      if(gradeInput === event.target.value) return;
      else if(gradeInput !== '' && event.target.value !== '') modifyGrade(userId, course.id, event.target.value);
      else if(gradeInput !== '' && event.target.value === '') removeGrade(userId, course.id);
      else addGrade(userId, course.id, event.target.value);
      setGradeInput(event.target.value);
      };

  
    const handleStarClick = async () => {
      const ret = starFilled ? await removeFavorite(userId, course.id) : await addFavorite(userId, course.id);

      if (ret)
        setStarFilled(!starFilled);
    };
  
    return (
      <Card className="py-4" style={{marginBottom: "4%"}}>
          <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
              <div></div>
              <h3 style={{fontSize:"3.5vw"}}>{course.semester.charAt(0).toUpperCase() + course.semester.slice(1)} {course.department + " " + course.code}</h3>
              <div onClick={handleStarClick}>
                  {starFilled? <FaStar style={{fontSize:"3.5vw"}}color={"black" }/>:<FaRegStar  style={{fontSize:"3.5vw"}}/>}
              </div>   
          </CardHeader>
          <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-center">
            <h3 style={{fontSize:"3vw"}}>{course.name} - {course.teacher}</h3>
            </CardHeader>
          <CardBody className="px-4" >
                  <BarChart distribution={course.distribution}/>
          </CardBody>
          <CardFooter className="px-4 flex items-center justify-center">
            <h5>Your grade: 
              <select value={gradeInput || ''} onChange={handleGradeChange}>
                <option value="">N/A</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
            </h5>
          </CardFooter>
      </Card>
    );
  }
  
  export default SingleCourse;
