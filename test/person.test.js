import { describe, it, expect } from '@jest/globals';
import mapPerson from '../src/person.js';

describe('#Person Test suite', () => {
    describe('#Happy path', () => {

        it('should map person', () => {
            const personStr = '{"name":"joao","age":"21"}'
            const personObj =  mapPerson(personStr)
    
            expect(personObj).toEqual({
                name: "joao",
                age: "21",
                createdAt: expect.any(Date)
            })
        })


        it('should not map person given invalid JSON string', () => {
            const personStr = '{"name":'

            expect(() => mapPerson(personStr)).toThrow('Unexpected end of JSON input')

        })


        it('should not map person given invalid JSON data', () => {
            const personStr = '{}'
            const personObj = mapPerson(personStr)

            expect(personObj).toEqual({
                name:undefined,
                age:undefined,
                createdAt:expect.any(Date),
            })
            
        })

    })
});
