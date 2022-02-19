import type { NextPage } from 'next'

type Props = {}

const Canvas: NextPage<Props> = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-red-400">
      Hello world
    </div>
  )
}

export default Canvas
