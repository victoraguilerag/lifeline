// eslint-ignore react-hooks/rules-of-hooks
import { Fragment, useEffect } from 'react';
import { Brush, ComposedChart, Area, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../styles/Chart.module.css';


const reduceTrans = (acc, {
  description,
  price,
  date,
  type: currentType,
  selected
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
    price,
    selected
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

const Chart = (props) => {
  //   static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';
  useEffect(() => {
    const { randomize, transactions, types, lineColor, section, setData } = props;
    // const newData = transactions.reduce(reduceTrans, {});
    const dataset = transactions.reduce(reduceTrans, {});
    const newData = types.map(type => dataset[type])

    let lastType = {};
    const edd = newData.flatMap((el, i) => {
      let lifeline = 0;
      return el.data.map((unit, j) => {
        // types.map(type => unit[type] = 3)

        types.map(type => {
          if (!lastType[type]) lastType[type] = 0
          unit[type] = lastType[type]
          // if (i === 2 && j == 0)
          //   unit.selected = true;
        })

        unit[el.label] = unit.price

        return ({
          ...unit,
          type: el.label,
        })
      })
    })
    const sortedEdd = edd.sort((a, b) => a.date - b.date)
    let lifeline = 0
    const eddLine = sortedEdd.map(unit => {
      if (unit.type === 'expense')
        lifeline = lifeline - unit.price;

      if (unit.type === 'investment')
        lifeline = lifeline - unit.price;

      if (unit.type === 'balance')
        lifeline = lifeline + unit.price;
      return {
        ...unit,
        lifeline
      }
    })
    // const dataset = transactions.reduce(reduceTrans, {});
    // const edd = types.map(type => dataset[type])

    console.log(eddLine);
    setData(eddLine)
  }, [])
  useEffect(() => {
    const { randomize, transactions, types, lineColor, section, setData } = props;
    // const newData = transactions.reduce(reduceTrans, {});
    const dataset = transactions.reduce(reduceTrans, {});
    const newData = types.map(type => dataset[type])
    console.log('newData');
    console.log(newData);

    let lastType = {};
    const edd = newData.flatMap((el, i) => {
      let lifeline = 0;
      return el.data.map((unit, j) => {
        // types.map(type => unit[type] = 3)

        types.map(type => {
          if (!lastType[type]) lastType[type] = 0
          unit[type] = lastType[type]
          // if (i === 2 && j == 0)
          //   unit.selected = true;
        })

        unit[el.label] = unit.price

        return ({
          ...unit,
          type: el.label,
        })
      })
    })
    const sortedEdd = edd.sort((a, b) => a.date - b.date)
    let lifeline = 0
    const eddLine = sortedEdd.map(unit => {
      if (unit.type === 'expense')
        lifeline = lifeline - unit.price;

      if (unit.type === 'investment')
        lifeline = lifeline - unit.price;

      if (unit.type === 'balance')
        lifeline = lifeline + unit.price;
      return {
        ...unit,
        lifeline
      }
    })
    // const dataset = transactions.reduce(reduceTrans, {});
    // const edd = types.map(type => dataset[type])

    console.log("eddLine");
    console.log(eddLine);
    setData(eddLine)
  }, [props.transactions])

  const { randomize, transactions, types, lineColor, section, data } = props;
  console.log('update')
  console.log(transactions)
  return (
    <div
      className={styles.container}
      onClick={randomize}
    >
      <ResponsiveContainer width="100%" height="100%" className={styles.rechartsResponsive}>
        <ComposedChart
          //   width={1000}
          //   height={300}
          data={data}
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
          <Tooltip active={true} />
          {/* <Brush 
            dataKey="date"
            tickFormatter={(value) => (new Date(value)).toLocaleDateString("DD-MM")}
            travellerWidth={40}
          /> */}
          {/* <Tooltip /> */}
          {/* <Legend /> */}

          <Line dataKey="lifeline" stroke="#FF9A00" strokeWidth={2} type="basis" layout="vertical" />
          <Line dataKey="selected" stroke="#FF9A00" strokeWidth={2} type="basis" layout="vertical" label />


          {types.map((type, i) => ((section && type === section) || !section) && (
            <Fragment key={type}>
              {/* <Line dataKey={type} stroke={lineColors[i]} strokeWidth={5} type="natural" layout="vertical" /> */}
              <Area type="basis" dataKey={type} stroke={lineColor || lineColors[i]} fill={lineColor || lineColors[i]} />
              {/* <Line dataKey="status" stroke={lineColors[i]} strokeWidth={5} type="basis" layout="vertical" /> */}
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

export default Chart;