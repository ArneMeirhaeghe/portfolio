import React, { useEffect } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  useEffect(() => {
    gsap.fromTo(
      `.${styles.heroText}`,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.3 }
    );
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.heroText}>Hi, ik ben Arne Meirhaeghe</h1>
        <p className={styles.heroText}>
          Full Stack Developer - Creatief en gepassioneerd door webontwikkeling
        </p>
        <div className={styles.buttons}>
          <a href="#projects" className={styles.buttonPrimary}>
            Bekijk mijn werk
          </a>
          <a href="#contact" className={styles.buttonSecondary}>
            Neem contact op
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
