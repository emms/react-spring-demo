import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  width: 400px;
  height: 600px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: -5px 5px 10px #e5e5e5;
  position: absolute;
`

const Card = React.forwardRef(({ index, style, ...props }, ref) => {
  return <StyledCard ref={ref} index={index} style={style} {...props} />
})

export default Card
