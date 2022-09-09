import React from "react";
import styles from "../../styles/list.module.css";
import TodoItem from '../components/Todo'
import {Todo} from '../taskModel'


interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<string>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className={styles.container}>


        {todos.map((t) => (
                <TodoItem
                todo={t}
                key={t.id}
                todos={todos}
                setTodos={setTodos}
                />
        ))}

    </div>
  );
};

export default TodoList;
