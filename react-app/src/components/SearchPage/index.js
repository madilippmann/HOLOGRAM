import React from 'react'
import { useParams } from 'react-router-dom'

export default function SearchPage() {
  const { query } = useParams()
  
  return (
    <div>search for: { query }</div>
  )
}
