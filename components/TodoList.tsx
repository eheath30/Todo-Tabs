import React from "react";
import styles from "../styles/list.module.css";
import TodoItem from "./Todo";
import { Todo } from "../lib/taskModel";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
  setBacklogTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  BacklogTodos: Array<Todo>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
  BacklogTodos,
  setBacklogTodos,
}) => {
  return (
    <div className={styles.container}>
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`${styles.todos} ${
              snapshot.isDraggingOver ? styles.dragactive : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className={`${
              snapshot.isDraggingOver ? styles.headingactive : styles.headingnormal
            }`}>Active Tasks</span>
            {todos?.map((todo, index) => (
              <TodoItem
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.todos}  ${
              snapshot.isDraggingOver ? styles.dragcomplete : styles.remove
            }`}
          >
            <span className={`${
              snapshot.isDraggingOver ? styles.headingactive : styles.headingnormal
            }`}>Completed Tasks</span>
            {CompletedTodos?.map((todo, index) => (
              <TodoItem
                index={index}
                todos={CompletedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosBacklog">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.todos}  ${
              snapshot.isDraggingOver ? styles.dragbacklog : styles.backlog
            }`}
          >
            <span className={`${
              snapshot.isDraggingOver ? styles.headingactive : styles.headingnormal
            }`}>Backlog</span>
            {BacklogTodos?.map((todo, index) => (
              <TodoItem
                index={index}
                todos={BacklogTodos}
                todo={todo}
                key={todo.id}
                setTodos={setBacklogTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
