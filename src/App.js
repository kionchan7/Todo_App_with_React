import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [deadline_Date, setDeadline_Date] = useState("");
  const [todos, setTodos] = useState([]); //  array of object
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputDescribtion, setDescription] = useState("");
  const [due, setdue] = useState("");

  useEffect(() => {
    getLocalTodos();
  }, []);

  //  Use Effect
  //  Functions will run when todos or status or searchTerm is used
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status, searchTerm]);

  //  Function to filter what kind of todo to render
  //  3 choices: All, Completed, and Uncompleted
  const filterHandler = () => {
    setSearchTerm(searchTerm);
    switch (status) {
      case "completed":
        setFilteredTodos(
          todos.filter(
            (todo) =>
              todo.completed === true &&
              todo.text.includes(searchTerm) |
                todo.description.includes(searchTerm)
          )
        );
        break;
      case "uncompleted":
        setFilteredTodos(
          todos.filter(
            (todo) =>
              todo.completed === false &&
              todo.text.includes(searchTerm) |
                todo.description.includes(searchTerm)
          )
        );
        break;
      default:
        setFilteredTodos(
          todos.filter(
            (todo) =>
              todo.text.includes(searchTerm) |
              todo.description.includes(searchTerm)
          )
        );
        break;
    }
  };

  //  Save to local storage
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Get local todos
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  //  Search function
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      setFilteredTodos(
        todos.filter((todo) =>
          todo.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredTodos(todos);
    }
  };

  //  Form and TodoList
  return (
    <div className="App">
      <header>
        <h1>Ki's To-do List</h1>
      </header>

      <Form
        deadline_Date={deadline_Date}
        setDeadline_Date={setDeadline_Date}
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
        term={searchTerm}
        searchKeyword={searchHandler}
        setDescription={setDescription}
        inputDescribtion={inputDescribtion}
        due={due}
        setdue={setdue}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
        setdue={setdue}
        due={due}
      />
    </div>
  );
}

export default App;
