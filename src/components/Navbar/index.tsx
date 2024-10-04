import styles from "./styles.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">Bienvenidos al Pokedex</Link>
    </nav>
  );
}
