import React from "react";
import { fetchOneTask, RemoveOneTask, fetchAllTasks } from "../redux/ActionCreators";
import { connect } from "react-redux";
import TaskForm from "./TaskFormComponent";

// Dispatch from redux
const mapDispatchToProps = dispatch => ({
    fetchAllTasks: () => dispatch(fetchAllTasks())
})

// One task component in To do list
function Task(props) {
    const [isOpenDetail, setOpenDetail] = React.useState(false);
    const [task, setTask] = React.useState({});

    // Action when click Detail button
    const handleClickDetail = (event) => {
        event.preventDefault();
        // Fetch information of one task  
        const fetchData = async () => {
            try {
                const data = await fetchOneTask(props.id);
                setTask(data);
            } catch (error) {
                alert(error.message);
            }
        }
        // Fetch and open table show detail information
        if (isOpenDetail === false) {
            fetchData();
        }
        setOpenDetail(!isOpenDetail);
    }

    // Action when click Remove button of one task
    const handleClickRemove = (event) => {
        event.preventDefault();
        // Remove task of the list task by id
        const deleteTask = async () => {
            try {
                await RemoveOneTask(props.id);
                await props.fetchAllTasks();
            } catch (error) {
                alert(error.message)
            }
        }
        deleteTask()
    }

    //Action when tick to checkbox, add or remove one task by id to delete list tasks, check when hide bulk action  
    const handleCheck = (event) => {
        if (event.target.checked) {
            let temp = props.deleteList;
            temp.push(props.id);
            props.setDeleteList(temp);
            props.setHideBulk(props.hideBulk + 1);
        } else {
            let temp = props.deleteList;
            temp = temp.filter(id => id !== props.id);
            props.setDeleteList(temp);
            props.setHideBulk(props.hideBulk - 1);
        }

    }
    
    return (
        <div className="task">
            <div className="task-title">
                <input type="checkbox" onChange={(event => { handleCheck(event) })} />
                <label>{props.name}</label>
                <div className="detail-remove">
                    <button className="button-detail" onClick={(event) => handleClickDetail(event)}>Detail</button>
                    <button className="button-remove" onClick={(event) => handleClickRemove(event)}>Remove</button>
                </div>
            </div>
            {isOpenDetail &&
                <div className="task-info">
                    <TaskForm task={task} />
                </div>
            }
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Task);