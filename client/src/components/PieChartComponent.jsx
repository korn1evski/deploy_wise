import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useSelector } from "react-redux";

const data = [
  { name: "Category A", value: 400 },
  { name: "Category B", value: 300 },
  { name: "Category C", value: 200 },
  { name: "Category D", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartComponent = () => {
  const sideBar = useSelector((state) => state.sideBar.showSideBar);
  const [showPie, setPie] = useState('block')
  const [outerWidth, setOuterWidth] = useState(
    window.innerWidth < 768 ? 70 : 110
  );
  const [innerWidth, setInnerWidth] = useState(
    window.innerWidth < 768 ? 45 : 75
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(sideBar)
      if (window.innerWidth < 768) {
        setOuterWidth(70);
        setInnerWidth(45);
      }
      if (window.innerWidth >= 768) {
        setOuterWidth(110);
        setInnerWidth(75);
      }
    });

    if(window.innerWidth < 1280 && sideBar) setPie('hidden')
    else setPie('block')  
  }, [sideBar]);
  return (
    <div className={`relative ${showPie}`}>
      <span className="2xl:top-[37%] 2xl:left-[21%] lg:top-[35%] lg:left-[18%] md:top-[38%] md:left-[21%] sm:top-[41%] sm:left-[21%] top-[41%] left-[17%] absolute text-[#4DDE90] font-black md:text-[35px] text-[25px] flex items-center font-['Karla']">
        <AiOutlineArrowUp />
        4%
      </span>
      <ResponsiveContainer height={220}>
        <PieChart className="w-full flex">
          <Pie
            align="left"
            data={data}
            cx="25.5%"
            cy="50%"
            innerRadius={innerWidth}
            outerRadius={outerWidth}
            fill="#8884d8"
            dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            iconType="circle"
            layout="vertical"
            wrapperStyle={{
              paddingTop: "10px",
              marginLeft: "25%",
            }}
            content={() => (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {data.map((entry, index) => (
                  <li
                    key={`legend-item-${index}`}
                    style={{ marginBottom: "5px" }}
                    className="text-[12px] md:text-[16px]">
                    <span
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        marginRight: "5px",
                        borderRadius: "50%",
                      }}
                    />
                    {entry.name}
                  </li>
                ))}
              </ul>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
