import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import depts from "../department.json";

function DeptSelect({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <Select
        label="Department"
        style={{ color: "black", backgroundColor: "inherit", boxShadow: "none" }}
        radius="full"
        scrollShadowProps={{
          isEnabled: false
        }}
        selectedKeys={[value]}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        {depts.map((dept) => (
          <SelectItem key={dept} value={dept} style={{ color: "black" }}>
            {dept}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DeptSelectBase({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <select style={{backgroundColor: "inherit"}} value={value} onChange={(e) => {
        setValue(e.target.value);
      }}>
        {
          depts.map((dept) => {
            return (
              <option key={dept} value={dept}>
                {dept}
              </option>
            );
          })
        }
      </select>
    </>
  );
}

export default DeptSelect;