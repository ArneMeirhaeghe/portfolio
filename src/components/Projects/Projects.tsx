import React from "react";
import styles from "./Projects.module.css";

const Projects: React.FC = () => {
  const projects = [
    { title: "Project 1", video: "/path/to/video1.mp4" },
    { title: "Project 2", video: "/path/to/video2.mp4" },
  ];

  return (
    <section className={styles.projects}>
      <h2 className={styles.title}>Projecten</h2>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div key={index} className={styles.card}>
            <h3>{project.title}</h3>
            <video
              src={project.video}
              muted
              loop
              className={styles.video}
            ></video>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
