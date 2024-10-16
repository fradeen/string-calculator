import { describe, test } from 'vitest'
import { sum } from './index'

describe('test sum function', () => {
    test.concurrent('add comma delimited numbers', async ({ expect }) => {
        expect(sum('1,2,3')).toBe(6)
    })
    test.concurrent('passing empty string', async ({ expect }) => {
        expect(sum('')).toBe(0)
    })
    test.concurrent('passing non numeric characters', async ({ expect }) => {
        expect(() => sum('//[,]\na b ')).toThrowError(/Only addition of numbers is supported./)
    })
})