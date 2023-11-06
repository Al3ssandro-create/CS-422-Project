import { Card } from "@nextui-org/react";
import { select, pie, arc, PieArcDatum } from "d3";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
function D3PieChart({ data }: { data: Array<number> }) {
  const ref = useRef(null);
  const color = ["#2CE574", "#CDF03A", "#FFE500", "#FF9600", "#FF3924"];
  const labels = ["A", "B", "C", "D", "F"];
  useEffect(() => {
    const svg = select(ref.current);
    const pieGenerator = pie();
    const arcGenerator = arc<PieArcDatum<number>>()
      .innerRadius(0)
      .outerRadius(Math.min(400, 400) / 2);
    const arcs = pieGenerator(data);
    svg
      .attr("viewBox", [-200, -200, 500, 410].join(" "))
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
      .style("font-size", "2vw")
      .text(
        (d) =>
          `${Math.round((d.data / data.reduce((a, b) => a + b, 0)) * 100)}%`
      );
    const tooltip = select("body")
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
      .attr("viewBox", [-200, -200, 500, 410].join(" "))
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

    // const legend = svg
    //   .append("g")
    //   .attr("transform", "translate(220, -100)")
    //   .selectAll("g")
    //   .data(color)
    //   .join("g");

    // legend
    //   .append("rect")
    //   .attr("width", 20)
    //   .attr("height", 20)
    //   .attr("fill", (d, i) => color[i])
    //   .attr("y", (d, i) => i * 50);

    // legend
    //   .append("text")
    //   .attr("x", 25)
    //   .attr("y",  (d, i) => i * 50 + 17)
    //   .text((d, i) => labels[i]);
  }, [data]);

  return <svg style={{ padding: "1%" }} ref={ref}></svg>;
}
function HomepageCourse({
  data,
  name,
  teacher,
  semester,
}: {
  data: Array<number>;
  name: string;
  teacher: string;
  semester: string;
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
      <div style={{ display: "flex" }}>
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
            textAlign: "left",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              display: "block",
              whiteSpace: "nowrap",
              fontSize: "3vw",
              marginBottom: "5%",
            }}
          >
            {semester}
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
            {name}
          </span>
          <span
            style={{
              fontWeight: "bold",
              display: "block",
              whiteSpace: "nowrap",
              fontSize: "3vw",
            }}
          >
            Professor, {teacher}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default HomepageCourse;