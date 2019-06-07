import React from 'react'
import styled from 'styled-components/macro'
import { media } from 'styles'

const StyledCard = styled.div`
  width: 80%;
  height: 90%;
  min-height: 500px;
  max-height: 600px;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  background-size: cover;
  background-position: center;

  ${media.tabletPortraitUp`
    width: 90%;
    min-height: 600px;
    max-height: 800px;
  `}

  ${media.tabletLandscapeUp`
    max-height: 1000px;
  `}

  ${media.desktopUp`
    width: 95%;
    max-height: 1200px;
  `}
`

const Card = React.forwardRef(({ index, style, children, ...props }, ref) => {
  return (
    <StyledCard ref={ref} index={index} style={style} {...props}>
      {children}
    </StyledCard>
  )
})

export default Card
