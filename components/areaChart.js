import { Fragment } from 'react';
import { Brush, ComposedChart, Area, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../styles/Chart.module.css';


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

const lineColors = [
    '#C32BAD',
    '#7027A0',
    '#1DB9C3'
]

// function formatXAxis(tickItem) {
//     // If using moment.js
//     return (new Date(tickItem)).toLocaleDateString('es')
// }

const chart = (props) => {
//   static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

    const { randomize, transactions, types, lineColor, section } = props;
    console.log(transactions)
    // const newData = transactions.reduce(reduceTrans, {});
    const dataset = transactions.reduce(reduceTrans, {});
    console.log(dataset);
    console.log(Object.keys(dataset));
    const newData = types.map(type => dataset[type])
    console.log(newData);
    let lastType = {};
    const edd = newData.flatMap(el => el.data.map(unit => {
        // types.map(type => unit[type] = 3)

        types.map(type => {
          if (!lastType[type]) lastType[type] = 0
          unit[type] = lastType[type]
        })

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
    console.log(section);
    return (
    <div 
        className={styles.container}
        // onClick={randomize}
    >
      <ResponsiveContainer width="100%" height="34%" className={styles.rechartsResponsive}>
        <ComposedChart
        //   width={1000}
        //   height={300}
          data={sortedEdd}
          margin={{
            top: 5,
            right: 0,
            left: -30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="date" tickFormatter={formatXAxis} /> */}
          {/* <XAxis dataKey="date" tickFormatter={formatXAxis}/> */}
          {/* <YAxis dataKey="price" margin={{left: 50}}/> */}
          <Tooltip active={true} content={({ name, active, payload, label }) => {
            console.log(payload);
            console.log(name)
            return (
              <div className={styles.tooltip}>
                {payload && payload[0] && payload[0].payload.description}
                {/* {payload.map(item => item.payload[item.name])} */}
              </div>
          )}}/>
          <Brush dataKey="date" />
          {/* <Tooltip /> */}
          {/* <Legend /> */}

        {types.map((type, i) => ((section && type === section) || !section) && (
            <Fragment key={type}>
                {/* <Line dataKey={type} stroke={lineColors[i]} strokeWidth={5} type="natural" layout="vertical" /> */}
                <Area type="basis" dataKey={type} stroke={lineColor || lineColors[i]} fill={lineColor || lineColors[i]} />
                <Line dataKey="status" stroke={lineColors[i]} strokeWidth={5} type="basis" layout="vertical" />
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
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    );
}

export default chart;