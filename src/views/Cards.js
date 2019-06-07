import React, { useRef } from 'react'
import styled from 'styled-components/macro'
import { useSprings, animated, interpolate, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { withRouter } from 'react-router-dom'
import Card from 'components/Card'
import CardContainer from 'components/CardContainer'
import { media, sizes } from 'styles'
import card1 from 'assets/card1.jpg'
import card2 from 'assets/card2.jpg'
import card3 from 'assets/card3.jpg'
import card4 from 'assets/card4.jpg'
import card5 from 'assets/card5.jpg'
import card6 from 'assets/card6.jpg'
import card7 from 'assets/card7.jpg'
import card8 from 'assets/card8.jpg'

const Heading = styled.h1`
  box-sizing: border-box;
  height: 110px;
  margin: 0;
  padding-top: 30px;
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

  ${media.tabletLandscapeUp`
    padding-right: 25px;
  `}
`

const AnimatedCard = animated(Card)

const Cards = withRouter(({ history }) => {
  const cards = [
    { id: 0, image: card1 },
    { id: 1, image: card2 },
    { id: 2, image: card3 },
    { id: 3, image: card4 },
    { id: 4, image: card5 },
    { id: 5, image: card6 },
    { id: 6, image: card7 },
    { id: 7, image: card8 }
  ]

  const cardsFlicked = useRef(0)

  const getIndexFromTopOfDeck = i =>
    cards.length - 1 - ((i + cardsFlicked.current) % cards.length)

  const getPosition = i => {
    const offsetX = window.innerWidth > sizes.desktopUp ? 35 : 25
    const offsetZ = 20
    return {
      x: -getIndexFromTopOfDeck(i) * offsetX,
      z: -getIndexFromTopOfDeck(i) * offsetZ,
      opacity: 1 - getIndexFromTopOfDeck(i) * 0.2
    }
  }

  const [props, set] = useSprings(cards.length, i => {
    return {
      ...getPosition(i),
      from: { x: 0, z: -60 },
      config: config.default
    }
  })

  const bind = useGesture(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      // disable moving any other card than the topmost, do nothing if the card was moved left
      if (getIndexFromTopOfDeck(index) > 0) return
      if (!down && xDelta === 0) history.push(`/item/${index}`)
      let cardFlicked = false
      // trigger is the amount of velocity or xDelta required to fling the card off the screen
      const trigger = velocity > 0.3 || xDelta > 180 || xDelta < -180
      // if the mouse is not pressed down and velocity exceeds the trigger, the card is "flicked" off the screen
      if (!down && trigger) {
        cardsFlicked.current++
        cardFlicked = true
      }
      set(i => {
        if (i === index) {
          // this is the card that is being flicked
          // if mouse/touch is pressed down, keep the card where it is held
          if (down) {
            return { x: xDelta, z: 0 }
          }
          if (cardFlicked) {
            // if the card is flicked away, it is moved out of the viewport to the right
            // and opacity is set to 0, so that the card is not visible when it moves to the back
            // of the deck
            const x = xDelta > 0 ? window.innerWidth : -window.innerWidth
            return { x, opacity: 0 }
          }
        }
        // if order changed, move the topmost card to the back and the others forward
        // otherwise keep them where they are
        return getPosition(i)
      })
    }
  )

  return (
    <CardsPage>
      <Heading>Browse</Heading>
      <CardContainer>
        {props.map(({ x, z, opacity }, i) => {
          return (
            <AnimatedCard
              {...bind(i)}
              key={i}
              id={`card${i}`}
              style={{
                opacity,
                transform: interpolate(
                  [x, z],
                  (x, z) => `translate3d(${x}px,0,${z}px)`
                ),
                backgroundImage: `url(${cards.find(x => x.id === i).image})`
              }}
              index={i}
            />
          )
        })}
      </CardContainer>
    </CardsPage>
  )
})

export default Cards
