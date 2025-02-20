import { useEffect, useState } from "react"

export default function Todo(){

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [todos, setTodo]= useState([]);
    const [error, setError]= useState("");
    const [message, setMessage]= useState("");
    const [editId, setEditId]= useState(-1);

    const [editTitle,setEditTitle] = useState("");
    const [editDescription,setEditDescription] = useState("");
    const apiUrl = "http://127.0.0.1:8000"
    
    const handleSumbit = () =>{
        setError("")
        //check input
        if (title.trim() !== '' && description.trim() !== '') {
            fetch(apiUrl+"/todos", {
                method: "post",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({title,description})
            }).then((res)=>{
                if (res.ok) {
                    setTodo([...todos,{title,description}])
                    setMessage("Item added successfully")
                    setTimeout(() => {
                        setMessage("")
                    },3000);
                }else{
                    //set error
                    setError("Unable to create Todo item")
                }
            }).catch(()=>{
                setError("Unable to create Todo item")
            })
            // add item to list
            
        }
    }
    useEffect(()=>{
        getItem()
    },[])
    
    const getItem = ()=>{
        fetch(apiUrl+"/todos")
        .then((res)=> res.json())
        .then((res)=>{
            setTodo(res)
        })
    }

    const handleEdit = (item)=>{
        setEditId(item._id);
        setEditTitle(item.title);
        setDescription(item.description)
    }

    const handleUpdate = (item)=>{
      
    }

    



    return <> <div className="row p-3 bg-success text-light text-center">
            <h1>ToDo Project with mern stack</h1>
        </div>
        <div className="row ">
            <h3>Add Item</h3>
            {{message}&&<p className="text-success " >{message}</p>}
            <div className="form-gorup d-flex gap-2 " >
            <input placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} className="form-control" type="text" />
            <input placeholder="Description" onChange={(e)=> setDescription(e.target.value)} value={description} className="form-control" type="text" />
            <button className="btn btn-dark " onClick={handleSumbit} >Sumbit</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="row mt-3" >
            <h3>Tasks</h3>
            <ul className="list-group">
                {
                    todos.map((item)=>
                        <li className="list-group-item bg-info d-flex  justify-content-between align-items-center my-2 " >
                    <div className="d-flex flex-column me-2" >
                        {
                            editId == -1 || editId !== item._id ? <>
                             <span className="fw-bold" >{item.title}</span>
                             <span >{item.description}</span>
                            </> : <>
                                <div className="form-gorup d-flex gap-2 " >
                                <input placeholder="Title" onChange={(e)=> setEditTitle(e.target.value)} value={editTitle} className="form-control" type="text" />
                                <input placeholder="Description" onChange={(e)=> setEditDescription(e.target.value)} value={editDescription} className="form-control" type="text" />
    
                </div>
                            </>
                        }
                       
                    </div>
                    
                    <div className="d-flex gap-2">
                        { editId == -1 || editId !== item._id ? <button className="btn btn-warning" onClick={()=>handleEdit(item)} >Edit</button>:<button className="btn btn-warning" onClick={handleUpdate} >Update</button>}
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </li>
                )
                }
                
            </ul>
        </div>
        </>
}