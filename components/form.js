import { Fragment, useState } from 'react';
import styles from '../styles/Form.module.css'
import homeStyles from '../styles/Home.module.css'
import RangeInput from './range';
import Icons from './icons';

const steps = [
    'type',
    'price',
    'method',
    'period',
    'name',
    'congrats'
];

const types = [
    'expense',
    'investments',
    'balance'
]

const methods = [
    'efectivo',
    'debito',
    'credito'
];

const periods = [
    'anualmente',
    'mensualmente',
    'no'
]

const icons = [
    'camera',
    'pets',
    'restaurant',
    'savings',
    'wallet',
    'celebration'
]

function Form ({
    onExit,
}) {
    let nameTimeout;
    const [step, setStep] = useState(steps[0]);
    const [values, setValues] = useState({});

    const handleType = (type) => {
        const newValues = {
            ...values,
            type,
        }
        setValues(newValues);
        scrollToItem('price')
    }

    const handlePrice = (price) => {
        const newValues = {
            ...values,
            price,
        }
        setValues(newValues);
        scrollToItem('method')
    }

    const handleMethod = (method) => {
        const newValues = {
            ...values,
            method,
        }
        setValues(newValues);
        scrollToItem('period')
    }

    const handlePeriod = (period) => {
        const newValues = {
            ...values,
            period,
        }
        setValues(newValues);
        scrollToItem('name')
    }

    const handleName = (name) => {
        const newValues = {
            ...values,
            name,
        }
        setValues(newValues);
        scrollToItem('congrats')

        // const timeout = setTimeout(() => {
        //     onExit(newValues)
        //     clearTimeout(timeout);
        // }, 3000);
    }

    const handleIcon = (icon) => {
        console.log(icon)
        const newValues = {
            ...values,
            icon,
        }
        setValues(newValues);

        if (timeout) clearTimeout(timeout);
        const timeout = setTimeout(() => {
            onExit(newValues)
            clearTimeout(timeout);
        }, 3000);
    }

    const handleNameTimeout = (name) => {
        if (nameTimeout) clearTimeout(nameTimeout);
        nameTimeout = setTimeout(() => {
            handleName(name)
        }, 2000);
    }

    const scrollToItem = (value) => {
        const nextStep = document.getElementById(value);
        nextStep.scrollIntoView({
            behavior: 'smooth'
        })
    }

    const handleKeyDown = (e) => {
        console.log(e.key)
        if (e.key === 'Enter') handleName(e.target.value);
    }

    console.log(values);
    return  (
        <div className={styles.form}>
            <div className={homeStyles.state}>
                <div className={homeStyles.options}>
                    {
                        steps.map(step => (
                            <Fragment key={values[step]}>
                                {
                                    values[step] && (
                                        <div
                                            className={`
                                                ${homeStyles.transaction}
                                                ${values[step] ? homeStyles.action : ''}
                                                
                                            `}
                                            onClick={() => scrollToItem(step)}
                                        >
                                            <div
                                                className={`
                                                    ${homeStyles.transactionCard}
                                                    ${step === 'type' && homeStyles[`color-${values[step]}`]}
                                                `}
                                            >
                                                <div className={homeStyles.price}>{values[step]}</div>
                                                <div className={homeStyles.description}></div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Fragment>
                        ))
                    }
                </div>
            </div>
            {/* Tipo de Transaccion */}
            <div id="type" className={styles.divider} />
            <div className={`${styles.step}`}>
                <div className={styles.label}>Que tipo de transaccion quieres hacer?</div>
                <div className={homeStyles.options}>
                    {
                        types.map((type) => (
                            <div
                                key={type}
                                className={`
                                    ${homeStyles.transaction}
                                    ${values.type && values.type !== type ? homeStyles.deactive : ''}
                                `}>
                                <div
                                    className={`${homeStyles.transactionCard} ${homeStyles[`color-${type}`]}`}
                                    onClick={() => handleType(type)}
                                >
                                    <div className={homeStyles.price}>{type}</div>
                                    <div className={homeStyles.description}></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Precio de la transaccion */}
            <div id="price" className={styles.divider} />
            <div className={`${styles.step}`}>
                <div className={styles.label}>Cual es el monto de la transaction?</div>
                <RangeInput onChange={handlePrice} />
            </div>

            {/* Cuenta con la que se pago */}
            <div id="method" className={styles.divider} />
            <div className={`${styles.step}`}>
                <div className={styles.label}>Que metodo de pago usaste para hacer la transaccion?</div>
                <div className={homeStyles.options}>
                    {
                        methods.map((method) => (
                            <div
                                key={method}
                                className={`
                                    ${homeStyles.transaction}
                                    ${values.method && values.method !== method ? homeStyles.deactive : ''}
                                `}>
                                <div
                                    className={homeStyles.transactionCard}
                                    onClick={() => handleMethod(method)}
                                >
                                    <div className={homeStyles.price}>{method}</div>
                                    <div className={homeStyles.description}></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Se repitira esta transaction */}
            <div id="period" className={styles.divider} />
            <div className={`${styles.step}`}>
                <div className={styles.label}>Repetiras esta transaccion?</div>
                <div className={homeStyles.options}>
                    {
                        periods.map((period) => (
                            <div
                                key={period}
                                className={`
                                    ${homeStyles.transaction}
                                    ${values.period && values.period !== period ? homeStyles.deactive : ''}
                                `}>
                                <div
                                    className={homeStyles.transactionCard}
                                    onClick={() => handlePeriod(period)}
                                >
                                    <div className={homeStyles.price}>{period}</div>
                                    <div className={homeStyles.description}></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Nombre de la transaccion */}
            <div id="name" className={styles.divider} />
            <div className={`${styles.step}`}>
                <div className={styles.label}>Cual es el nombre de la transacción?</div>
                <div className={homeStyles.options}>
                    <div className={homeStyles.transaction}>
                        <div className={`${homeStyles.transactionCard}`}>
                        <input 
                            type="text"
                            pattern="[A-Za-z]"
                            className={styles.price}
                            placeholder="Que compraste"
                            onChange={(e) => handleNameTimeout(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className={homeStyles.description}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmación de la transacción */}
            <div id="congrats" className={styles.divider} />
            <div className={`${styles.step}`}>
                <div className={styles.label}>Felicitaciones, tu transacción se guardo! 🎉</div>
                <div className={homeStyles.options}>
                    <div className={homeStyles.transaction}>
                    <div className={`${homeStyles.transactionCard} ${homeStyles[`color-${values.type}`]}`}>
                        <div className={homeStyles.price}>{values.price}</div>
                        <div className={homeStyles.description}>{values.name}</div>
                        </div>
                    <Icons icon={values.icon} active={true} />
                    </div>
                </div>
                <div className={homeStyles.icons}>
                    <div className={homeStyles.iconText}>Pick an icon for your transaction</div>
                    {
                        icons.map(iconId => <Icons key={iconId} icon={iconId} active={values.icon === iconId} handleIcon={handleIcon} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Form;