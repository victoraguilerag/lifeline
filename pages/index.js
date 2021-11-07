import Head from 'next/head'
import { Fragment, useState } from 'react'
import faker from 'faker'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import UserIcon from './icons/user'
import PlusIcon from './icons/plus'
import Form from './components/form'
import Icons from './components/icons';
import Chart from './components/chart';
import LineChart from './components/lineChart';
import AreaChart from './components/areaChart';


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

const mockLength = 20;
const generateManyTransactions = (quantity) => {
  const transactions = [];
  for (let i = 0;i < quantity; i++) {
    transactions.push({
      type: faker.random.arrayElement(types),
      description: faker.random.words(),
      price: faker.datatype.number({
        'min': 2,
        'max': 10000
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
  const [transactions, setTransactions] = useState(transactionsPreloaded);
  const dollarsFormat = Intl.NumberFormat('en-US');

  const handleAdd = () => setMode('add');
  const handleExit = (values) => {
    setForm(values);
    setMode('graph')
    console.log('values')
    console.log(values)
    setTransactions([{
        price: values.price,
        description: values.name,
        type: values.type
      },
      ...transactions
    ]);
  }

  const randomize = () => {
    setTransactions(generateManyTransactions(mockLength))
  }

  console.log(transactions);
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
            <Form onExit={handleExit}/>
          )
        }
        {
          mode !== 'add' && (
            <Fragment>
            {/* // <Chart types={types} randomize={randomize} transactions={transactions} /> */}
              {/* <LineChart types={types} randomize={randomize} transactions={transactions} /> */}
              <AreaChart types={types} randomize={randomize} transactions={transactions} />
              {/* <AreaChart types={[types[0]]} randomize={randomize} transactions={transactions} lineColor={lineColors[0]} /> */}
              {/* <AreaChart types={[types[1]]} randomize={randomize} transactions={transactions} lineColor={lineColors[1]} /> */}
              {/* <AreaChart types={[types[0]]} randomize={randomize} transactions={transactions} lineColor={lineColors[2]} /> */}
            </Fragment>
          )
        }

      </main>
      {
        mode !== 'add' && (
          <aside className={styles.main}>
            {/* Resumen */}
            <div className={styles.resume}>
              {/* <label>Resume</label> */}
              <div className={styles.resumeChart}>
                <div className={styles.expense}>
                  <h3>20.000</h3>
                  <div>Expenses</div>
                </div>
                <div className={styles.investments}>
                  <h3>5.000</h3>
                  <div>Investments</div>
                </div>
                <div className={styles.balance}>
                  <h3>18.000</h3>
                  <div>Balance</div>
                </div>
              </div>
            </div>
            {/* Lista de transacciones */}
            <div className={styles.transactions}>
              <div className={styles.transaction}>
                <div className={styles.transactionLabel}>Ultimo movimiento</div>
                <div className={`${styles.transactionCard} ${styles[`color-${transactions[0].type}`]}`}>
                  <div className={styles.price}>{dollarsFormat.format(transactions[0].price)}</div>
                  <div className={styles.description}>{transactions[0].description}</div>
                  <Icons icon={transactions[0].icon} active={true} type={transactions[0].type} />
                </div>
              </div>
              <div className={styles.divider} />
              {
                transactions
                .slice(1)
                .map((transaction, i) => (
                  <div key={transaction.description + i} className={styles.transaction}>
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
        )
      }
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
