import React from 'react'
import styled from 'styled-components/macro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GlobalStyle from 'styles/GlobalStyle'
import Cards from 'views/Cards'
import Item from 'views/Item'
import { withRouter } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Cards />
      <RouteAnimator />
    </Router>
  )
}

const CardPageContainer = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
`

const RouteAnimator = withRouter(({ location }) => {
  const transitions = useTransition(location, location => location.pathname, {
    from: { transform: 'scale(1)' },
    enter: { transform: 'scale(1.3)' },
    leave: { transform: 'scale(1)' }
  })

  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <CardPageContainer key={key} style={props}>
          <Switch location={item}>
            <Route path="/item/:id" component={Item} />
          </Switch>
        </CardPageContainer>
      ))}
    </>
  )
})

export default App
