import React, { useState } from "react";
import styles from "./Nav.module.css";

const colorPairs = [
  { name: "Blue & Sand", primary: "#0033cc", secondary: "#f0eae1" },
  { name: "Dark & Grey", primary: "#3c3c3c", secondary: "#c7c2c2" },
  { name: "Cyan & Purple", primary: "#5ee2f0", secondary: "#9d5ee2" },
  { name: "Red & Yellow", primary: "#a83232", secondary: "#e2bc32" },
  { name: "Blue & White", primary: "#0033cc", secondary: "#ffffff" },
];

const Nav: React.FC = () => {
  const [activePair, setActivePair] = useState(colorPairs[0]);

  const handleColorChange = (primary: string, secondary: string) => {
    setActivePair({ name: "", primary, secondary });
    document.documentElement.style.setProperty("--primary-color", primary);
    document.documentElement.style.setProperty("--secondary-color", secondary);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Mijn Portfolio</div>
      <ul className={styles.navLinks}>
        <li>
          <a href="#hero" className={styles.navLink}>
            Home
          </a>
        </li>
        <li>
          <a href="#about-me" className={styles.navLink}>
            Over Mij
          </a>
        </li>
        <li>
          <a href="#skills" className={styles.navLink}>
            Skills
          </a>
        </li>
        <li>
          <a href="#projects" className={styles.navLink}>
            Projecten
          </a>
        </li>
        <li>
          <a href="#contact" className={styles.navLink}>
            Contact
          </a>
        </li>
      </ul>
      <div className={styles.colorMenu}>
        <div className={styles.activePair}>
          <div
            className={styles.halfCircle}
            style={{ backgroundColor: activePair.primary }}
          ></div>
          <div
            className={styles.halfCircle}
            style={{ backgroundColor: activePair.secondary }}
          ></div>
        </div>
        <div className={styles.dropdown}>
          {colorPairs.map((pair, index) => (
            <div
              key={index}
              className={styles.colorPair}
              onClick={() => handleColorChange(pair.primary, pair.secondary)}
            >
              <div
                className={styles.halfCircle}
                style={{ backgroundColor: pair.primary }}
              ></div>
              <div
                className={styles.halfCircle}
                style={{ backgroundColor: pair.secondary }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
