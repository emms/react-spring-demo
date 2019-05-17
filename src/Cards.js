import React from 'react'
import styled from 'styled-components'
import { useSprings, animated } from 'react-spring'
import Card from 'components/Card'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Cards = () => {
  const cards = ['card1', 'card2', 'card3']
  const [props, set] = useSprings(cards.length, i => ({
    opacity: 1,
    from: { opacity: 0 },
    delay: '2000'
  }))
  const AnimatedCard = animated(Card)

  return (
    <Container>
      {props.map((props, i) => (
        <AnimatedCard style={props} key={i} index={i} />
      ))}
    </Container>
  )
}

export default Cards
