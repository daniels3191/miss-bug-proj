const { useState, useEffect } = React

const PAGE_SIZE = 2

export function Pagination({pageCount, onSetFilterBy, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    

     useEffect(() => {
        filterByToEdit.pageSize = PAGE_SIZE
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function onChangePage(diff) {
        const pageIdx = filterBy.pageIdx + diff
        if(pageIdx < 0  || pageIdx > pageCount - 1 ) return
        setFilterByToEdit(prevFilter => ({ ...prevFilter, pageIdx: pageIdx }))
    }

    return <div className="pagination">
        <button onClick={() => onChangePage(-1)}>Prev</button>
        <p>{filterBy.pageIdx + 1}</p>
        <button onClick={() => onChangePage(1)}>Next</button>
    </div>

}