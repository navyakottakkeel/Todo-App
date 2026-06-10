import { AiOutlineDelete } from "react-icons/ai";

function AllItem({ item, index, handleDeleteAllTodo, type }) {
  return (
    <div className="todo-list-item">
      <div className="todo-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.completedOn ? <p>
          <small>Completed On : {item.completedOn}</small>
        </p> : ''}
      </div>

      <div className="todo-actions">
        <AiOutlineDelete
          className="del-icon"
          onClick={() => handleDeleteAllTodo(index, type)}
        />
      </div>
    </div>
  );
}

export default AllItem;
