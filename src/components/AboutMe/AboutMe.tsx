import React from "react";
import styles from "./AboutMe.module.css";

const AboutMe: React.FC = () => {
  return (
    <section className={styles.aboutMe}>
      <h2 className={styles.title}>Over Mij</h2>
      <p className={styles.text}>
        Ik ben een gepassioneerde Full Stack Developer met ervaring in
        JavaScript, TypeScript, PHP en meer. Mijn focus ligt op het maken van
        interactieve en gebruiksvriendelijke websites.
      </p>
    </section>
  );
};

export default AboutMe;
