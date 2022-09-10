import React from "react";
import styles from "../styles/list.module.css"
import TodoItem from './Todo'
import {Todo} from '../lib/taskModel'


interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className={styles.container}>


        {todos?.map((todo) => (
                <TodoItem
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                />
        ))}

    </div>
  );
};

export default TodoList;
