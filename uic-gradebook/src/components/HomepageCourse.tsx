import { Card } from "@nextui-org/react";
import { QuestionIcon } from "@primer/octicons-react";
import { select, pie, arc, PieArcDatum } from "d3";
import { useEffect, useRef } from "react";

function D3PieChart({ data }: { data: Array<number> }) {
  const ref = useRef(null);
  const color = ["#2CE574", "#CDF03A", "#FFE500", "#FF9600", "#FF3924"];
  const labels = ["A", "B", "C", "D", "F"];
  useEffect(() => {
    const svg = select(ref.current);
    const pieGenerator = pie()
      .value((d) => d as number)
      .sort(null);
    const arcGenerator = arc<PieArcDatum<number>>()
      .innerRadius(0)
      .outerRadius(Math.min(400, 400) / 2);
    const arcs = pieGenerator(data);
    svg
      .attr("viewBox", [-200, -200, 400, 410].join(" "))
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("d", arcGenerator as any)
      .attr("fill", (d, i) => color[i])
      .attr("stroke", "white")
      .attr("stroke-width", "2px");
    svg
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d as any)})`)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-size", "2.5vh")
      .text((d) => {
        const percentage = Math.round(
          (d.data / data.reduce((a, b) => a + b, 0)) * 100
        );
        return percentage !== 0 ? `${percentage}%` : "";
      });
    const tooltip = select("#reference")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("padding", "10px")
      .style("border-radius", "5px")
      .style("height", "auto")
      .style("width", "auto");

    svg
      .attr("viewBox", [-200, -200, 400, 410].join(" "))
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("d", arcGenerator as any)
      .attr("fill", (d, i) => color[i])
      .attr("stroke", "white")
      .attr("stroke-width", "2px")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.8);
        tooltip
          .html(
            `
            <div style="color: ${color[d.index]}">${labels[d.index]}</div>
            <div style="color: black; white-space: nowrap;"> ${
              d.data
            } record</div>
          `
          )
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", (d) => {
        tooltip.transition().duration(500).style("opacity", 0);
      });
  }, [data]);

  return <svg style={{ padding: "1%" }} ref={ref}></svg>;
}
function HomepageCourse({
  data,
  name,
  department,
  code,
  teacher,
  semester,
  onOpen,
}: {
  data: Array<number>;
  name: string;
  department: string;
  code: string;
  teacher: string;
  semester: string;
  onOpen: () => void;
}) {
  return (
    <Card
      isBlurred
      shadow="lg"
      style={{
        backgroundColor: "white",
        marginBottom: "3%",
        padding: "1%",
        marginLeft: "2%",
        marginRight: "2%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "0 60%", padding: "3.5%", borderRadius: "10 px" }}>
          <D3PieChart data={data} />
        </div>
        <div
          style={{
            flex: "1",
            paddingLeft: "2%",
            paddingRight: "3%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              fontSize: "3vw",
            }}
          >
            {semester.charAt(0).toUpperCase() + semester.slice(1)} {name}
          </span>
          <span
            style={{
              fontWeight: "bold",
              display: "block",
              whiteSpace: "nowrap",
              fontSize: "3vw",
              marginBottom: "5%",
            }}
          >
            {department} {code}
          </span>
          <span
            style={{
              fontWeight: "bold",
              display: "block",
              whiteSpace: "nowrap",
              fontSize: "3vw",
            }}
          >
            {teacher}
          </span>
          <span
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              paddingBottom: "3%",
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
            >
              <QuestionIcon size={24} />
            </div>
          </span>
        </div>
      </div>
    </Card>
  );
}

export default HomepageCourse;
