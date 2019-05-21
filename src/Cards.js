import React, { useRef } from 'react'
import styled from 'styled-components/macro'
import { useSprings, animated, interpolate, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import Card from 'components/Card'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
  perspective: 800px;
  transform-style: preserve-3d;
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
    { id: 3, text: 'card4' },
    { id: 4, text: 'card5' },
    { id: 5, text: 'card6' },
    { id: 6, text: 'card7' },
    { id: 7, text: 'card8' }
  ]
  const cardsFlicked = useRef(0)

  const getIndexFromTopOfDeck = i =>
    cards.length - 1 - ((i + cardsFlicked.current) % cards.length)

  const getPosition = i => {
    const offsetX = 25
    const offsetZ = 20
    return {
      x: -getIndexFromTopOfDeck(i) * offsetX,
      z: -getIndexFromTopOfDeck(i) * offsetZ
    }
  }

  const [props, set] = useSprings(cards.length, i => {
    return {
      ...getPosition(i),
      opacity: 1,
      from: { x: 0, z: -40, opacity: 0 },
      config: config.stiff
    }
  })

  const bind = useGesture(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      // disable moving any other card than the topmost
      if (getIndexFromTopOfDeck(index) > 0) return
      let cardFlicked = false
      // trigger is the amount of velocity or xDelta required to fling the card off the screen
      const trigger = xDelta > 180
      // if the mouse is not pressed down and velocity exceeds the trigger, the card is "flicked" off the screen
      if (!down && trigger) {
        cardsFlicked.current++
        cardFlicked = true
      }
      set(i => {
        if (i === index) {
          // this is the card that is being flicked
          // do nothing if the card was moved left
          if (xDelta <= 0) return
          // if mouse/touch is pressed down, keep the card where it is held
          if (down) {
            return { x: xDelta, z: 0 }
          }
          if (cardFlicked) {
            // if the card is flicked away, it is moved out of the viewport to the right
            // and opacity is set to 0, so that the card is not visible when it moves to the back
            // of the deck
            return { x: window.innerWidth, opacity: 0 }
          }
        }
        // when the card is the second to last, its opacity is animated back to 1
        // this is because otherwise there is a flicker visible in the background when the
        // card becomes visible again
        if (getIndexFromTopOfDeck(i) === cards.length - 2)
          return { ...getPosition(i), opacity: 1 }
        // if order changed, move the topmost card to the back and the others forward
        // otherwise keep them where they are
        return { ...getPosition(i) }
      })
    }
  )

  return (
    <CardsPage>
      <Heading>Explore</Heading>
      <Container>
        {props.map(({ x, z, opacity }, i) => {
          return (
            <AnimatedCard
              {...bind(i)}
              key={i}
              style={{
                opacity,
                transform: interpolate(
                  [x, z],
                  (x, z) => `translate3d(${x}px,0,${z}px)`
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
