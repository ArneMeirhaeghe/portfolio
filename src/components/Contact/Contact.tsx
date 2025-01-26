import React from "react";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  return (
    <section className={styles.contact}>
      <h2 className={styles.title}>Neem contact op</h2>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Naam"
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          className={styles.input}
          required
        />
        <textarea
          placeholder="Bericht"
          className={styles.textarea}
          required
        />
        <button type="submit" className={styles.button}>
          Verzenden
        </button>
      </form>
    </section>
  );
};

export default Contact;
