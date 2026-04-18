const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'radio':
                value = target.value
                break

        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    function onClearFilter() {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: '', minSeverity: 0 }))
    }
    function onResetSort(){
        setFilterByToEdit(prevFilter => ({ ...prevFilter, sortField: '', sortDir: 1 }))
    }

    const { txt, minSeverity } = filterByToEdit
    return (
        <form className="bug-filter" onSubmit={onSubmitFilter}>
            <div className="form-hedear">
                <p>Filter</p>
            </div>

            <div className="filter-by">
                <label htmlFor="txt">Text: </label>
                <input value={txt} onChange={handleChange} type="text" placeholder="Search title / desc." id="txt" name="txt" />

                <label htmlFor="minSeverity">Min Severity: </label>
                <input value={minSeverity || ''} onChange={handleChange} type="number" placeholder="By Min Severity" id="minSeverity" name="minSeverity" />

                <button className="btn-clear-filter" onClick={onClearFilter}>Clear Filter</button>
            </div>

            <div className="sort-by">
                <div className="sort-field">
                    <label className="tag" >
                        <span>Title</span>
                        <input
                            type="radio"
                            name="sortField"
                            value="title"
                            checked={filterByToEdit.sortField === 'title'}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="tag" >
                        <span>Severity</span>
                        <input
                            type="radio"
                            name="sortField"
                            value="severity"
                            checked={filterByToEdit.sortField === 'severity'}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="tag" >
                        <span>Created At</span>
                        <input
                            type="radio"
                            name="sortField"
                            value="createdAt"
                            checked={filterByToEdit.sortField === 'createdAt'}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="sort-dir">
                    <label className="tag" >
                        <span>Asce</span>
                        <input
                            type="radio"
                            name="sortDir"
                            value="1"
                            checked={filterByToEdit.sortDir === "1"}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="tag" >
                        <span>Desc</span>
                        <input
                            type="radio"
                            name="sortDir"
                            value="-1"
                            onChange={handleChange}
                            checked={filterByToEdit.sortDir === "-1"}
                        />
                    </label>
                </div>

                <button onClick={onResetSort}>Clear Sort</button>
            </div>
            <div className="filter-by-label">
                
            </div>


        </form>
    )
}