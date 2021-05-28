import React, { useState } from "react";
import Countdown from "./Countdown/Countdown.js";
import { Tooltip } from "react-tippy";

//  Implemented the delete button, complete buttons, task name, description button, description, 
//  start date/due date button, start date, due date, time remaining button, time remaining
const Todo = ({
  different,
  deadline_Date,
  text,
  date,
  todo,
  todos,
  setTodos,
  description,
  setdue,
  due,
}) => {
  const [isOpen_todo, setIsOpen_todo] = useState(false);
  const [isOpen_start_due_date, setIsOpen_start_due_date] = useState(false);
  const [isOpen_remainingTime, setIsOpen_remainingTime] = useState(true);

  //  Events
  //  Filter out the state, trying to find an element that matches with whatever clicked on.
  //  Then, it will get rid of that todo
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  //  Filter out the state, trying to find an element that matches with whatever clicked on.
  //  Then, switch that todo's completed property from false to true and vice versa
  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  //  Filter out the state, trying to find an element that matches with whatever clicked on.
  //  Then, switch that todo's Due property to true
  const dueHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            Due: true,
          };
        }
        return item;
      })
    );
  };

  //  Render the To-do List with the Start Date, the Due Date, and the Time Remaining based
  //  on the selection (All, Completed, Uncompleted)
  return (
    <div>
      {/* Have animated Dash line when the task is due but not completed */}
      <div
        className={`${todo.Due && !todo.completed ? "todoWarning" : "todo"}`}
      >
        {/* Completed button and delete button with tooltip */}
        <div>
          <Tooltip
            arrow={true}
            title="Completed"
            position="top"
            trigger="mouseenter"
          >
            <button onClick={completeHandler} className="complete-btn">
              <i className="fas fa-check"></i>
            </button>
          </Tooltip>

          <Tooltip
            arrow={true}
            title="Delete"
            position="top"
            trigger="mouseenter"
          >
            <button onClick={deleteHandler} className="trash-btn">
              <i className="fas fa-trash"></i>
            </button>
          </Tooltip>
        </div>

        {/* Task name with fixed width  */}
        <li_fixedWidth
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          {text}
        </li_fixedWidth>

        {/* Description button and start date / due date button with tooltip */}
        <div>
          <Tooltip
            arrow={true}
            title="Description"
            position="top"
            trigger="mouseenter"
          >
            <button
              onClick={() => setIsOpen_todo(!isOpen_todo)}
              className="lightbulb-btn"
            >
              <i className="fas fa-lightbulb"></i>
            </button>
          </Tooltip>

          <Tooltip
            arrow={true}
            title="Start Date / Due Date"
            position="top"
            trigger="mouseenter"
          >
            <button
              onClick={() => setIsOpen_start_due_date(!isOpen_start_due_date)}
              className="bell-btn"
            >
              <i className="fas fa-bell"></i>
            </button>
          </Tooltip>
        </div>

        {/* Collapse or expand the start date / due date if the button is clicked */}
        <div>
          {isOpen_start_due_date && (
            <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
              <Tooltip
                arrow={true}
                title="Start Date"
                position="top"
                trigger="mouseenter"
              >
                {date}
              </Tooltip>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Tooltip
                arrow={true}
                title="Due Date"
                position="top"
                trigger="mouseenter"
              >
                {deadline_Date}
              </Tooltip>
            </li>
          )}
        </div>

        {/* Time Remaining button with tooltip */}
        <Tooltip
          arrow={true}
          title="Time Remaining"
          position="top"
          trigger="mouseenter"
        >
          <button
            onClick={() => setIsOpen_remainingTime(!isOpen_remainingTime)}
            className="hourglass-start-btn"
          >
            <i className="fas fa-hourglass-start"></i>
          </button>
        </Tooltip>

        {/* Collapse or expand the time remaining if the time remaining button is clicked */}
        <Tooltip
          arrow={true}
          title="Time Remaining"
          position="top"
          trigger="mouseenter"
        >
          <div>
            {isOpen_remainingTime && (
              <div>
                <li
                  className={`todo-item ${todo.completed ? "completed" : ""}`}
                >
                  <li
                    className={`todo-item ${
                      todo.Due && !todo.completed ? "due" : ""
                    }`}
                  >
                    <Countdown
                      dueDate={deadline_Date}
                      setdue={setdue}
                      dueHandler={dueHandler}
                    />
                  </li>
                </li>
              </div>
            )}
          </div>
        </Tooltip>
      </div>

      {/* Collapse or expand the Description if the description button is clicked */}              
      <div className="todo_Description">
        <li>
          {isOpen_todo && (
            <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
              <h5>
                <b>Description: </b>
              </h5>
              <p>{description}</p>
            </div>
          )}
        </li>
      </div>
    </div>
  );
};

export default Todo;
