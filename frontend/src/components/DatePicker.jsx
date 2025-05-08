import React from 'react';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import ptBR from 'antd/es/date-picker/locale/pt_BR';
import 'antd/es/date-picker/style/index';

const Picker = generatePicker(dateFnsGenerateConfig);

export default function DatePicker({ rangePicker, ...props }) {
  const pickerProps = {
    locale: ptBR,
    format: 'dd/MM/yyyy',
    style: { width: '100%' },
    ...props,
  };

  //Converte datas em formato de string
  if (typeof props.value === 'string') {
    pickerProps.value = new Date(props.value);
  }

  if (rangePicker) {
    return (
      <Picker.RangePicker {...pickerProps} />
    );
  }

  return (
    <Picker {...pickerProps} />
  );
}