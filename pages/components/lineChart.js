import React, { Fragment, PureComponent } from 'react';
import moment from 'moment';
import styles from '../../styles/Chart.module.css';
import { Bar, LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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
      date: (new Date(date)).valueOf(),
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
      console.log(updatedType);
      acc[currentType] = updatedType
      // acc[acc.find(series => series.type === currentType)] = {
      //   label: type.label,
      //   data: type.data.sort((a, b) => a.date - b.date)
      // };
    }
  
    console.log(';asdas');
    return acc
};

// const reduceTrans = (acc, {
//     description,
//     price,
//     date,
//     type: currentType
//   }) => {
//     console.log(acc)
//     let type = acc[currentType]
//     // let type = acc.find(series => series.label === currentType)
//     if (!type) {
//       console.log('new type')
//       type = {
//         name: currentType, data: [],
//       }
//       acc[type] = type;
//       // acc.push(type)
//     }
  
//     console.log('validate')
//     console.log(type.data)
//     console.log(type);
//     const unit = {
//       description,
//       date,
//       price
//     }
//     console.log(unit);
//     if (type?.data) {
//       type.data.push(unit)
//       const slot = acc[currentType]
//       // const slot = acc[acc.find(series => series.type === currentType)]
//       console.log(slot);
//       const updatedType = {
//         name: type.name,
//         data: type.data.sort((a, b) => a.date - b.date)
//       }
//       acc[currentType] = updatedType
//       // acc[acc.find(series => series.type === currentType)] = {
//       //   label: type.label,
//       //   data: type.data.sort((a, b) => a.date - b.date)
//       // };
//     }
  
//     console.log(';asdas');
//     return acc
//   };

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const lineColors = [
    '#C32BAD',
    '#7027A0',
    '#1DB9C3'
]

function formatXAxis(tickItem) {
    // If using moment.js
    return (new Date(tickItem)).toLocaleDateString('es')
}

export default class Example extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    const { randomize, transactions, types } = this.props;
    console.log(transactions)
    // const newData = transactions.reduce(reduceTrans, {});
    const dataset = transactions.reduce(reduceTrans, {});
    console.log(dataset);
    console.log(Object.keys(dataset));
    const newData = types.map(type => dataset[type])
    console.log(newData);
    const edd = newData.flatMap(el => el.data.map(unit => {
        types.map(type => unit[type] = 3)
        unit[el.label] = unit.price
        return ({
        ...unit,
        type: el.label,
    })}))
    const sortedEdd = edd.sort((a, b) => a.date - b.date)
    console.log(edd);
    // console.log(transactions);
    // const dataset = transactions.reduce(reduceTrans, {});
    // console.log(dataset);
    // console.log(Object.keys(dataset));
    // const edd = types.map(type => dataset[type])
    // console.log(edd);
    return (
    <div 
        className={styles.container}
        onClick={randomize}
    >
      <ResponsiveContainer width="100%" aspect="1">
        <LineChart
        //   width={1000}
        //   height={300}
          data={sortedEdd}
          margin={{
            top: 5,
            right: 0,
            left: 5,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="date" tickFormatter={formatXAxis} /> */}
          {/* <XAxis dataKey="date" tickFormatter={formatXAxis}/> */}
          {/* <YAxis dataKey="price"/> */}
          <Tooltip />
          <Legend />

        {types.map((type, i) => (
            <Fragment>
                <Line dataKey={type} stroke={lineColors[i]} strokeWidth={5} type="natural" layout="vertical" />
                <Area type="natural" dataKey={type} stroke={lineColors[i]} fill={lineColors[i]} />
            </Fragment>
        ))}


        {/* {[...types[0]].map((e, i) => {
            
            console.log(e.label)
            console.log(e.data)
            return (
                <XAxis dataKey="date" data={sortedEdd.filter(unit => unit.type === types[types.indexOf(e)])} tickFormatter={formatXAxis}/>
            )})} */}
          {/* <Line type="monotone" dataKey="price" stroke="#C32BAD" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="description" stroke="#7027A0" />
          <Line type="monotone" dataKey="type" stroke="#C32BAD" /> */}
        </LineChart>

      </ResponsiveContainer>
    </div>
    );
  }
}

