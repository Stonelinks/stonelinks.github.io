import styles from '../page.module.css';
import { Header } from './Header';

export const PageWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={styles.main}>
      <Header />
      {children}
      <footer>© Lucas Doyle {new Date().getFullYear()}</footer>
    </div>
  );
};
