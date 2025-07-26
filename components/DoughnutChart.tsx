'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const staticGreenShades = ['#66ff66', '#33cc33', '#009900'];

const generateStaticGreenShades = (count: number): string[] => {
  const shades = [];
  for (let i = 0; i < count; i++) {
    shades.push(staticGreenShades[i % staticGreenShades.length]);
  }
  return shades;
};

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map(a => a.name);
  const balances = accounts.map(a => a.currentBalance);

  const data = {
    datasets: [
      {
        label: 'Banks',
        data: balances,
        backgroundColor: generateStaticGreenShades(balances.length),
      },
    ],
    labels: accountNames,
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
