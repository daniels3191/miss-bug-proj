import { makeId, readJsonFile, writeJsonFile } from './util.service.js'

const PATH = './data/bug.json'
const bugs = readJsonFile(PATH)

export const bugService = {
    query,
    get,
    remove,
    save,
}


export function query() {
    return Promise.resolve(bugs)
}

export function get(bug_id) {
    const bug = bugs.find(bug => bug._id === bug_id)
    if(!bug) return Promise.reject(`Cant find the bug ${bug_id}`)

    return Promise.resolve(bug)
}

export async function remove(bug_id) {

    const idx = bugs.findIndex(bug => bug._id === bug_id)

    if (idx === -1) return Promise.reject(`Cant remove bug ${bug_id}`)

    const bugToRemove = bugs.splice(idx, 1)[0]
    
    return _saveBugsToFile()
    .then(() => bugToRemove._id)

}

export function save(bugToSave) {

    if (bugToSave._id) {
        const idx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs[idx] = { ...bugs[idx], ...bugToSave }
    } else {
        bugToSave._id = makeId()
        bugToSave.createdAt = Date.now()
        bugs.push(bugToSave)
    }
    
    return _saveBugsToFile()
    .then(() => bugToSave)

}

function _saveBugsToFile() {
    return writeJsonFile(PATH, bugs)
}
