import Head from "next/head";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    console.log(data);
    setResult((prev) => [...prev, data.result]);
    setAnimalInput("");
  }

  console.log(result);
  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <button onClick={() => toast.success("Yay you clicked thi")}>
          Toat!
        </button>
        <Toaster />
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>
          <p>{result}</p>
          {result.map((el) => {
            return <p>{el}</p>;
          })}
        </div>
      </main>
    </div>
  );
}
