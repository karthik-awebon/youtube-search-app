import React from 'react';
import styles from './Loading.module.css';
function Loader() {
  return (
    <div className={styles.skeletonVideoList}>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonTitle}></div>
      </div>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonTitle}></div>
      </div>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonTitle}></div>
      </div>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonTitle}></div>
      </div>
    </div>
  );
}

export default Loader;
