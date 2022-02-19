import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import useContainerDimensions from '../hooks/useContainerDimensions'
import * as d3 from 'd3'

function generateCircles() {
  return [...Array(10000)].map(() => ({
    x: Math.floor(Math.random() * 1840) + 1,
    y: Math.floor(Math.random() * 1176) + 1,
  }))
}

const Canvas: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const [canvasWidth, canvasHeight] = useContainerDimensions(containerRef)

  const data = generateCircles()

  // Maybe needs to be useLayoutEffect but get waring?
  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)
      const g = svg.append('g')

      g.append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 1840)
        .attr('height', 1176)
        .attr(
          'xlink:href',
          'https://esticom.blob.core.windows.net/esticomwebsite/5550/39029/Plans/09bcf944-0e41-48e1-99a3-cf12f9ec05c2_0.png'
        )

      g.selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', ({ x }) => x)
        .attr('cy', ({ y }) => y)
        .attr('r', 2)
        .attr('fill', '#000000')

      const handleZoom = ({ transform }: any) =>
        svg.selectAll('g').attr('transform', transform)

      const zoom = d3
        .zoom()
        .scaleExtent([0.1, 20])
        // .translateExtent([[0, 0], [width, height]]);
        .on('zoom', handleZoom) as any

      // https://www.d3indepth.com/zoom-and-pan/
      svg.call(zoom)

      svg.exit().remove()
    }
  }, [svgRef.current, canvasWidth, canvasHeight, data])

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
      />
    </div>
  )
}

export default Canvas
