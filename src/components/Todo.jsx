import { useEffect, useState } from "react";
import "../App.css";

import TodoInput from "./TodoInput";
import TodoButtons from "./TodoButtons";
import TodoItem from "./TodoItem";
import CompletedItem from "./CompletedItem";


function Todo() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  const [allTodos, setTodos] = useState([]);

  const [newTitle, setNewTitle] = useState("");

  const [newDescription, setNewDescription] = useState("");

  const [completedTodos, setCompletedTodos] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (!newTitle.trim()) {
      alert("Title is required");
      return;
    }

    if (!newDescription.trim()) {
      alert("Description is required");
      return;
    }

    const newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    const updatedTodoArr = [...allTodos, newTodoItem];

    setTodos(updatedTodoArr);

    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));

    setNewTitle("");
    setNewDescription("");
  };

  const handleEdit = (index) => {
    setNewTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);

    setEditIndex(index);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = [...allTodos];

    updatedTodos[editIndex] = {
      title: newTitle,
      description: newDescription,
    };

    setTodos(updatedTodos);

    localStorage.setItem("todolist", JSON.stringify(updatedTodos));

    setNewTitle("");
    setNewDescription("");

    setEditIndex(null);
  };

  const handleDeleteTodo = (index) => {
    const reducedTodo = [...allTodos];

    reducedTodo.splice(index, 1);

    setTodos(reducedTodo);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
  };

  const handleComplete = (index) => {
    const now = new Date();

    const completedOn =
      now.getDate() +
      "-" +
      (now.getMonth() + 1) +
      "-" +
      now.getFullYear() +
      " at " +
      now.getHours() +
      ":" +
      now.getMinutes() +
      ":" +
      now.getSeconds();

    const filteredItem = {
      ...allTodos[index],
      completedOn,
    };

    const updatedCompletedArr = [...completedTodos, filteredItem];

    setCompletedTodos(updatedCompletedArr);

    localStorage.setItem(
      "completetodolist",
      JSON.stringify(updatedCompletedArr)
    );

    handleDeleteTodo(index);
  };

  const handleDeleteCompleteTodo = (index) => {
    const reducedCompletedTodo = [...completedTodos];

    reducedCompletedTodo.splice(index, 1);

    setCompletedTodos(reducedCompletedTodo);

    localStorage.setItem(
      "completetodolist",
      JSON.stringify(reducedCompletedTodo)
    );
  };

  useEffect(() => {
    const savedTodo = localStorage.getItem("todolist");

    const savedCompletedTodo = localStorage.getItem("completetodolist");

    if (savedTodo && savedTodo !== "undefined") {
      try {
        setTodos(JSON.parse(savedTodo));
      } catch (error) {
        console.error(error);
      }
    }

    if (savedCompletedTodo && savedCompletedTodo !== "undefined") {
      try {
        setCompletedTodos(JSON.parse(savedCompletedTodo));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <TodoInput
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          handleAddTodo={handleAddTodo}
          handleUpdateTodo={handleUpdateTodo}
          editIndex={editIndex}
        />

        <TodoButtons
          isCompleteScreen={isCompleteScreen}
          setIsCompleteScreen={setIsCompleteScreen}
        />

        <div className="todo-list">
          {!isCompleteScreen &&
            allTodos.map((item, index) => (
              <TodoItem
                key={index}
                item={item}
                index={index}
                handleDeleteTodo={handleDeleteTodo}
                handleComplete={handleComplete}
                handleEdit={handleEdit}
              />
            ))}

          {isCompleteScreen &&
            completedTodos.map((item, index) => (
              <CompletedItem
                key={index}
                item={item}
                index={index}
                handleDeleteCompleteTodo={handleDeleteCompleteTodo}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;