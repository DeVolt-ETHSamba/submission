"use client"

import { useEffect } from "react"
import queryAllStations from "~~/utils/queryAllStations"

export default function Teste() {

    useEffect(()=>{
        queryAllStations()
    })

    return (
        <div>
        <h1>Teste</h1>
        </div>
    )
}