import React from "react";
import Todo from "./Todo";

//  For each Todo from the state, render out a Todo component
const TodoList = ({ todos, setTodos, filteredTodos, setdue, due }) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            setTodos={setTodos}
            deadline_Date={todo.deadline_Date}
            date={todo.date}
            todos={todos}
            key={todo.id}
            todo={todo}
            text={todo.text}
            id={todo.id}
            description={todo.description}
            setdue={setdue}
            due={due}
          />
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
