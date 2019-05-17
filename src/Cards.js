import React from 'react'
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
`

const Cards = () => {
  const cards = ['card1', 'card2', 'card3']
  const [props, set] = useSprings(cards.length, i => ({
    x: i * 20,
    from: { x: 0 }
  }))
  const bind = useGesture(
    ({ args: [index], delta: [xDelta], direction: [xDir], velocity }) => {
      set(i => {
        if (index !== i || xDir <= 0) return
        const x = xDelta
        return { x }
      })
    }
  )
  const AnimatedCard = animated(Card)

  return (
    <Container>
      {props.map(({ x, ...props }, i) => {
        console.log(props)
        return (
          <AnimatedCard
            {...bind(i)}
            key={i}
            style={{
              transform: interpolate(x, x => `translate3d(${x}px,0,0)`)
            }}
            index={i}
          />
        )
      })}
    </Container>
  )
}

export default Cards
