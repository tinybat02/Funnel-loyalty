import { Frame } from '../types';

export const processData = (data: Array<Frame>) => {
  let total = 0,
    days_2 = 0,
    days_3 = 0,
    days_4 = 0;
  data.map(category => {
    if (category.name == 'Sum count')
      category.fields[0].values.buffer.map(item => {
        total += item;
      });

    if (category.name == '4+ days') {
      days_4 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }

    if (category.name == '3 days') {
      days_3 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }

    if (category.name == '2 days') {
      days_2 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }
  });

  const per = Math.round((days_4 + days_3 + days_2) * 100) / 100;
  const engaged = (per * total) / 100;

  return {
    csvData: [],
    data: [
      { label: 'Visitors', quantity: total },
      { label: 'Returning Customers', quantity: engaged },
    ],
  };
};
