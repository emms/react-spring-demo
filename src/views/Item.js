import React from 'react'
import styled from 'styled-components/macro'
import Card from 'components/Card'
import CardContainer from 'components/CardContainer'
import { withRouter } from 'react-router-dom'
import { media } from 'styles'
import { getBgImg } from 'getBgImg'

const StyledItem = styled.div`
  box-sizing: border-box;
  padding-right: 15px;
  padding-top: 110px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  pointer-events: all;

  ${media.tabletLandscapeUp`
    padding-right: 25px;
  `}
`

const Content = styled.div`
  position: absolute;
  background-color: #fff;
  left: 0;
  width: 100%;
`

const Item = ({ history, match }) => {
  const bgImg = getBgImg(match.params.id)

  return (
    <StyledItem>
      <CardContainer>
        <Card
          style={{
            backgroundImage: `url(${bgImg})`
          }}
          onClick={() => history.push('/')}
        />
        {match.params.id}
        <Content />
      </CardContainer>
    </StyledItem>
  )
}

export default withRouter(Item)
