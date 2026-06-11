import { Analytics } from '@vercel/analytics/react';
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <Todo />
      <Analytics />
    </>
  );
}

export default App;
