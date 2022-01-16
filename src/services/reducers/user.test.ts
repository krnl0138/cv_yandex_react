import {userReducer as reducer} from './user'
// import { expect } from '@jest/globals';
// import * as types from '../../constants/ActionTypes'
import { USER_SET_CREDENTIALS, USER_LOGOUT } from '../actions/user'

describe('user reducer', () => {
    const initialState = {
        username: '',
        email: ''
    }

    it('should return initial state', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(reducer(undefined, {} as any)).toEqual(initialState)
    })

    it('should store user credentials', () => {
        expect(reducer(initialState, {
            type: USER_SET_CREDENTIALS,
            user: {
                email: 'test@test.com',
                name: 'test',
            }
        })).toEqual(
            {
                email: 'test@test.com',
                username: 'test',
            }
        )
    })

    it('should reset user credentials on logout', () => {
        expect(reducer(initialState, { type: USER_LOGOUT })).toEqual(initialState)
    })
})