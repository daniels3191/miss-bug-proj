import { makeId, readJsonFile, writeJsonFile } from './util.service.js'

const PATH = './data/bug.json'
const bugs = readJsonFile(PATH)

export const bugService = {
    query,
    get,
    remove,
    save,
}

export function query({ filterBy, sortBy, pagination }) {
    const results = {}
    let bugsToReturn = [...bugs]

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        bugsToReturn = bugsToReturn.filter(bug => regExp.test(bug.title))
    }

    if (filterBy.minSeverity) {
        bugsToReturn = bugsToReturn.filter(bug => bug.severity >= filterBy.minSeverity)
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
        bugsToReturn =
            bugsToReturn.filter(bug =>
                filterBy.labels.some(label => bug.labels.includes(label)))
    }
    if (sortBy.sortField === 'severity' || sortBy.sortField === 'createdAt') {
        bugsToReturn.sort((a, b) => (a[sortBy.sortField] - b[sortBy.sortField]) * sortBy.sortDir)
    } else if (sortBy.sortField === 'title') {
        bugsToReturn.sort((a, b) => (a[sortBy.sortField].localeCompare(b[sortBy.sortField])) * sortBy.sortDir)
    }

    if (pagination) {
        const { pageIdx, pageSize } = pagination
        const startIdx = pageIdx * pageSize

        results.pageCount = Math.ceil(bugsToReturn.length / pageSize)
        bugsToReturn = bugsToReturn.slice(startIdx, startIdx + pageSize)
    }
    results.bugs = bugsToReturn
    return Promise.resolve(results)
}

export function get(bug_id) {
    const bug = bugs.find(bug => bug._id === bug_id)
    if (!bug) return Promise.reject(`Cant find the bug ${bug_id}`)

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
