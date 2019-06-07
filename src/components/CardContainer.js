import React from 'react'
import styled from 'styled-components/macro'
import { media } from 'styles'

const StyledCardContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
  perspective: 800px;
  transform-style: preserve-3d;
  max-height: 800px;

  ${media.tabletPortraitUp`
  max-height: none;
`}
`

const CardContainer = ({ children, className }) => (
  <StyledCardContainer className={className}>{children}</StyledCardContainer>
)

export default CardContainer
