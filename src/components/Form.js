import React, { useRef } from "react";
import "tippy.js/dist/tippy.css";
import Typed from "react-typed";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { Description } from "./Description";
import { BrowserRouter, Route } from "react-router-dom";

const Form = ({
  deadline_Date,
  setDeadline_Date,
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  searchKeyword,
  setDescription,
  inputDescribtion,
}) => {
  const inputSearch_Ref = useRef("");

  //  Every time our input changes, this function will runs to update the state
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const deadline_Date_Handler = (e) => {
    setDeadline_Date(e.target.value);
  };

  //  When we hit submit, this function will runs to empty the inputs and create an object with
  //  the task name, the status of complete, a random id, the assign time, and the due date
  //  Empty input is not allowed
  const submitTodoHandler = (e) => {
    e.preventDefault();
    var myCurrentDate = new Date();

    var date =
      myCurrentDate.getFullYear() +
      "-" +
      (myCurrentDate.getMonth() + 1) +
      "-" +
      myCurrentDate.getDate() +
      " " +
      myCurrentDate.getHours() +
      ":" +
      myCurrentDate.getMinutes() +
      ":" +
      myCurrentDate.getSeconds();

    if (inputText !== "" && deadline_Date !== "") {
      setTodos([
        ...todos,
        {
          text: inputText,
          date: date,
          completed: false,
          id: Math.random() * 1000,
          deadline_Date: deadline_Date.replace("T", " ") + ":00",
          description: inputDescribtion,
          Due: false,
        },
      ]);
    }
    setInputText("");
    setDeadline_Date("");
  };

  //  Every time we changes the filter-todo, this function will runs to update the state status
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };


  var today = new Date().toISOString().substring(0, 16);

  //  Get the search term
  const getSearchTerm = () => {
    searchKeyword(inputSearch_Ref.current.value);
  };

  return (
    <form>
      {/* Search for task or description */}
      <div>
        <input
          id="inputSearch"
          ref={inputSearch_Ref}
          type="text"
          placeholder="Search"
          onChange={getSearchTerm}
        />
      </div>

      <button className="search-btn" type="submit">
        <i className="fas fa-search"></i>
      </button>
      <div>
        <p> &nbsp;&nbsp;&nbsp;&nbsp; </p>
      </div>

      {/* Set Due Date for the task */}
      <Tooltip
        arrow={true}
        title="Set Due Date Ex. 06/01/2021, 00:00 AM"
        position="top"
        trigger="mouseenter"
        interactive={true}
      >
        <div>
          <input
            value={deadline_Date}
            onChange={deadline_Date_Handler}
            type="datetime-local"
            className="todo-input1"
            min={today}
          />
        </div>
      </Tooltip>

      {/* Enter the name of the task */}
      <div>
        <Typed
          strings={["Enter Task"]}
          typeSpeed={40}
          backSpeed={50}
          attr="placeholder"
          loop
        >
          <input
            type="text"
            value={inputText}
            onChange={inputTextHandler}
            className="todo-input"
            maxLength="20"
          />
        </Typed>
      </div>

      {/* Task Input   */}
      <Tooltip
        arrow={true}
        title="Add Description"
        position="top"
        trigger="mouseenter"
      >
      
      {/* Get and set description*/}
        <BrowserRouter>
          <Route
            component={() => (
              <Description setDescription={setDescription} />
            )}
          />
        </BrowserRouter>
      </Tooltip>

      {/* Submit To-do task */}
      <Tooltip arrow={true} title="Enter" position="top" trigger="mouseenter">
        <button
          onClick={submitTodoHandler}
          className="todo-button"
          type="submit"
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </Tooltip>

      {/* Render Selection (All, Completed, Uncompleted) */}
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
