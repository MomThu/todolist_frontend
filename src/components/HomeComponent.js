import React from "react";
import NewTask from "./NewTaskComponent";
import TodoList from "./TodoListComponent";

function Home() {
    return (
        <div className="container">
            <div className="new-task">
                <NewTask />
            </div>
            <div className="todolist">
                <TodoList />
            </div>
        </div>
    );
}

export default Home;