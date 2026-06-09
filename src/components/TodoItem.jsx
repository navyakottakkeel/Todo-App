import { AiOutlineDelete } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineModeEdit } from "react-icons/md";

function TodoItem({
  item,
  index,
  handleDeleteTodo,
  handleComplete,
  handleEdit,
}) {
  return (
    <div className="todo-list-item">
      <div className="todo-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      <div className="todo-actions">
        <MdOutlineModeEdit
          className="edit-icon"
          onClick={() => handleEdit(index)}
        />

        <AiOutlineDelete
          className="del-icon"
          onClick={() => handleDeleteTodo(index)}
        />

        <GiCheckMark
          className="check-icon"
          onClick={() => handleComplete(index)}
        />
      </div>
    </div>
  );
}

export default TodoItem;
