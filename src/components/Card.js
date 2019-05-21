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
  box-shadow: -5px 5px 10px #e5e5e5;
  position: absolute;

  ${media.tabletPortraitUp`
    width: 85%;
    min-height: 600px;
    max-height: 800px;
  `}

  ${media.tabletLandscapeUp`
    width: 90%;
    max-height: 1000px;
  `}

  ${media.desktopUp`
    width: 95%;
    min-height: 800px;
    max-height: 1200px;
  `}
`

const Card = React.forwardRef(({ index, style, ...props }, ref) => {
  return <StyledCard ref={ref} index={index} style={style} {...props} />
})

export default Card
