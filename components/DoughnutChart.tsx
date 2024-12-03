"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateGreenShades = (count) => {
  const shades = [];

  for (let i = 0; i < count; i++) {
    const r = 0;
    const g = Math.floor(128 + Math.random() * 127);
    const b = Math.floor(64 + Math.random() * 64);
    shades.push(`rgb(${r}, ${g}, ${b})`);
  }

  return shades;
};

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance)
  const balances = accounts.map((a) => a.currentBalance)

  const data = {
    datasets: [
      {
        label: 'Banks',
        data: balances,
        backgroundColor: generateGreenShades(balances.length),
      }
    ],
    labels: accountNames
  }

  return <Doughnut 
  return <Doughnut 
    data={data} 
    options={{
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        }
      }
    }}
  />
}

export default DoughnutChart