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
import { ChorusChronicles as ChorusChroniclesProps } from '@/types'
import getMajorEvent from '@/actions/getMajorEvent'
import getMinorEvent from '@/actions/getMinorEvent'
import MinorCard from '../MinorCard'
import MajorCard from '../MajorCard'

interface Props {
  params:{
    id:string
  }
}

export default function ChorusChronicles({ params }: Props) {
  const [renderedData, setRenderedData] = useState<ChorusChroniclesProps[]>([])
  const { modelData } = useModelData<ChorusChroniclesProps>(getMinorEvent, 2)
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true)
  const { ...data } = useModelData(getMajorEvent, 1)
  const [joinMassive, setJoinMassive] = useState()

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
    if (data.modelData && modelData) {
      const updatedJoinMassive = []
      data?.modelData.forEach((element) => {
        updatedJoinMassive.push({ ...element.minor_event, event: 'Major' })
        const years = modelData.find((secondElement) => secondElement.date.slice(0, 4) === element.minor_event.date.slice(0, 4))
        if (years) {
          updatedJoinMassive.push({ ...years, event: 'Minor' })
        }
      })
      setJoinMassive((prevData) => updatedJoinMassive.map((obj, index) => (
        { ...obj, index }
      )))
    }
  }, [data.modelData, modelData])

  useEffect(() => {
    if (joinMassive) {
      const findYear = joinMassive?.find((elm) => (elm.date.slice(0, 4) === params.id && elm.event == 'Major'))
      const startIndex = findYear?.index
      const endIndex = startIndex + 3
      setRenderedData(joinMassive.slice(startIndex, endIndex))
    }
  }, [joinMassive])

  const nextLoadData = useCallback(() => {
    if (renderedData.length > 0
      && isTimerActive
      && (renderedData[renderedData.length - 1].index < joinMassive[joinMassive.length - 1].index)) {
      // console.log('nextLoadData')
      const lastElement = renderedData[renderedData.length - 1]
      const nextStartIndex = lastElement.index + 1
      const nextEndIndex = lastElement.index + 2
      setRenderedData((prevData) => [...prevData, ...joinMassive.slice(nextStartIndex, nextEndIndex)])
      startTimer()
    }
  }, [renderedData, joinMassive, isTimerActive, startTimer])

  const prevLoadData = useCallback(() => {
    if (renderedData.length > 0 && renderedData[0].index > 0) {
      // console.log('prevLoadData')
      const lastObject = renderedData[0]
      const nextStartIndex = lastObject.index
      const nextEndIndex = nextStartIndex - 2
      if (lastObject.index >= 2) {
        setRenderedData((prevData) => [...joinMassive.slice(nextEndIndex, nextStartIndex), ...prevData])
      }
      startTimer()
    }
  }, [renderedData, joinMassive, startTimer])

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
      <div className="-mt-16 z-10" />
      <section className="">
        {renderedData.map((item, index) => {
          if (index === 0 && item.event === 'Minor') {
            return <MinorCard ref={firstRef} key={item.index} event={item} />
          }
          if (index === 0 && item.event === 'Major') {
            return <MajorCard ref={firstRef} key={item.index} event={item} />
          }
          if (index === renderedData.length - 1 && item.event === 'Minor') {
            return <MinorCard ref={lastRef} key={item.index} event={item} />
          }
          if (index === renderedData.length - 1 && item.event === 'Major') {
            return <MajorCard ref={lastRef} key={item.index} event={item} />
          }
          if (item.event === 'Minor') {
            return <MinorCard key={item.index} event={item} />
          }
          if (item.event === 'Major') {
            return <MajorCard key={item.index} event={item} />
          }
          return null
        })}
      </section>
    </div>
  )
}
