function TodoButtons({ isCompleteScreen, setIsCompleteScreen, allScreen, setAllScreen }) {
  return (
    <div className="btn-area">
      <button
        className={`secondaryBtn ${!isCompleteScreen && !allScreen ? "active" : ""}`}
        onClick={() => {
          setIsCompleteScreen(false) 
          setAllScreen(false)
        }}
      >
        Todo
      </button>

      <button
        className={`secondaryBtn ${isCompleteScreen && !allScreen ? "active" : ""}`}
        onClick={() => {
          setIsCompleteScreen(true) 
          setAllScreen(false)
        }}
      >
        Completed
      </button>

      <button
        className={`secondaryBtn ${!isCompleteScreen && allScreen ? "active" : ""}`}
        onClick={() => {
          setIsCompleteScreen(false) 
          setAllScreen(true)
        }}
      >
        All
      </button>
    </div>
  );
}

export default TodoButtons;
