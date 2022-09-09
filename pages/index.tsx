import React, {useState} from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import InputField from './components/InputField'
import {Todo} from '../lib/taskModel';
import TodoList from './components/TodoList';


const Home: NextPage = () => {
const [todo, setTodo] = useState<string>("");
const [todos, setTodos] = useState<Array<Todo>>([]);

const handleNewTask = (e: React.FormEvent) => {
e.preventDefault();


if(todo) {
  const d = new Date();
  setTodos([...todos,{id:Date.now(), todo, date: d, isCompleted:false}])
  setTodo("")
}

};
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Todo List</title>
        <meta name="description" content="NextJS todo list" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⏱</text></svg>"/>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossOrigin="anonymous"></link>
      </Head>

      <main className="container d-flex flex-column align-items-center">
        <h1  className="display-2 my-5">
          Next<sub className='display-6'>JS</sub>⠀Todo Tabs
        </h1>

        <InputField todo={todo} setTodo={setTodo} handleNewTask={handleNewTask}/>
        <TodoList todos={todos} setTodos={setTodos}/>

      </main>

      <footer className="footer mt-5">
        <a
        className={styles.github__link}
          href="https://github.com/eheath30"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed by Elliot Heath



        </a>
      </footer>
    </div>
  )
}

export default Home
