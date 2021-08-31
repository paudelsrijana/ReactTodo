import React from "react";
const TodoItem = (props) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={props.onTodoCompleted}
      />

      {props.editMode ? (
        <input
          value={props.todoText}
          onChange={props.onEditTodoChange}
          onBlur={props.onEditMode}
        />
      ) : (
        <span
          className={props.completed ? "todo-items" : ""}
          onDoubleClick={props.onEditMode}
        >
          {props.todoText}
        </span>
      )}
      <button type="submit" className=" delete-todo" onClick={props.onRemove}>
        Delete
      </button>
    </li>
  );
};
export default TodoItem;
