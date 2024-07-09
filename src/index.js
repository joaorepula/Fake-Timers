import Task from "./task.js";

const oneSeconde = 1000
const runInASec = new Date(Date.now() + oneSeconde)
const runInATwosSecs = new Date(Date.now() + oneSeconde * 2)
const runInAThreeSecss = new Date(Date.now() + oneSeconde * 3)

const task = new Task()


task.save({
    name:'task1',
    dueAt: runInASec,
    fn: () => console.log('1')
})

task.save({
    name:'tas2',
    dueAt: runInATwosSecs,
    fn: () => console.log('2')
})

task.save({
    name:'task1',
    dueAt: runInAThreeSecss,
    fn: () => console.log('3')
})

task.run()