import { styled } from "..";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',

  div: {
    display: 'flex',
    position: 'relative',
  },

  p: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    top: '-0.5rem',
    right: '-0.5rem',
    color: '$white',
    backgroundColor: '$green500',
    borderRadius: '100%',
    border: '3px solid $gray900',
    fontWeight: 'bold',
    width: 28,
    height: 28,
  },

  button: {
    backgroundColor: '$gray800',
    padding: '0.75rem',
    color: '$gray200',
    borderRadius: 6,
    cursor: 'pointer',
    lineHeight: 0,
    border: 'none',

    '&:hover': {
      color: 'white'
    }
  }
})

