import type { NextPage } from 'next'
import Canvas from '../components/Canvas'

const Home: NextPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-24 items-center justify-center bg-yellow-400">
        A header
      </div>
      <div className="flex flex-1 bg-gray-300 p-8">
        <Canvas />
      </div>
    </div>
  )
}

export default Home
