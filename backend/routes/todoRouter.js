const { createTodo, fetchAllTodos, updateTodo, deleteTodo } = require('../controllers/todoController');

const router =  require('express').Router();

// to get all todos
router.get('/', fetchAllTodos);

// to create todo
router.post('/', createTodo);

// to update todo
router.put('/:id', updateTodo)

// to delete todo
router.delete('/:id', deleteTodo);

module.exports = router;