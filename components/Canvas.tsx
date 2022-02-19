import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import useContainerDimensions from '../hooks/useContainerDimensions'
import * as d3 from 'd3'
import generateCircles from '../lib/GenerateCircleData'

type Props = {}

const Canvas: NextPage<Props> = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const [canvasWidth, canvasHeight] = useContainerDimensions(containerRef)

  const circles = generateCircles()

  // Maybe needs to be useLayoutEffect but get waring?
  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)

      const handleZoom = ({ transform }: any) =>
        svg.selectAll('g').attr('transform', transform)

      const zoom = d3
        .zoom()
        .scaleExtent([0.1, 20])
        // .translateExtent([[0, 0], [width, height]]); (for panning)
        .on('zoom', handleZoom) as any

      // https://www.d3indepth.com/zoom-and-pan/
      svg.call(zoom)
    }
  }, [svgRef])

  // https://codesandbox.io/s/mouse-drawing-react-d3-i3y7m?from-embed

  useEffect((): any => {
    const mouseMove = (e: any) => {
      const [x, y] = d3.pointer(e)
      console.log(x, y)
    }

    const svg = d3.select(svgRef.current).select('g')
    svg.on('mousemove', (e) => mouseMove(e))

    return () => svg.on('mousemove', null)
  }, [svgRef])

  const [draggingCircle, setDraggingCircle] = useState({ x: 0, y: 0 })

  const handleOnClick = (e: React.MouseEvent<SVGCircleElement>, id: number) => {
    console.log(id, e.target)
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-red-400"
      ref={containerRef}
    >
      <svg
        width={canvasWidth}
        height={canvasHeight}
        // viewBox={`0, 0, ${canvasWidth}, ${canvasHeight}`}
        className="bg-blue-400"
        ref={svgRef}
      >
        <g>
          <image
            x={0}
            y={0}
            width={1840}
            height={1176}
            xlinkHref="https://esticom.blob.core.windows.net/esticomwebsite/5550/39029/Plans/09bcf944-0e41-48e1-99a3-cf12f9ec05c2_0.png"
          />
        </g>
        <g>
          {circles.map((c) => (
            <circle
              key={c.id}
              cx={c.x}
              cy={c.y}
              r={2}
              onClick={(e) => handleOnClick(e, c.id)}
            />
          ))}
        </g>
        <g>
          <circle
            cx={draggingCircle.x}
            cy={draggingCircle.y}
            r={20}
            fill="#FF0000"
            // onClick={(e) => handleOnClick(e, c.id)}
          />
        </g>
      </svg>
    </div>
  )
}

export default Canvas
