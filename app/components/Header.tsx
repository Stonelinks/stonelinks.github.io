import Image from 'next/image';
import styles from '../page.module.css';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Image src="/icon.png" alt="Logo" width={100} height={100} priority />
      <div className={styles['title-nav-container']}>
        <h1 className={styles['hero-title']}>Stonelinks</h1>
        <ul className={styles['nav-list']}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/todo">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
