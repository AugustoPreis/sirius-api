import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useDashboardContext } from '../../../context/DashboardContext';
import CardGrid from '../../../components/CardGrid';

export default function Entradas() {
  const { data } = useDashboardContext();
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
      data: data?.graficos?.entradasXVendas?.horas,
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
        data: data?.graficos?.entradasXVendas?.entradas,
      },
      {
        name: 'Vendas',
        type: 'line',
        smooth: true,
        itemStyle: { color: '#44bd32' },
        data: data?.graficos?.entradasXVendas?.vendas,
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