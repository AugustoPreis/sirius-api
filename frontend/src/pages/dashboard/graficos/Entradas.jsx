import React from 'react';
import ReactECharts from 'echarts-for-react';
import CardGrid from '../../../components/CardGrid';

export default function Entradas() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Entradas',
        type: 'line',
        smooth: true,
        itemStyle: { color: '#e1b12c' },
        data: [0, 0, 0, 0, 0, 0, 0, 0, 5, 15, 40, 80, 20, 40, 50, 80, 20, 40, 50, 80, 20, 5, 0, 0],
      },
      {
        name: 'Vendas',
        type: 'line',
        smooth: true,
        itemStyle: { color: '#44bd32' },
        data: [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 6, 1, 2, 2, 5, 1, 2, 3, 6, 1, 0, 0, 0],
      },
    ],
  }

  return (
    <CardGrid title='Entradas X Vendas'
      color='#2ec1d7'>
      <ReactECharts notMerge
        option={option}
        lazyUpdate={true}
        style={{ minHeight: 400 }}
        loadingOption={{
          text: 'Carregando...',
          color: '#1A8FbF',
          fontSize: 24,
        }} />
    </CardGrid>
  );
}