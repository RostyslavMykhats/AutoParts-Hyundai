import React from 'react'
import s from './search.module.scss'

const Search = () => {
  return (
    <>
        <div className="search-container">
            <input className={s.search} type="text"  placeholder='Search H’PARTS'/>
        </div>
    </>
  )
}

export default Search