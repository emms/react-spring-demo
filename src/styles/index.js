import { css } from 'styled-components'

export const sizes = {
  largeDesktopUp: 1600,
  desktopUp: 1200,
  tabletLandscapeUp: 900,
  tabletPortraitUp: 600
}

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})
