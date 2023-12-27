/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable max-len */

'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'

import useModelData from '@/hooks/useModelData'
import getChorusChronicles from '@/actions/getChorusChronicles'
import { ChorusChronicles as ChorusChroniclesProps } from '@/types'
import ChorusEventCard from './ChorusEventCard'

export default function ChorusChronicles() {
  const [loadedData, setLoadedData] = useState<ChorusChroniclesProps[]>([])
  const [renderedData, setRenderedData] = useState<ChorusChroniclesProps[]>([])
  const { modelData } = useModelData<ChorusChroniclesProps>(getChorusChronicles, 2)
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true)

  const intObserverLast = useRef<IntersectionObserver | null>(null)
  const intObserverFirst = useRef<IntersectionObserver | null>(null)

  const startTimer = useCallback((time = 350) => {
    setIsTimerActive(false)

    setTimeout(() => {
      setIsTimerActive(true)
    }, time)
  }, [])

  useEffect(() => {
    startTimer(1500)
  }, [startTimer])

  useEffect(() => {
    setLoadedData((prevData) => modelData.map((obj, index) => ({ ...obj, index, prevData })))
  }, [modelData])

  useEffect(() => {
    const currentPage = 1
    const startIndex = (currentPage - 1) * 2
    const endIndex = startIndex + 3
    setRenderedData(loadedData.slice(startIndex, endIndex))
  }, [loadedData])

  const nextLoadData = useCallback(() => {
    if (renderedData.length > 0
      && isTimerActive
      && (renderedData[renderedData.length - 1].index < loadedData[loadedData.length - 1].index)) {
      console.log('nextLoadData')
      const lastElement = renderedData[renderedData.length - 1]
      const nextStartIndex = lastElement.index + 1
      const nextEndIndex = lastElement.index + 2
      setRenderedData((prevData) => [...prevData, ...loadedData.slice(nextStartIndex, nextEndIndex)])
      startTimer()
    }
  }, [renderedData, loadedData, isTimerActive, startTimer])

  const prevLoadData = useCallback(() => {
    if (renderedData.length > 0 && renderedData[0].index > 0) {
      console.log('prevLoadData')
      const lastObject = renderedData[0]
      const nextStartIndex = lastObject.index
      const nextEndIndex = nextStartIndex - 2
      if (lastObject.index >= 2) {
        setRenderedData((prevData) => [...loadedData.slice(nextEndIndex, nextStartIndex), ...prevData])
      }
      startTimer()
    }
  }, [renderedData, loadedData, startTimer])

  const useCreateIntersectionObserver = (
    observerRef: React.MutableRefObject<IntersectionObserver | null>,
    callback: (entry: IntersectionObserverEntry) => void,
  ) => useCallback(
    (post: HTMLDivElement | null): (() => void) | undefined => {
      if (!isTimerActive) return

      // Disconnect the previous observer, if any
      observerRef.current?.disconnect()

      // Create a new IntersectionObserver with the provided callback for intersection
      observerRef.current = new IntersectionObserver(([entry]) => {
        callback(entry)
      })

      // If there's a target element, start observing it
      if (post) {
        observerRef.current.observe(post)
      }

      // Cleanup: Disconnect the observer when the component unmounts or when the target element changes
      return () => observerRef.current?.disconnect()
    },
    [callback, observerRef],
  )

  // Use the generic observer creation function with specific callbacks and refs
  const lastRef = useCreateIntersectionObserver(intObserverLast, () => nextLoadData())
  const firstRef = useCreateIntersectionObserver(intObserverFirst, () => prevLoadData())

  return (
    <div>
      <div className="h-14 bg-red-600" />
      <main className="container mx-auto">
        {renderedData.map((item, index) => {
          if (index === 0) {
            return <ChorusEventCard ref={firstRef} key={item.event_id} event={item} />
          }
          if (index === renderedData.length - 1) {
            return <ChorusEventCard ref={lastRef} key={item.event_id} event={item} />
          }
          return <ChorusEventCard key={item.event_id} event={item} />
        })}
      </main>
      <div className="h-14 bg-red-600" />
    </div>
  )
}
