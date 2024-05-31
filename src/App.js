import { Component } from "react";
import NavBar from "./components/NavBar";
import TaskForm from './components/TaskForm'
import './App.css'

class App extends Component{

  render(){
    return(
      <div className="bgContainer">
        <NavBar/>
        <TaskForm/>
      </div>
    )
  }
}

export default App