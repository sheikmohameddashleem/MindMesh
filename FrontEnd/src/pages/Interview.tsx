import React from 'react'
import { useParams } from 'react-router-dom'

export const Interview: React.FC = () => {
    const { course } = useParams()
    console.log("course selected is", course)
    return (
      <div>Interview for { course}</div>
  )
}
