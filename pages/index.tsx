import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-24 items-center justify-center bg-yellow-400">
        A header
      </div>
      <div className="flex flex-1 bg-gray-200 p-8">
        <div className="flex h-full w-full items-center justify-center bg-blue-400">
          Canvas
        </div>
      </div>
    </div>
  )
}

export default Home
