import Image from 'next/image';
import styles from '../page.module.css';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Image src="/icon.png" alt="Logo" width={100} height={100} priority />
      <div className={styles['title-nav-container']}>
        <h1 className={styles['hero-title']}>Stonelinks</h1>
        <ul className={styles['nav-list']}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/posts">Posts</a>
          </li>
          <li>
            <a href="/todo">Projects</a>
          </li>
          <li>
            <a href="/todo">About</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
