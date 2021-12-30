import Head from 'next/head'
import { Fragment, useState } from 'react'
import faker from 'faker'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import UserIcon from '../components/icons/user'
import PlusIcon from '../components/icons/plus'
import Form from '../components/form'
import Icons from '../components/icons';
// import Chart from '../components/chart';
// import LineChart from '../components/lineChart';
import AreaChart from '../components/areaChart';
import ProgressBar from '../components/progressBar';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import Label from '../components/customLabel';


const icons = [
  'camera',
  'pets',
  'restaurant',
  'savings',
  'wallet',
  'celebration'
]

const types = [
  'expense',
  'investment',
  'balance'
]

const presupuestos = [
  {
    id: 'week',
    name: 'Gastos de la semana',
    period: 'week',
    budget: 50,
    value: faker.datatype.number({
      'min': 1000,
      'max': 4000
    }),
  },
  {
    name: 'fin de semanas',
    period: 'weekly',
    days: ['S, D'],
    budget: 5000,
    value: 200,
  }
]

// Hardcoded transactions
// const transactionsPreloaded = [
//   {
//     type: 'expense',
//     description: 'Rabbit',
//     price: 200,
//     date: faker.date.past(),
//     icon: icons[0]
//   },
//   {
//     type: 'expense',
//     description: 'Wifi',
//     price: 1500,
//     date: faker.date.past(),
//     icon: icons[0]
//   },
//   {
//     type: 'balance',
//     description: 'Sueldo',
//     price: 4500,
//     date: faker.date.past(),
//     icon: icons[1]
//   },
//   {
//     type: 'balance',
//     description: 'Freelo',
//     price: 1500,
//     date: faker.date.past(),
//     icon: icons[2]
//   },
//   {
//     type: 'investments',
//     description: 'ETH',
//     price: 4500,
//     date: faker.date.past(),
//     icon: icons[3]
//   },
//   {
//     type: 'investments',
//     description: 'Bitcoin',
//     price: 1500,
//     date: faker.date.past(),
//     icon: icons[4]
//   },
// ];

const lineColors = [
  '#C32BAD',
  '#7027A0',
  '#1DB9C3'
]

const budgets = [
  'week',
  ''
]

const mockLength = 20;
const generateManyTransactions = (quantity) => {
  const transactions = [];
  for (let i = 0; i < quantity; i++) {
    const type = faker.random.arrayElement(types)
    transactions.push({
      type,
      budget: type === 'expense' ? faker.random.arrayElement(budgets) : '',
      description: faker.random.words(),
      price: type === 'balance' ? faker.datatype.number({
        'min': 5,
        'max': 30
      }) : faker.datatype.number({
        'min': 2,
        'max': 10
      }),
      date: faker.date.past(),
      icon: faker.random.arrayElement(icons)
    });
  }
  return transactions;
}

// Generated transactions
const transactionsPreloaded = generateManyTransactions(mockLength);



export default function Home() {
  const [active, SetActive] = useState(false);
  const [form, setForm] = useState({})
  const [mode, setMode] = useState('graph');
  const [section, setSection] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState('');
  // const [filter, setFilter] = useState('');
  const [transactions, setTransactions] = useState(transactionsPreloaded);
  const [data, setData] = useState([]);
  const [targetTransaction, setTargetTransaction] = useState();

  const dollarsFormat = Intl.NumberFormat('en-US');

  const handleSelectBudget = (e) => selectedBudget === e ? setSelectedBudget('') : setSelectedBudget(e);
  const handleAdd = () => setMode('add');
  const handleExit = () => {
    setForm(targetTransaction);
    setMode('graph')
    setTransactions([{
      ...targetTransaction
    },
    ...transactions
    ]);
    setTargetTransaction(false);
  }

  const handleSection = (e, value) => {
    if (value === section) {
      setSection(false)
      e.target.parentNode.focus();

    }
    else
      setSection(value);
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const randomize = () => {
    setTransactions(generateManyTransactions(mockLength))
  }

  const handleSelectedTransaction = (e) => {
    console.log(e)
    const newTransactions = transactions.map(el => {
      if (el === e)
        return {
          ...el,
          selected: true
        }
      return el
    })

    const update = Object.assign([], newTransactions);
    console.log(update)
    setTransactions([])
    setTransactions([...newTransactions])
  }

  const balance = transactions.reduce((acc, i) => i.type === 'balance' ? acc = acc + i.price : acc, 0);
  const lastItem = transactions && transactions[0];

  console.log(targetTransaction);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Welcome</h1>
        <button className={styles.menu}>
          <UserIcon />
        </button>
      </header>

      <main className={mode === 'add' ? styles.form : {}}>
        {
          mode === 'add' && (
            <Form
              handleUpdate={setTargetTransaction}
              onExit={handleExit}
              values={targetTransaction}
            />
          )
        }
        {
          mode !== 'add' && (
            <Fragment>
              {/* // <Chart types={types} randomize={randomize} transactions={transactions} /> */}
              {/* <LineChart types={types} randomize={randomize} transactions={transactions} /> */}
              <AreaChart types={types} randomize={randomize} transactions={transactions} section={section} data={data} setData={setData} />
              {/* <AreaChart types={[types[0]]} randomize={randomize} transactions={transactions} lineColor={lineColors[0]} /> */}
              {/* <AreaChart types={[types[1]]} randomize={randomize} transactions={transactions} lineColor={lineColors[1]} /> */}
              {/* <AreaChart types={[types[0]]} randomize={randomize} transactions={transactions} lineColor={lineColors[2]} /> */}
            </Fragment>
          )
        }

      </main>
      <aside className={styles.main}>
        {/* Lifeline */}
        {
          data && data.length > 1 && (
            <div className={`${styles.transaction} ${styles.primary} `}>
              <div className={styles.transactionLabel}>Dinero en cuenta</div>
              <div className={`${styles.transactionCard} ${styles.featured}`}>
                <div className={styles.price}>{
                  formatter.format(data.slice(-1).pop().lifeline)}</div>
                <Icons icon="coin" />
              </div>
              {/* <div className={styles.description}>Dinero en cuenta</div> */}
              {/* <div className={styles.radial}>
                <RadialBarChart 
                width={200} 
                height={200} 
                  innerRadius="100%" 
                  outerRadius="50%" 
                  data={[
                    {
                      label: 'money',
                      max: balance,
                      current: lastItem.lifeline
                    },
                  ]} 
                  min={0}
                  max={balance}
                  startAngle={240} 
                  endAngle={-60}
                >
                  <RadialBar minAngle={15} background label={<Label />} clockWise={true} fill="#ff8484" dataKey='max' />
                  <RadialBar minAngle={15} background clockWise={true} fill="#FF5151" dataKey='current' />
                  <Tooltip />
                </RadialBarChart>
              </div> */}
            </div>
          )
        }
        <ProgressBar
          id={presupuestos[0].id}
          name={presupuestos[0].name}
          budget={presupuestos[0].budget}
          handleSelect={handleSelectBudget}
          value={transactions.reduce((acc, el) => {
            el.budget === presupuestos[0].id ? acc = acc + el.price : acc;
            return acc;
          }, 0)}
        />

        {/* Resumen */}
        {
          !selectedBudget && (
            <div className={styles.resume}>
              {/* <label>Resume</label> */}
              <div className={`${styles.expense} ${section && section !== 'expense' && styles.deactive}`} onClick={(e) => handleSection(e, 'expense')}>
                <h3>{formatter.format(transactions.reduce((acc, i) => i.type === 'expense' ? acc = acc + i.price : acc, 0))}</h3>
                <p>Expenses</p>
              </div>
              <div className={`${styles.investments}  ${section && section !== 'investment' && styles.deactive}`} onClick={(e) => handleSection(e, 'investment')}>
                <h3>{formatter.format(transactions.reduce((acc, i) => i.type === 'investment' ? acc = acc + i.price : acc, 0))}</h3>
                <p>Investments</p>
              </div>
              <div className={`${styles.balance}  ${section && section !== 'balance' && styles.deactive}`} onClick={(e) => handleSection(e, 'balance')}>
                <h3>{formatter.format(balance)}</h3>
                <p>Ingresos</p>
              </div>
            </div>
          )
        }
        {/* Lista de transacciones */}
        <div className={styles.transactions}>
          {
              !targetTransaction &&
            (
              transactions.length > 0 &&
              !selectedBudget ||
              lastItem && selectedBudget === lastItem.budget) && (
              <div className={styles.transaction}>
                <div className={styles.transactionLabel}>Ultimo movimiento</div>
                <div className={`${styles.transactionCard} ${styles[`color-${lastItem.type}`]}`}>
                  <div className={styles.price}>{dollarsFormat.format(lastItem.price)}</div>
                  <div className={styles.description}>{lastItem.description}</div>
                  <Icons icon={lastItem.icon} active={true} type={lastItem.type} />
                </div>
              </div>
            )
          }
          {
            targetTransaction &&
            (
              <div className={styles.transaction}>
                <div className={styles.transactionLabel}>Ultimo movimiento</div>
                <div className={`${styles.transactionCard} ${styles[`color-${targetTransaction.type}`]}`}>
                  <div className={styles.price}>{dollarsFormat.format(targetTransaction.price)}</div>
                  <div className={styles.description}>{targetTransaction.description}</div>
                  <Icons icon={targetTransaction.icon} active={true} type={targetTransaction.type} />
                </div>
              </div>
            )
          }
          <div className={styles.divider} />
          {
            transactions
              .slice(targetTransaction ? 0 : 1)
              .filter(e => !section.length && !selectedBudget || !selectedBudget && e.type === section || selectedBudget && e.budget === selectedBudget)
              .map((transaction, i) => (
                <div
                  key={transaction.description + i}
                  className={styles.transaction}
                  onClick={() => {
                    console.log('click')
                    handleSelectedTransaction(transaction)
                  }}
                >
                  <div className={`${styles.transactionCard} ${styles[`color-${transaction.type}`]}`}>
                    <div className={styles.price}>{dollarsFormat.format(transaction.price)}</div>
                    <div className={styles.description}>{transaction.description}</div>
                    <Icons icon={transaction.icon} active={true} type={transaction.type} />
                  </div>
                </div>
              ))
          }
        </div>
        {/* New transaction button */}
        <div className={`${styles.addTransaction} ${active ? '' : styles.deactive}`} onClick={() => SetActive(!active)}>
          <div className={styles.actionLabel}>Nuevo movimiento</div>
          <button className={styles.action} onClick={handleAdd}>
            <PlusIcon />
          </button>
        </div>
      </aside>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
