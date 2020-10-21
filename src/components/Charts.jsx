import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const data = [
  {
    name: '01.01.2021', 'New Requests': 40, "In Progress": 24, "Closed Requests": 24,
  },
  {
    name: '02.01.2021', 'New Requests': 30, "In Progress": 13, "Closed Requests": 22,
  },
  {
    name: '03.01.2021', 'New Requests': 20, "In Progress": 98, "Closed Requests": 22,
  },
  {
    name: '04.01.2021', 'New Requests': 27, "In Progress": 39, "Closed Requests": 20,
  },
  {
    name: '05.01.2021', 'New Requests': 18, "In Progress": 48, "Closed Requests": 21,
  },
  {
    name: '06.01.2021', 'New Requests': 23, "In Progress": 38, "Closed Requests": 25,
  },
  {
    name: '07.01.2021', 'New Requests': 34, "In Progress": 43, "Closed Requests": 21,
  },
];


const renderLineChart = () => {
  return (
    <LineChart
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="New Requests" stroke="#ff0000" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="In Progress" stroke="#ffca68" />
      <Line type="monotone" dataKey="Closed Requests" stroke="#008000" />
    </LineChart>
  );
};

export default renderLineChart;
