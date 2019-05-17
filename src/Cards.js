import React, { useState } from 'react'
import styled from 'styled-components'
import { useSprings, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import Card from 'components/Card'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`

const Cards = () => {
  const cards = ['card1', 'card2', 'card3']
  const [gone] = useState(() => new Set()) // set of all cards that have been moved off of the screen
  const [props, set] = useSprings(cards.length, i => ({
    x: -(cards.length - 1 - i) * 20,
    scale: 1 + i * 0.05,
    from: { x: 0, scale: 1 }
  }))
  const bind = useGesture(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      // trigger is the amount of velocity required to fling the card off the screen
      const trigger = velocity > 0.3
      // if the mouse is not pressed down and velocity exceeds the trigger, the card is "gone" off the screen
      if (!down && trigger) gone.add(index)
      set(i => {
        if (index !== i || xDelta <= 0) return
        const isGone = gone.has(index)
        let x
        if (isGone) {
          // if the card should be "gone" off the screen, move it out of the viewport
          x = window.innerWidth
        } else if (down) {
          // if mouse/touch is pressed down, keep the card where it is, otherwise return to original position in deck
          x = xDelta
        } else {
          x = -(cards.length - 1 - i) * 20
        }
        return { x }
      })
    }
  )
  const AnimatedCard = animated(Card)

  return (
    <Container>
      {props.map(({ x, scale }, i) => {
        return (
          <AnimatedCard
            {...bind(i)}
            key={i}
            style={{
              transform: interpolate(
                [x, scale],
                (x, scale) => `translate3d(${x}px,0,0) scale(${scale})`
              )
            }}
            index={i}
          />
        )
      })}
    </Container>
  )
}

export default Cards
