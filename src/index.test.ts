import { describe, test } from 'vitest'
import { sum } from './index'

describe('test sum function', () => {
    test.concurrent('add comma delimited numbers', async ({ expect }) => {
        expect(sum('//[,]\n1,2,3')).toBe(6)
    })
    test.concurrent('passing empty string', async ({ expect }) => {
        expect(sum('')).toBe(0)
    })
    test.concurrent('passing non numeric characters', async ({ expect }) => {
        expect(() => sum('//[,]\na b ')).toThrowError(/Only addition of numbers is supported./)
    })
    test.concurrent('passing new line characters in place of comma', async ({ expect }) => {
        expect(sum('//[,]\n1\n\r2\n3\r4')).toBe(10)
    })
    test.concurrent('add colon delimited numbers', async ({ expect }) => {
        expect(sum('//[:]\n1:2:3')).toBe(6)
    })
    test.concurrent('passing string with no header', async ({ expect }) => {
        expect(() => sum('1,2')).toThrowError(/No header provided./)
    })
    test.concurrent('passing header with no delimiter', async ({ expect }) => {
        expect(() => sum('//\n1,2')).toThrowError(/No delimiter provided./)
    })
    test.concurrent('passing multi-character delimiter', async ({ expect }) => {
        expect(sum('//[,:]\n1,:2')).toBe(3)
    })
    test.concurrent('passing regx special symbol (*) as delimiter', async ({ expect }) => {
        expect(sum('//[*]\n1*2*3')).toBe(6)
    })
    test.concurrent('passing negative numbers', async ({ expect }) => {
        expect(() => sum('//[,]\n1\n2,-3,5,6,7,-10')).toThrowError(/(negative numbers not allowed)(.*)(-3,-10)/)
    })
    test.concurrent('add number greater than 1000', async ({ expect }) => {
        expect(sum('//[,]\n1,2,3000,3,4')).toBe(10)
    })
    test.concurrent('passing multiple delimiters', async ({ expect }) => {
        expect(sum('//[,:][?]\n1,:2?3')).toBe(6)
    })
})