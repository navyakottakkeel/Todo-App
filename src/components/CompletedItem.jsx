import { AiOutlineDelete } from "react-icons/ai";

function CompletedItem({
  item,
  index,
  handleDeleteCompleteTodo,
}) {
  return (
    <div className="todo-list-item">
      <div className="todo-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>

        <p>
          <small>
            Completed On : {item.completedOn}
          </small>
        </p>
      </div>

      <div className="todo-actions">
        <AiOutlineDelete
          className="del-icon"
          onClick={() =>
            handleDeleteCompleteTodo(index)
          }
        />
      </div>
    </div>
  );
}

export default CompletedItem;