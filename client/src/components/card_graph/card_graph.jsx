import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import "./card_graph.css";
import { useEffect, useState } from "react";

const CardGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const maxBound = getRandomInteger(100, 5000);
    const newData = Array.from({ length: 30 }, (_, i) => ({
      day: (i + 1).toString(),
      views: getRandomInteger(100, maxBound),
    }));
    setData(newData);
  }, []);

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <div className="card-container">
        <div className="card">
          <div className="header">{"Views in the Last Month"}</div>
          <div className="graph">
            <ResponsiveContainer>
              <AreaChart data={data}>
                <Area
                  dataKey="views"
                  type="monotone"
                  stroke="#8d6ccf"
                  fill="#8d6ccf"
                  fillOpacity={0.9}
                  strokeWidth={2}
                />
                <CartesianGrid stroke="#517C77" strokeWidth={0.69} />
                <XAxis
                  dataKey="day"
                  stroke="#517C77"
                  style={{ fontSize: "clamp(6px,1vw,12px)" }}
                />
                <YAxis
                  dataKey="views"
                  stroke="#517C77"
                  style={{ fontSize: "clamp(6px,1vw,12px)" }}
                />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardGraph;
