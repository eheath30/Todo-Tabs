import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../lib/taskModel";
import styles from "../styles/todo.module.css";
import { Draggable } from "react-beautiful-dnd";
import Modal from "./modal";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
};

const TodoItem: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [editTodoDescription, setEditTodoDescription] = useState<string>(
    todo.description
  );
  let currentDate = todo.date.toString()
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleCompleted = (id: number) => {
    setTodos(
      todos?.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleEditDescription = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, description: editTodoDescription } : todo
      )
    );
    setEdit(false);
  };

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <form
            onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${styles.todo__item} ${
              snapshot.isDragging ? styles.drag : ""
            }`}
          >
            {" "}
            <sup className={styles.todo__item__date}>{currentDate}</sup>
            <div>
              {edit ? (
                <>
                  <input
                    value={editTodo}
                    onChange={(e) => {
                      setEditTodo(e.target.value);
                    }}
                    className={styles.todo__itemtext}
                    ref={inputRef}
                  />
                  <button>Submit</button>
                </>
              ) : todo.isCompleted ? (
                <s className={styles.todo__itemtext}>{todo.todo} </s>
              ) : (
                <span className={styles.todo__itemtext}>{todo.todo} </span>
              )}
            </div>
            <section className={styles.icons__and__modal__btns}>
              <div className={styles.icon__list}>
                <span
                  className={styles.icon}
                  onClick={() => {
                    if (!edit && !todo.isCompleted) {
                      setEdit(!edit);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                    style={{ width: "25px", height: "25px" }}
                  >
                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                  </svg>
                </span>
                <span
                  className={styles.icon}
                  onClick={() => handleDelete(todo.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                    style={{ width: "25px", height: "25px" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span
                  className={styles.icon}
                  onClick={() => handleCompleted(todo.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                    style={{ width: "25px", height: "25px" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <button
                className={styles.modal__button}
                onClick={() => setIsOpen(true)}
              >
                More
              </button>
            </section>
          </form>
        )}
      </Draggable>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="todomodal">
          <section className={styles.inside__todo__modal}>
            <span className={styles.todo__modal__item}>Title: {todo.todo}</span>
            <span className={styles.todo__modal__item}>Date added: N.A</span>
            <span className={styles.todo__modal__item}>Description:</span>
            <form onSubmit={(e) => handleEditDescription(e, todo.id)}>
              {editDescription ? (
                <>
                  <input
                    value={editTodoDescription}
                    onChange={(e) => setEditTodoDescription(e.target.value)}
                    className={styles.todo__singledescription}
                    ref={inputRef}
                  />
                  <button
                    className="icon"
                    onClick={() => {
                      setEditDescription(!editDescription);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                      style={{ width: "25px", height: "25px" }}
                    >
                      <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.description}</span>
                  <button
                    className="icon"
                    onClick={() => {
                      setEditDescription(!editDescription);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                      style={{ width: "25px", height: "25px" }}
                    >
                      <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                    </svg>
                  </button>
                </>
              )}
            </form>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default TodoItem;
