import React from "react";
import TaskForm from "./TaskFormComponent";

function NewTask() {
    return (
        <div>
            <h2 className="title">New Task</h2>
            <div>
                <TaskForm isNewTask={true} />
            </div>
        </div>
    )
}

export default NewTask;