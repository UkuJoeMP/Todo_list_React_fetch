import React, { useState, useEffect} from "react";

const initialTask = {
    label: "",
    is_done: false
}

const urlBase = "https://playground.4geeks.com/todo"

const Todos = () => {
    const [task, setTask] = useState(initialTask)
    const [taskList, setTaskList] = useState([])

    const handleChange = ({ target }) => {
        
        setTask({
            ...task,
            [target.name]: target.value
        })
    }

    const getAllTask = async() => {
        try {
            const response = await fetch(`${urlBase}/users/jose`)
            const data = await response.json()
        
            if (response.ok) {
                setTaskList(data.todos)
            } else {
                createNewUser()
            }

    }catch (error) {
            console.log(error)
        }
    }

    const createNewUser = async() => {
        try {
            const response = await fetch (`${urlBase}/users/jose`, {
                method: "POST"
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const addTask = async (event) => {
        if (event.key == "Enter") {
            try {
                const response = await fetch (`${urlBase}/todos/jose`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(task)
                })
                if (response.ok) {
                    getAllTask()
                }
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    const deleteTask = async(id) => {
        try {
            const response = await fetch (`${urlBase}/todos/${id}`, {
                method: "DELETE"
            })
            if (response.ok){
                getAllTask()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // const editTask = async(item) => {
    //     try {
    //         const response = await fetch (`${urlBase}/todos/${item.id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 label: item.label,
    //                 is_done: !item.is_done
    //             })
    //         })
    //         if (response.ok) {
    //             getAllTask()
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const handleCheckbox = (event) => {
    //     console.log(event.tar)
    // }

    useEffect(() => {
        getAllTask()
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-7">
                    <h1 className="title">todo list</h1>
                    <form onSubmit={(event)=>event.preventDefault()}>
                        <input 
                        type="text" 
                        placeholder="Add the task" 
                        className="form-control" 
                        name="label"
                        value={task.label}
                        onChange={handleChange}
                        onKeyDown={addTask}
                        />
                    </form>
                    {
                        taskList.length <=0 ? <div>No tiene tareas</div> :

                            taskList.map((item) => {
                                return (
                                    <div key={item.id} className="task">
                                        {item.label}
                                        <span>
                                            <button onClick={()=> deleteTask(item.id)}>X</button>
                                            {/* <button onClick={()=> editTask(item)}>E</button> */}
                                            {/* <input
                                                className="form=check=input mt-0"
                                                type="checkbox"
                                                aria-label="Checkbox for following text input"
                                                checked={item.is_done}
                                                onClick={()=> editTask(item)}
                                                /> */}
                                        </span>
                                    </div>
                                )
                            })
                    }
                </div> 
            </div>        
        </div>
    );
}
export default Todos