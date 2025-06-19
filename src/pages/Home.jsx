import React from 'react'
import useRoadmap from '../hooks/useRoadmap'

const Home = () => {
    
    const {roadmaps} = useRoadmap();

    console.log(roadmaps)

  return (
    <div>Home</div>
  )
}

export default Home