function TodoInput({
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  handleAddTodo,
  handleUpdateTodo,
  editIndex,
}) {
  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label>Title</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What's the task title?"
        />
      </div>

      <div className="todo-input-item">
        <label>Description</label>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="What's the task description?"
        />
      </div>

      <div className="todo-input-item">
        <button
          type="button"
          className="primaryBtn"
          onClick={editIndex !== null ? handleUpdateTodo : handleAddTodo}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default TodoInput;
