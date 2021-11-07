import { Chart } from 'react-charts';
import styles from '../../styles/Chart.module.css'
import { useMemo } from 'react';

 const reduceTrans = (acc, {
  description,
  price,
  date,
  type: currentType
}) => {
  console.log(acc)
  let type = acc[currentType]
  // let type = acc.find(series => series.label === currentType)
  if (!type) {
    console.log('new type')
    type = {
      label: currentType, data: [],
    }
    acc[type] = type;
    // acc.push(type)
  }

  console.log('validate')
  console.log(type.data)
  console.log(type);
  const unit = {
    description,
    date,
    price
  }
  console.log(unit);
  if (type?.data) {
    type.data.push(unit)
    const slot = acc[currentType]
    // const slot = acc[acc.find(series => series.type === currentType)]
    console.log(slot);
    const updatedType = {
      label: type.label,
      data: type.data.sort((a, b) => a.date - b.date)
    }
    acc[currentType] = updatedType
    // acc[acc.find(series => series.type === currentType)] = {
    //   label: type.label,
    //   data: type.data.sort((a, b) => a.date - b.date)
    // };
  }

  console.log(';asdas');
  return acc
};

function MyChart({
  transactions,
  randomize,
  types
}) {
  console.log(transactions);
  const dataset = transactions.reduce(reduceTrans, {});
  console.log(dataset);
  console.log(Object.keys(dataset));
  const data = types.map(type => dataset[type])
  // const data = dataset.map(set => dataset[set]);
  const oldData = [
    {
      label: 'React Charts',
      data: [
        {
          date: 30,
          stars: 23467238,
        },
        {
          date: 40,
          stars: 2346723,
        },
        {
          date: 60,
          stars: 2346738,
        },
        {
          date: 80,
          stars: 2346238,
        },
      ],
    },
    {
      label: 'React Charts',
      data: [
        {
          date: 50,
          stars: 2346723,
        },
      ],
    },
    {
      label: 'React Charts',
      data: [
        {
          date: 80,
          stars: 2346738,
        },
      ],
    },
    {
      label: 'React Charts',
      data: [
        {
          date: 100,
          stars: 234673,
        },
      ],
    },
  ]

  const primaryAxis = useMemo(
    () => ({
      getValue: datum => datum.date,
      // label: datum => datum.description,
      elementType: 'bar',
    }),
    []
  )

  const secondaryAxes = useMemo(
    () => [
      {
        label: datum => datum.price,
        getValue: datum => datum.price,
        elementType: 'line',
        min: -5,
        max: 100,
        // label: datum => datum.description,
      },
    ],
    []
  )
  const axes = useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  console.log(data);
  return (
    <div 
      className={styles.container}
      onClick={randomize}
    >
      <Chart
        options={{
          data: data,
          primaryAxis,
          secondaryAxes,
          tooltip: true,
          defaultColors: [
            '#1DB9C3',
            '#7027A0',
            '#C32BAD',
          ],
          tooltip: 'description'
        }}
      >
      </Chart>
    </div>
  )
}

export default MyChart;
