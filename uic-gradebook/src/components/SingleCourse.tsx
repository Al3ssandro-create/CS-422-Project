import React, { useState, useEffect } from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { Class, Distribution } from "../types/types";
import * as d3 from 'd3';
interface CourseCardProps {
  course: Class;
  userGrade?: string;
}
function BarChart({ distribution }: { distribution: Distribution }) {
    const color = ["#2CE574", "#CDF03A", "#FFE500", "#FF9600", "#FF3924"];
    const data = Object.entries(distribution).map(([grade, count]) => ({ grade, count }));
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 200 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    const xScale = d3.scaleBand().domain(data.map(d => d.grade)).range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.count) || 0]).range([height, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length);
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
function SingleCourse({ course, userGrade }: CourseCardProps) {
    const [starFilled, setStarFilled] = useState(false);
  
    const handleStarClick = () => {
      setStarFilled(!starFilled);
    };
  
    return (
      <Card className="py-4" style={{marginRight: "20%", marginLeft: "20%", marginBottom: "3%",}}>
          <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
              <div></div>
              <h3 style={{fontSize:"3.5vw"}}>{course.semester} {course.name}</h3>
              <div onClick={handleStarClick}>
                  <FaStar style={{fontSize:"3.5vw"}}color={starFilled ? "black" : "gray"} />
              </div>   
          </CardHeader>
          <CardBody className="px-4" >
                  <BarChart distribution={course.distribution}/>
          </CardBody>
          {userGrade && <h5>Your grade: {userGrade}</h5>}
      </Card>
    );
  }
  
  export default SingleCourse;
