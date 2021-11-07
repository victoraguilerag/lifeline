import { useState} from 'react';
// import styles from '../../styles/Form.module.css'
import homeStyles from '../styles/Home.module.css'

function Form ({
    onChange,
}) {
    let timeout;
    const [value, setValue] = useState(90)
    const handleChange = (e) => {
        setValue(e.target.value);
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            onChange(e.target.value);
        }, 1000)
    };
    return  (
        <div className={homeStyles.options}>
            <input
                type="number"
                className={homeStyles.rangeLabel}
                defaultValue={value}
                onChange={handleChange}
                min="0"
                max="100"
                value={value}
                tickmarks
            />
            <input
                type="range"
                min="0"
                max="100"
                defaultValue={value}
                value={value}
                onChange={handleChange}
                step="10">
                {/* <div className={`${homeStyles.transactionCard} ${homeStyles[`color-expense`]}`}>
                <div className={homeStyles.price}>Expenses</div>
                <div className={homeStyles.description}></div>
                </div> */}
            </input>
        </div>
    )
}

export default Form;