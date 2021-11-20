import { style } from 'd3-selection';
import styles from '../styles/ProgressBar.module.css'

const progressBar = ({
  progress,
  value,
  name,
  budget
}) => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.name}>{name}</div>
      {/* <div className={styles.budget}>{budget}</div> */}
      {/* <div style={{left: progress}} className={styles.cursor}>{value}</div> */}
      <div className={styles.bar}>
        <div style={{width: progress}} className={styles.progress} data-progress={progress}>
          <div className={styles.progressValue}>{value}</div>
        </div>
        <div className={styles.barValue}>
          {budget}
        </div>
      </div>
    </div>
  )
}

export default progressBar;
