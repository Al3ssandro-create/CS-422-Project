
import { Table, TableHeader, TableColumn, TableBody, TableCell, TableRow } from "@nextui-org/react";
import { Grade, } from "../types/types";

function UserGrades({grades }: { grades : Grade[] }) {
  const columns = [
    { key: "department", label: "DEPARTMENT"},
    { key: "code", label: "CODE"},
    { key: "value", label: "GRADE" },
    { key: "semester", label: "SEMESTER" },
    { key: "year", label: "YEAR" },

  ]

  return (
    <>
          <Table  aria-label=" Example table with dynamic content">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>
                {grades.map((grade,index) => (
                  <TableRow key={index}>
                      <TableCell>{grade.department}</TableCell>
                      <TableCell>{grade.number}</TableCell>
                      <TableCell>{grade.value}</TableCell>
                      <TableCell>{grade.semester}</TableCell>
                      <TableCell>{grade.year}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
    </>
  );
}
export default UserGrades;
