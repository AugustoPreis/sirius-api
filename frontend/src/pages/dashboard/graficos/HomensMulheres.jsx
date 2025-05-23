import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useDashboardContext } from '../../../context/DashboardContext';
import CardGrid from '../../../components/CardGrid';

export default function HomensMulheres() {
  const { data } = useDashboardContext();
  const option = {
    tooltip: {
      trigger: 'item',
      valueFormatter: (value) => `${value}%`,
    },
    series: [
      {
        name: 'Homens X Mulheres',
        type: 'pie',
        radius: '50%',
        data: [
          { value: data?.graficos?.distribuicaoGenero?.homens, name: 'Homens', itemStyle: { color: '#1A8FbF' } },
          { value: data?.graficos?.distribuicaoGenero?.mulheres, name: 'Mulheres', itemStyle: { color: '#FF6F61' } },
        ],
      },
    ],
  };

  return (
    <CardGrid title='Distribuição de gênero das vendas'
      color='#2ec1d7'
      style={{ height: 550 }}>
      <ReactECharts notMerge
        option={option}
        style={{ height: 420 }}
        lazyUpdate={true}
        loadingOption={{
          text: 'Carregando...',
          color: '#1A8FbF',
          fontSize: 24,
        }} />
    </CardGrid>
  );
}