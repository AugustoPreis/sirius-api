import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { Modal } from 'antd';

export default function Grafico() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const option = {
    legend: { top: '5%' },
    title: { left: 'center', text: 'Funcionários com mais atendimentos nos últimos 7 dias' },
    tooltip: { trigger: 'axis' },
    dataset: { source: data },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: Array
      .from({ length: data.length - 1 })
      .map(() => ({
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      })).concat([{
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '30%'],
        emphasis: { focus: 'self' },
        label: { formatter: '{b}: ({d}%)' },
      }]),
  }

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);

    const params = {
      dias: 7,
      limite: 5,
    }

    axios.get('/v1/atendimentos/ranking', {
      params,
    }).then(({ data }) => {
      setLoading(false);
      handleData(data);
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.response.data.message,
      });
    });
  }

  const handleData = (data) => {
    const nData = [];

    data
      .filter((el) => Array.isArray(el.dias))
      .forEach((funcionario, index) => {
        const { nome, dias } = funcionario;

        if (index === 0) {
          nData.push(['Funcionário', ...dias.map((dia) => dia.dia)]);
        }

        nData.push([nome, ...dias.map((dia) => dia.atendimentos)]);
      });

    setData([...nData]);
  }

  return (
    <ReactECharts notMerge
      showLoading={loading}
      option={option}
      lazyUpdate={true}
      style={{ minHeight: 750 }}
      loadingOption={{
        text: 'Carregando...',
        color: '#1A8FbF',
        fontSize: 24,
      }} />
  );
}