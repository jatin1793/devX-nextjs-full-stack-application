"use client"

import axios from 'axios'
import React, { useEffect } from 'react'

const Files = () => {
    useEffect(() => {
        axios.get('/api/file/view-all-files')
            .then((res) => {
                console.log(res)
            })
    }, [])

    return (
        <div>
        </div>
    )
}

export default Files