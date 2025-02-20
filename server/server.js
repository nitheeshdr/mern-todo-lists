//Express
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
// create an instance of express
const app = express();

app.use(express.json())
app.use(cors())

// let todos = [];
//connection mongodb
mongoose.connect('mongodb://127.0.0.1:27017/mern-app')
.then(()=>{
    console.log('DB connected')
})
.catch((err)=>{
    console.log(err)
})

const todoschema = new mongoose.Schema(
    {
        title: {
            required: true,
            type:String
        },
        description: String
    }
)

//creating model

const todomodel = mongoose.model('Todo',todoschema);



app.post('/todos',async(req,res)=>{
    const {title,description,role}=req.body
    // const newTodo ={
    //     id: todos.length + 1,
    //     title,
    //     description
    // };
    // todos.push(newTodo);
    // console.log(todos);
    try {
        const newTodo = new todomodel({title,description,role});
        await newTodo.save();
        res.status(201).json(newTodo)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message});
    }
    
})

//get item
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await todomodel.find(); // Fetch all todos from MongoDB
        res.json(allTodos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.put("/todos/:id", async (req,res) =>{
    try {
        const {title,description} = req.body;
    const id = req.params.id;
    const updatedTodo = await todomodel.findByIdAndUpdate(
        id,
        {title,description},
        {new: true}
    )
    
    if(!updatedTodo){
        return res.status(404).json({message:"Todo not found"})
    }
    res.json(updatedTodo)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

})

//delete 
app.delete("/todos/:id", async (req,res) =>{
    try {
     const id = req.params.id;
     await todomodel.findByIdAndDelete(id);
    res.status(204).end()
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

//strat server
const port = 8000
app.listen(port, ()=>{
    console.log("server is listening to port"+port)
})

