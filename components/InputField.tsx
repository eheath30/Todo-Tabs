import React, { useRef } from "react";
import styles from "../styles/Input.module.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleNewTask: (e: React.FormEvent) => void;
}

export default function InputField({ todo, setTodo, handleNewTask }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={styles.input}
      onSubmit={(e) => {
        handleNewTask(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="input"
        ref={inputRef}
        placeholder="Enter a task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className={styles.input__box}
      />
      <button className={styles.input__submit} type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

      </button>
    </form>
  );
}
