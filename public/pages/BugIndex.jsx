const { useState, useEffect, useRef } = React

import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

import { BugFilter } from '../cmps/BugFilter.jsx'
import { BugList } from '../cmps/BugList.jsx'
import { Pagination } from '../cmps/Pagination.jsx'
import { authService } from '../services/auth.service.js'

export function BugIndex() {
    const [bugs, setBugs] = useState(null)
    const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
    const [pageCount, setPageCount] = useState()

    const debouncedOnSetFilterBy = useRef(utilService.debounce(onSetFilterBy, 500)).current
    const loggedinUser = authService.getLoggedinUser()

    useEffect(loadBugs, [filterBy])

    function loadBugs() {
        bugService.query(filterBy)
            .then(res => {
                setBugs(res.bugs)
                setPageCount(res.pageCount)
            })
            .catch(err => showErrorMsg(`Couldn't load bugs - ${err}`))
    }

    function onRemoveBug(bugId) {
        bugService.remove(bugId)
            .then(() => {
                loadBugs()
                showSuccessMsg('Bug removed')
            })
            .catch((err) => showErrorMsg(`Cannot remove bug`, err))
    }

    function onAddBug() {
        const bug = {
            title: prompt('Bug title?', 'Bug ' + Date.now()),
            description: prompt('Bug description?', 'Bug number ' + Date.now()),
            severity: +prompt('Bug severity?', 3)
        }

        bugService.save(bug)
            .then(() => {
                loadBugs()
                showSuccessMsg('Bug added')
            })
            .catch(err => showErrorMsg(`Cannot add bug`, err))
    }

    function onEditBug(bug) {
        const severity = +prompt('New severity?', bug.severity)
        if (!severity || severity === bug.severity) return

        const bugToSave = { ...bug, severity }

        bugService.save(bugToSave)
            .then(savedBug => {
                const bugsToUpdate = bugs.map(currBug =>
                    currBug._id === savedBug._id ? savedBug : currBug)

                setBugs(bugsToUpdate)
                showSuccessMsg('Bug updated')
            })
            .catch(err => showErrorMsg('Cannot update bug', err))
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    return <section className="bug-index main-content">

        <header>
            <h2>Bug List</h2>
            {loggedinUser && <button onClick={onAddBug}>Add Bug</button>}
        </header>

        <BugFilter
            filterBy={filterBy}
            onSetFilterBy={debouncedOnSetFilterBy} />

        <BugList
            bugs={bugs}
            onRemoveBug={onRemoveBug}
            onEditBug={onEditBug} />

        <Pagination
            filterBy={filterBy}
            onSetFilterBy={onSetFilterBy}
            pageCount={pageCount}
        />
    </section>
}
