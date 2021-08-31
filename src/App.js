import React, { Component } from "react";
import TodoItem from "./TodoItem";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoInput: "",
      searchInput: "",
      todos: window.localStorage.getItem("items")
        ? JSON.parse(window.localStorage.getItem("items"))
        : [],
    };
  }

  //get value given in input box named as enter your task to do
  handleTodoInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      todoInput: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    alert(`A todo was added: ${this.state.todoInput}`);
    // Add the new todo to the list
  };

  //list the given task in ul after clicking add button
  handleAddClick = (e) => {
    e.preventDefault();
    if (this.state.todoInput !== "") {
      const todoInput = this.state.todoInput;
      const todo = {
        todoText: todoInput,
        completed: false,
        editMode: false,
      };
      const todosCloned = this.state.todos.slice();
      todosCloned.push(todo);
      window.localStorage.setItem("items", JSON.stringify(todosCloned));
      this.setState({
        todos: todosCloned,
        todoInput: "",
      });
    }
  };
  handleSearchInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      searchInput: value,
    });
  };
  //remove todo
  handleRemoveTodos = (index) => {
    const todosCloned = this.state.todos.slice();
    todosCloned.splice(index, 1);
    this.setState({
      todos: todosCloned,
    });
    window.localStorage.setItem("items", JSON.stringify(todosCloned));
  };

  //clear all todo item while clicking clear all button
  handleClearAllClick = () => {
    this.setState({
      todos: [
        /**
         * {
         *   todoText: "Write a poem",
         *   completed: false,
         *   editMode: false
         * }
         */
      ],
    });
    window.localStorage.setItem("items", JSON.stringify([]));
  };

  handleTodoCompleted = (index) => {
    const todosCloned = this.state.todos.slice();
    const prevCompletedState = todosCloned[index].completed;
    todosCloned[index].completed = !prevCompletedState;
    this.setState({
      todos: todosCloned,
    });
  };
  //search tasks
  searchTodo = () => {
    return this.state.todos.filter((todo) => {
      return todo.todoText
        .toLowerCase()
        .includes(this.state.searchInput.toLowerCase());
    });
  };
  handleEditMode = (index) => {
    const todosCloned = this.state.todos.slice();
    const prevEditMode = todosCloned[index].editMode;
    todosCloned[index].editMode = !prevEditMode;

    this.setState({
      todos: todosCloned,
    });
  };

  handleEditTodoChange = (event, index) => {
    const todosCloned = this.state.todos.slice();
    const value = event.target.value;
    todosCloned[index].todoText = value;
    this.setState({
      todos: todosCloned,
    });
  };
  render() {
    const filtered = this.searchTodo();
    const noTodo = this.state.todos.length === 0;
    return (
      <div className="todo-container">
        <h2>My Todo App</h2>
        <div className="container-content">
          <div className="input-container">
            <form onSubmit={this.handleAddClick}>
              <input
                type="todo-text"
                id="myTask"
                placeholder="Enter your task to do...."
                onChange={this.handleTodoInputChange}
                value={this.state.todoInput}
              />
              <button type="submit" id="add-todo">
                Add Task
              </button>
              {noTodo ? null : <hr />}
              {noTodo ? null : (
                <input
                  type="text"
                  className="form-control "
                  placeholder="Search your todos...."
                  id="searchInput"
                  onChange={this.handleSearchInputChange}
                  value={this.state.searchInput}
                />
              )}
              {noTodo ? null : (
                <button
                  type="submit"
                  id="clear-todo"
                  onClick={this.handleClearAllClick}
                >
                  Clear All
                </button>
              )}
            </form>
          </div>
          <div>
            <ul className="todo-lists" id="todo-lists">
              {filtered.map((todo, i) => {
                return (
                  <TodoItem
                    key={i}
                    todoText={todo.todoText}
                    completed={todo.completed}
                    onTodoCompleted={() => {
                      this.handleTodoCompleted(i);
                    }}
                    onRemove={() => {
                      this.handleRemoveTodos(i);
                    }}
                    editMode={todo.editMode}
                    onEditMode={() => {
                      this.handleEditMode(i);
                    }}
                    onEditTodoChange={(e) => {
                      this.handleEditTodoChange(e, i);
                    }}
                  />
                );
              })}
            </ul>
            {/* <pre>
              <code>{JSON.stringify(this.state, null, 2)}</code>
            </pre> */}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
