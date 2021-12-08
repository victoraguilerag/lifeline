import { useRef, useEffect } from 'react'
import styles from '../styles/ProgressBar.module.css'

function ProgressBar({
  value,
  id,
  name,
  budget,
  handleSelect
}) {
  const handleClick = () => handleSelect(id);
  useEffect(() => {
    const progress = (100 / budget) * value + "%";
    ref.current.style.width = progress;
  })
  const ref = useRef(null)
  return (
    <div
      className={styles.progressBar}
      onClick={handleClick}
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.budget}>{budget}</div>
      {/* <div style={{left: progress}} className={styles.cursor}>{value}</div> */}
      <div className={styles.bar}>
        <div ref={ref} className={styles.progress}>
          <div className={styles.progressValue}>{value}</div>
        </div>
        {/* <div className={styles.barValue}>{budget}</div> */}
      </div>
    </div>
  )
}

export default ProgressBar;
