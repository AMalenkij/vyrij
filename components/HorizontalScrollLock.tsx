import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

function HorizontalScrollLock() {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current

    const scrollContainer = (event) => {
      if (isScrolling) return

      const containerRect = container.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const containerWidth = containerRect.width
      const contentWidth = contentRect.width
      const maxScrollX = contentWidth - containerWidth

      if (containerWidth >= contentWidth) {
        return // No need to scroll if content fits the container
      }

      const scrollAmount = event.deltaY || event.deltaX

      if (scrollAmount !== 0) {
        setIsScrolling(true)
        gsap.to(container, {
          x: (x) => {
            const newX = x - scrollAmount
            return Math.max(-maxScrollX, Math.min(0, newX))
          },
          onComplete: () => {
            setIsScrolling(false)
          },
        })
      }
    }

    container.addEventListener('wheel', scrollContainer, { passive: false })

    return () => {
      container.removeEventListener('wheel', scrollContainer)
    }
  }, [isScrolling])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div ref={contentRef} style={{ whiteSpace: 'nowrap' }}>
        {/* Add your content here */}
        <div style={{ width: '200%', height: '100vh', background: 'red' }}>Section 1</div>
        <div style={{ width: '200%', height: '100vh', background: 'blue' }}>Section 2</div>
        {/* ... More sections */}
      </div>
    </div>
  )
}

export default HorizontalScrollLock
