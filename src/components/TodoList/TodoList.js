import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./TodoList.scss";

let currentId = 0;
export const TodoList = () => {
  const [todos, updateTodoList] = useState([]);
  const [searchTerm, updateSearchTerm] = useState("");

  const renderTodoItem = todo => {
    const { name, status, id } = todo;
    return (
      <div className={`todo-item ${status ? "completed" : ""}`} key={id}>
        <div className="name">{name}</div>
        <div className="actions">
          <Button variant="danger" onClick={() => deleteTodo(todo)}>
            Delete
          </Button>
          <Button variant="success" onClick={() => completeTodo(todo)}>
            Complete
          </Button>
        </div>
      </div>
    );
  };

  const renderTodoList = () => {
    return getFilteredTodo().map(renderTodoItem);
  };

  const addNewTodo = e => {
    const todo = e.target[0].value || "";
    e.preventDefault();
    if (todo) {
      todos.push({
        id: currentId++,
        name: todo.trim(),
        status: false
      });
      e.target[0].value = "";
      updateTodoList([...todos]);
    }
  };

  const deleteTodo = ({ id }) => {
    const newTodos = todos.filter(t => {
      return t.id !== id;
    });

    updateTodoList([...newTodos]);
  };

  const completeTodo = ({ id, status }) => {
    if (!status) {
      todos.forEach(t => {
        if (t.id === id) {
          t.status = true;
        }
      });

      updateTodoList([...todos]);
    }
  };

  const renderItemList = () => {
    return <div className="empty-list">I'm lonely now</div>;
  };

  const searchTodo = e => {
    e.preventDefault();
    const searchTerm = (e.target[0].value || "").toLowerCase().trim();
    updateSearchTerm(searchTerm);
  };

  const getFilteredTodo = () => {
    return todos.filter(t => {
      return searchTerm === "" || t.name.toLowerCase().includes(searchTerm);
    });
  };

  const renderSearchbar = () => {
    return (
      <Form onSubmit={searchTodo}>
        <Form.Control placeholder="search todo" />
      </Form>
    );
  };

  return (
    <div className="todo-list">
      <h3>To Do List</h3>
      <div className="cotainer">
        <div className="search-bar">{renderSearchbar()}</div>
        {todos.length > 0 ? renderTodoList() : renderItemList()}
        <Form onSubmit={addNewTodo}>
          <Form.Control placeholder="Enter new todo item..." />
        </Form>
      </div>
    </div>
  );
};
