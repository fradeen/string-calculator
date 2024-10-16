import { describe, test } from 'vitest'
import { sum } from './index'

describe('test sum function', () => {
    test.concurrent('add comma delimited numbers', async ({ expect }) => {
        expect(sum('1,2,3')).toBe(6)
    })
})