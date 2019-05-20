import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSprings, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import Card from 'components/Card'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
  perspective: 800px;
`

const Heading = styled.h1`
  margin: 0;
  padding: 30px 0 15px 0;
  text-align: right;
  text-transform: uppercase;
`

const CardsPage = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-right: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AnimatedCard = animated(Card)

const Cards = () => {
  const cards = [
    { id: 0, text: 'card1' },
    { id: 1, text: 'card2' },
    { id: 2, text: 'card3' },
    { id: 3, text: 'card4' }
  ]
  const [gone] = useState(() => new Set()) // set of all cards that have been moved off of the screen
  // const [cardsFlicked, setCardsFlicked] = useState(0)
  const offset = 25
  const scaleUnit = 0.05

  const [props, set] = useSprings(cards.length, i => {
    return {
      x: -(cards.length - 1 - i) * offset,
      scale: 1 - (cards.length - 1 - i) * scaleUnit,
      z: -(cards.length - 1 - i) * 20,
      from: { x: 0, scale: 0.9, z: -40 }
    }
  })

  const bind = useGesture(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      // trigger is the amount of velocity required to fling the card off the screen
      const trigger = velocity > 0.3
      // if the mouse is not pressed down and velocity exceeds the trigger, the card is "gone" off the screen
      if (!down && trigger) gone.add(index)
      const isGone = gone.has(index)

      set(i => {
        // TODO disable moving any other card than the topmost
        if (i === index) {
          // this is the card that is being flicked
          if (xDelta <= 0) return
          let x
          if (isGone) {
            // if the card should be "gone" off the screen, move it out of the viewport
            x = window.innerWidth
          } else if (down) {
            // if mouse/touch is pressed down, keep the card where it is, otherwise return to original position in deck
            x = xDelta
          } else {
            x = 0
          }
          return { x }
        }
        if (isGone) {
          // these cards are not being flicked, they are in the deck
          if (i < index) {
            // the multiplier reflects how far the card is from the "top of the deck". So for the topmost card,
            // the multiplier is 0, 2nd card from the top it is 1, and so on
            const multiplier = index - i - 1
            return {
              scale: 1 - multiplier * scaleUnit,
              x: -multiplier * offset,
              z: -multiplier * 20
            }
          }
        }
      })
    }
  )

  return (
    <CardsPage>
      <Heading>Explore</Heading>
      <Container>
        {props.map(({ x, z, scale }, i) => {
          return (
            <AnimatedCard
              {...bind(i)}
              key={i}
              style={{
                transform: interpolate(
                  [x, z, scale],
                  (x, z, scale) => `translate3d(${x}px,0,${z}px)`
                )
              }}
              index={i}
            >
              {cards.find(x => x.id === i).text}
            </AnimatedCard>
          )
        })}
      </Container>
    </CardsPage>
  )
}

export default Cards
