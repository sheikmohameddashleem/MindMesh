import { Chart } from "react-google-charts";
import { ScoreBox } from "./ScoreBox";

export const options = {
  title: "Your Interview Score",
  width: 1000,
  height: 600,
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

export function Score() {
  const technical_knowledge = 1;
  const problem_solving = 2;
  const communication = 4;

  const data = [
    [
      "Element",
      "Score",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ["Communication Skill", communication, "#f4aa64", null],
    ["Technical-SKill", technical_knowledge, "silver", null],
    ["Interviewing Skill", 6, "gold", null],
    ["Non Tech - First Impression", 7, "color: #e3b558", null],
    ["problem_solving", problem_solving, "color: #d87524", null],
  ];
  return (
    <>
      <ScoreBox />
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </>
  );
}
