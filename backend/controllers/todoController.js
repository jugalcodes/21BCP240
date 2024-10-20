const todoModel = require("../models/todoModel");

const createTodo = async (req, res) => {
    const data = req.body;
    try{
        const model = new todoModel(data);
        await model.save();
        res.status(201)
            .json({message: 'Todo is created', success: true });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Failed to create Todo', success: false})
    }
}

const fetchAllTodos = async (req, res) => {
    try {
        const data = await todoModel.find({});
        res.status(201)
            .json({message: "All Todos fetched", success: true, data})
    } catch (error) {
        res.status(500).json({message: "Failed to Fetch all Todos", success: false})
    }
}

const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const body= req.body;
        const obj = {$set: {...body}};
        await todoModel.findByIdAndUpdate(id, obj)
        res.status(200).json({message: "Todo updated Successfully", success: true})

    } catch (error) {
        res.status(500).json({message: "Failed to update the Todo", success: false})
    }
}

const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        await todoModel.findByIdAndDelete(id)      
        res.status(200).json({message: "Todo Deleted Successfully", success: true}) 
    } catch (error) {
        res.status(500).json({message: "Failed to Delete the Todo", success: false})
    }
}

module.exports = {
    createTodo,
    fetchAllTodos,
    updateTodo,
    deleteTodo
    
}