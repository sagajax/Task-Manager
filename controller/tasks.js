const asyncWraper = require('../middlewear/async')
const Task = require('../models/Task')


const getAllTasks = asyncWraper(
    async (req, res) => {

        const tasks = await Task.find({})
        console.log(tasks)
        res.status(200).json({ tasks })
    })

const createTask = asyncWraper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})


const getTask = asyncWraper(async (req, res) => {

    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError)
        return res.status(404).json({ msg: `No task with id :${taskID}` })
    }
    res.status(200).json({ task })
})
const updateTask = asyncWraper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!task) {
        return res.status(404).json({ msg: `No task with id :${taskID}` })
    }
    res.status(200).json({ task })
})
const deleteTask = asyncWraper(async (req, res) => {

    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return res.status(404).json({ msg: `No task with id :${taskID}` })
    }
    res.status(200).json({ task })

})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}