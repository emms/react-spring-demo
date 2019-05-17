import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  width: 400px;
  height: 600px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: -5px 5px 10px #e5e5e5;
  opacity: 0;
  position: absolute;
  transform: ${props => `translateX(${props.index * 20}px)`};
`

const Card = React.forwardRef(({ index, ...props }, ref) => {
  return <StyledCard ref={ref} index={index} />
})

export default Card
