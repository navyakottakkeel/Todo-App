import { useEffect, useState } from "react";
import "../App.css";

import TodoInput from "./TodoInput";
import TodoButtons from "./TodoButtons";
import TodoItem from "./TodoItem";
import CompletedItem from "./CompletedItem";
import AllItem from "./AllItem";

function Todo() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  const [allTodos, setTodos] = useState([]);

  const [newTitle, setNewTitle] = useState("");

  const [newDescription, setNewDescription] = useState("");

  const [completedTodos, setCompletedTodos] = useState([]);

  const [allScreen, setAllScreen] = useState(false);

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

  const handleDeleteAllTodo = (index, type) => {
    if (type === "todo") {
      const reducedTodo = [...allTodos];
      reducedTodo.splice(index, 1);
      setTodos(reducedTodo);

      localStorage.setItem("todolist", JSON.stringify(reducedTodo));
      return;
    }

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
      <div className="app-header">
      <h1>
    My <span>TodoFlow</span>
  </h1>
      <p>Plan • Track • Complete</p>
      </div>
      

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
          allScreen={allScreen}
          setAllScreen={setAllScreen}
        />

        <div className="todo-list">
          {!isCompleteScreen &&
            !allScreen &&
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
            !allScreen &&
            completedTodos.map((item, index) => (
              <CompletedItem
                key={index}
                item={item}
                index={index}
                handleDeleteCompleteTodo={handleDeleteCompleteTodo}
              />
            ))}

          {!isCompleteScreen &&
            allScreen &&
            allTodos.map((item, index) => (
              <AllItem
                key={index}
                item={item}
                index={index}
                type="todo"
                handleDeleteAllTodo={handleDeleteAllTodo}
              />
            ))}
          {!isCompleteScreen &&
            allScreen &&
            completedTodos.map((item, index) => (
              <AllItem
                key={index}
                item={item}
                index={index}
                type="completed"
                handleDeleteAllTodo={handleDeleteAllTodo}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
