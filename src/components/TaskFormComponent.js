import React from "react";
import { fetchAllTasks, postTask, UpdateOneTask } from "../redux/ActionCreators";
import { connect } from "react-redux";

// Dispatch from redux
const mapDispatchToProps = dispatch => ({
    fetchAllTasks: () => dispatch(fetchAllTasks())
})

// Form show the information filed of the task to add or update task
function TaskForm(props) {
    // Fields of task
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
    const [priority, setPriority] = React.useState("normal");

    /* Action when props.task change. When click detail and show information of one task, fetching data will do in TaskComponent
    and pass to TaskForm throught props */
    React.useEffect(() => {
        if (props.task) {
            if (props.task._id) {
                setName(props.task.name);
                setDescription(props.task.description);
                setDate(props.task.dueDate.split('T')[0]);
                setPriority(props.task.priority);
            }
        }
    }, [props.task])

    // Handle when type input task name
    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    // Handle when type input task description
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    // Handle when type input task date
    const handleChangeDate = (event) => {
        setDate(event.target.value);
    }

    // Handle when type input task priority
    const handleChangePriority = (event) => {
        setPriority(event.target.value);
    }

    // Action when click Add button
    const handleSubmitAdd = async (event) => {
        event.preventDefault();
        // Validation task name
        if (name.length === 0) {
            alert('Task title is required!');
            return;
        }
        const newTask = {
            name: name,
            description: description,
            dueDate: date,
            priority: priority
        }
        try {
            await postTask(newTask);
            alert("Add task success");
            props.fetchAllTasks();
            setName("");
            setDescription("");
            setDate(new Date().toISOString().split('T')[0]);
            setPriority("normal");
        } catch (error) {
            alert(error.message);
        }
    }

    // Action when click Update button
    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        const updateTask = {
            name: name,
            description: description,
            dueDate: date,
            priority: priority
        }
        try {
            await UpdateOneTask(props.task._id, updateTask);
            alert("Update success");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <form className="form-container">
                {props.isNewTask &&
                    <div>
                        <input className="form-component" type="text" name="name" value={name} placeholder="Add new task..." onChange={(event) => handleChangeName(event)} />
                    </div>
                }
                {!props.isNewTask &&
                    <div>
                        <input className="form-component" type="text" name="name" value={name} disabled onChange={(event) => handleChangeName(event)} />
                    </div>
                }
                <div>
                    <label className="form-component">
                        Description <br />
                        <textarea className="form-component" type="text" name="description" value={description} onChange={(event) => handleChangeDescription(event)} />
                    </label>
                </div>
                <div className="form-split">
                    <div className="form-component">
                        <label>
                            Due Date <br />
                            <input type="date" name="date" value={date} min={new Date().toISOString().split('T')[0]} onChange={(event) => handleChangeDate(event)} />
                        </label>
                    </div>
                    <div className="form-component">
                        <label>
                            Priority <br />
                            <select value={priority} onChange={(event) => handleChangePriority(event)}>
                                <option value="normal">Normal</option>
                                <option value="low">Low</option>
                                <option value="high">High</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div>
                    {props.isNewTask &&
                        <label>
                            <input className="form-component submit" type="submit" value="Add" onClick={(event) => handleSubmitAdd(event)} />
                        </label>
                    }
                    {!props.isNewTask &&
                        <label>
                            <input className="form-component submit" type="submit" value="Update" onClick={(event) => handleSubmitUpdate(event)} />
                        </label>
                    }
                </div>
            </form>
        </div>

    )
}

export default connect(null, mapDispatchToProps)(TaskForm);