import React from 'react';
import styles from './Loading.module.css';
function Loader() {
  return (
    <ul className={styles.skeletonVideoList} data-testid='loading-component'>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
      <li className={styles.skeletonCard}>
        <figure className={styles.skeletonFigure}>
          <div className={styles.skeletonImage}></div>
          <figcaption className={styles.skeletonTitle}></figcaption>
        </figure>
      </li>
    </ul>
  );
}

export default Loader;
