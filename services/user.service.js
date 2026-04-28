import fs from 'fs'

import { makeId, readJsonFile, writeJsonFile } from './util.service.js'

const PATH = './data/user.json'
const users = readJsonFile(PATH)

export const userService = {
    query,
    getById,
    getByUsername,
    add,
    remove
}

function query() {
    const usersToReturn = users.map(user => ({ _id: user._id, username: user.username, fullname: user.fullname, isAdmin: user.isAdmin }))
    return Promise.resolve(usersToReturn)
}

function getById(userId) {
    let user = users.find(user => user._id === userId)
    if (!user) return Promise.reject('User not found!')

    user = { ...user }
    delete user.password

    return Promise.resolve(user)
}

function getByUsername(username) {
    const user = users.find(user => user.username === username)
    return Promise.resolve(user)
}

function add(user) {
    return getByUsername(user.username)
        .then(existingUser => {
            if (existingUser) return Promise.reject('Username already exist')

            user._id = makeId()
            users.push(user)

            return _saveUsersToFile()
                .then(() => {
                    user = { ...user }
                    delete user.password
                    return user
                })
        })

}

export function remove(user_id, user) {

    const idx = users.findIndex(user => user._id === user_id)

    if (idx === -1) return Promise.reject(`Cant remove user ${user_id}`)
    if(!user.isAdmin) return Promise.reject('Not authorized')
        
    const userToRemove = users.splice(idx, 1)[0]

    return _saveUsersToFile()
        .then(() => userToRemove._id)

}

function _saveUsersToFile() {
    return writeJsonFile(PATH, users)
        .catch(err => {
            loggerService.error('Cannot write to users file', err)
            throw err
        })
}

