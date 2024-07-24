import { styled } from ".."

export const CartModalWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  right: 0,
  top: 0,

  position: 'fixed',
  width: '100%',
  maxWidth: 600,
  height: '100vh',
  backgroundColor: '$gray800',

  boxShadow: '-4px 0 30px 0 #000000'
})

export const CartModalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  padding: '2rem',

  '.content-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  '.close-button': {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
  },

  h1: {
    marginTop: '3rem',
  },

  h2: {
    marginTop: '10rem',
  },

  button: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: 24,
    color: '$gray200',
  },

  '.card': {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '1rem',
    marginTop: '4rem',
  },

  '.product-info': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',

    p: {
      fontSize: '$md',
      color: '$gray300',
    },

    span: {
      fontSize: '$md',
      color: '$gray100',
      fontWeight: 'bold',
    },

    button: {
      fontSize: '1rem',
      color: '$green500',
      fontWeight: 'bold',
    }
  },

  '.finalize-info': {
    display: 'flex',
    flexDirection: 'column',

    marginTop: 'auto',
  },

  '.quantity-price': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  '.quantity': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  '.price': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    p: {
      fontSize: '$md',
      fontWeight: 'bold',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
    }
  },

  '.finalize-purchase-button': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$green500',
    padding: '1rem',
    borderRadius: 6,
    color: '$gray100',

    marginTop: '3rem',
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 90,
  height: 100,
  background: 'linear-gradient(100deg, #1ea483 0%, #7456d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})