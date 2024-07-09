export default class Task {
    #task = new Set()
    save({ name, dueAt, fn}){
        console.log(`task [${name}] saved and will be executed at ${dueAt.toISOString()}`)
        this.#task.add({ name, dueAt, fn })
    }
    run(everyMs){
        setInterval(() => {
            const now = new Date()
            if(this.#task.size === 0) {
                console.log('task finished')
                clearInterval()
                return
            }
            for(const task of this.#task){
                if(task.dueAt <= now){
                    task.fn()
                    this.#task.delete(task)
                }
            }
        }, everyMs)
    }
}