import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSprings, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { isEqual } from 'lodash-es'
import Card from 'components/Card'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  position: relative;
`

const Heading = styled.h1`
  margin: 0;
  padding: 30px 0 15px 0;
  text-align: right;
`

const CardsPage = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AnimatedCard = animated(Card)

const Cards = () => {
  const [cards, setCards] = useState(['card1', 'card2', 'card3', 'card4'])
  const [gone] = useState(() => new Set()) // set of all cards that have been moved off of the screen
  const offset = 20

  const [props, set] = useSprings(cards.length, i => {
    return {
      x: -(cards.length - 1 - i) * offset,
      scale: 1 - (cards.length - 1 - i) * 0.05,
      from: { x: 0, scale: 0.9 }
    }
  })

  const bind = useGesture(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      // trigger is the amount of velocity required to fling the card off the screen
      const trigger = velocity > 0.3
      // if the mouse is not pressed down and velocity exceeds the trigger, the card is "gone" off the screen
      if (!down && trigger) gone.add(index)
      const isGone = gone.has(index)
      // if (isGone) {
      //   const lastCard = cards[cards.length - 1]
      //   const filteredCards = cards.filter(x => !isEqual(x, lastCard))
      //   filteredCards.unshift(lastCard)
      //   setCards(filteredCards)
      // }
      set(i => {
        if (i === index) {
          if (xDelta <= 0) return
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
        }
        if (isGone) {
          if (i < index) {
            console.log('i: ', i, 'kerroin: ', index - i - 1)
            // the multiplier reflects how far the card is from the "top of the deck". So for the topmost card,
            // the multiplier is 0, 2nd card from the top it is 1, and so on
            const multiplier = index - i - 1
            return {
              scale: 1 - multiplier * 0.05,
              x: -multiplier * offset
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
            >
              {cards[i]}
            </AnimatedCard>
          )
        })}
      </Container>
    </CardsPage>
  )
}

export default Cards
