import { RefObject, useEffect, useState } from 'react'

function useContainerDimensions(
  containerRef: RefObject<HTMLDivElement>
): [number, number] {
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setCanvasWidth(containerRef.current.offsetWidth)
      setCanvasHeight(containerRef.current.offsetHeight)
    }
  }, [containerRef])

  return [canvasWidth, canvasHeight]
}

export default useContainerDimensions
