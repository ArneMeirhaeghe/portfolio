import React from "react";
import styles from "./Skills.module.css";

const Skills: React.FC = () => {
  const skills = ["JavaScript", "TypeScript", "PHP", "React", "Node.js"];

  return (
    <section className={styles.skills}>
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.grid}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.card}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
