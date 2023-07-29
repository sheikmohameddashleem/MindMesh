import React from 'react'
import { useParams } from 'react-router-dom'
import Chat from '../components/Chat'

export const Interview: React.FC = () => {
  const { course } = useParams()
  
    return (
      <div>Interview for {course}
        <Chat courseName={ course} />
      </div>
  )
}
