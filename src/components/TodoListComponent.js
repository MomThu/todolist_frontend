import React from "react";
import { fetchAllTasks, RemoveOneTask } from "../redux/ActionCreators";
import { connect } from "react-redux";
import Task from "./TaskComponent";

// State from redux
const mapStateToProps = state => {
    return {
        tasks: state.all_tasks,
    }
}
// Dispatch from redux
const mapDispatchToProps = dispatch => ({
    fetchAllTasks: () => dispatch(fetchAllTasks())
})

// List of all task 
function TodoList(props) {
    const [deleteList, setDeleteList] = React.useState([]);
    const [hideBulk, setHideBulk] = React.useState(0);
    const [search, setSearch] = React.useState("");

    // Fetch data of all tasks
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                await props.fetchAllTasks();
            } catch (error) {
                alert(error.message);
            }
        }
        fetchData();
    }, [])

    /* Setting delete list to empty and hide bulk action when fetch data of all task from anywhere 
    (data in props.task is from redux store)*/
    React.useEffect(() => {
        setDeleteList([]);
        setHideBulk(0);
    }, [props.tasks])

    /* Action when click Remove button in Bulk Action 
     Due to delete request should not have body, in this case, we need to remove some tasks (may not at all),
     so, I send request delete for each task instead.*/
    const handleRemoveTasks = async (event) => {
        event.preventDefault();
        let promises = [];
        for (let i = 0; i < deleteList.length; ++i) {
            promises.push(RemoveOneTask(deleteList[i]));
        }
        Promise.all(promises).then(() => {
            alert("Remove succesfuly");
            props.fetchAllTasks();
        }, err => alert(err.message))
            .catch(err => alert(err.message));
    }

    // Handle when type input search
    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <div>
            <h2 className="title">To Do List</h2>
            <div className="content">
                <div>
                    <input id="search" className="form-component" type="text" name="name" value={search} placeholder="Search..." onChange={(event) => handleChangeSearch(event)} />
                </div>
                <div>
                    {props.tasks.tasks.filter(task => task.name.toLowerCase().startsWith(search.toLowerCase())).map(task => {
                        return (
                            <Task key={task._id} id={task._id} name={task.name} deleteList={deleteList} setDeleteList={setDeleteList} hideBulk={hideBulk} setHideBulk={setHideBulk} />
                        )
                    })}

                </div>
                {hideBulk !== 0 &&
                    <div className="bulk">
                        <p>Bulk Action:</p>
                        <div className="tick-done">
                            <button className="button-done-ticked">Done</button>
                            <button className="button-remove-ticked" onClick={(event) => handleRemoveTasks(event)}>Remove</button>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);