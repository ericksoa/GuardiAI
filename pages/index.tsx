// File: pages/index.tsx
import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GuardiAI</title>
        <meta name="description" content="Automated PR security review using OpenAI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/GuardiAI">GuardiAI</a>!
        </h1>

        <p className={styles.description}>
          An automated PR security review bot powered by OpenAI.
        </p>

        <div className={styles.grid}>
          <a href="https://github.com/settings/tokens/new" className={styles.card}>
            <h2>Step 1: Generate a GitHub Token &rarr;</h2>
            <p>Click here to create a personal access token with 'repo' scope on GitHub.</p>
          </a>

          <a href="https://beta.openai.com/signup/" className={styles.card}>
            <h2>Step 2: Sign up for OpenAI API &rarr;</h2>
            <p>Click here to sign up for an OpenAI API key.</p>
          </a>

          <a href="/api/setup" className={styles.card}>
            <h2>Step 3: Setup your GuardiAI instance &rarr;</h2>
            <p>Follow the instructions to setup your GuardiAI instance with GitHub and OpenAI tokens.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/GuardiAI"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by GuardiAI
        </a>
      </footer>
    </div>
  );
}
