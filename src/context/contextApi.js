import React, { createContext, useState, useEffect } from 'react'
import { fetchDataFromAPI } from '../utils/api'

export const Context = createContext()
export const AppContext = (props) => {
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)

    useEffect(() => {
        fetchSelectedCategoryData(selectedCategory)
    }, [selectedCategory])

    const fetchSelectedCategoryData = (query) => {
        setLoading(true)
        fetchDataFromAPI(`search/?q=${query}`).then(({ contents }) => {
            setSearchResults(contents)
            setLoading(false)
        })
    }

    return (
        <Context.Provider
            value={{
                loading, setLoading,
                searchResults, setSearchResults,
                selectedCategory, setSelectedCategory,
                mobileMenu, setMobileMenu
            }}
        >
            {props.children}
        </Context.Provider>
    )
}