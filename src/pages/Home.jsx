import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Home = () => {
  const { currentUser } = useSelector((state) => state.user)

  if (currentUser?.role === "Admin") {
    return <Navigate to="/admin/dashboard" replace />
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Alamkitab</h1>
      {/* Add your home page content here */}
    </div>
  )
}

export default Home