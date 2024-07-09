import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { setTimeout } from 'node:timers/promises';
import Task from '../src/task.js';

describe('#Task Test suite', () => {
    let _task;

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation();
        
        _task = new Task();
    });

    it.skip('should only run tasks that are due without fake timers (slow)', async () => {
        const tasks = [
            {
                name: 'task1',
                dueAt: new Date(Date.now() + 10_00), // 10 seconds from now
                fn: jest.fn(), // Mock function
            },
            {
                name: 'task2',
                dueAt: new Date(Date.now() + 5_00), // 5 seconds from now
                fn: jest.fn(), // Mock function
            }
        ];

        _task.save(tasks[0]);
        _task.save(tasks[1]);

        _task.run(200); // Run tasks with a 200ms threshold

        await setTimeout(2e3); // Wait for 11 seconds (11,000ms)

        expect(tasks[0].fn).toHaveBeenCalled();
        expect(tasks[1].fn).toHaveBeenCalled();
    }, //wait for 15seconds
    17e3);

    it('should only run tasks that are due without fake timers (slow)', async () => {
        jest.useFakeTimers()
        const tasks = [
            {
                name: 'task1',
                dueAt: new Date(Date.now() + 5000), // 10 seconds from now
                fn: jest.fn(), // Mock function
            },
            {
                name: 'task2',
                dueAt: new Date(Date.now() + 10000), // 5 seconds from now
                fn: jest.fn(), // Mock function
            }
        ];

        _task.save(tasks[0]);
        _task.save(tasks[1]);
        jest.advanceTimersByTime(4000)

        expect(tasks[0].fn).not.toHaveBeenCalled();
        expect(tasks[1].fn).not.toHaveBeenCalled();

        _task.run(200); // Run tasks with a 200ms threshold

        jest.advanceTimersByTime(2000)
        expect(tasks[0].fn).toHaveBeenCalled();
        jest.advanceTimersByTime(4000)

        expect(tasks[1].fn).toHaveBeenCalled();
    });
});

