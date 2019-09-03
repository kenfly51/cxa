import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import TodoList from "./components/TodoList";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
