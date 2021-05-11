const theme = {
  common: {
    headerHeight: '6rem',
    mobileHeaderHeight: '11rem',
    sidebarWidth: '20rem',
    desktopSidebarWidth: '20rem',
    mobileSidebarWidth: '26.8rem',
    inputBorderRadius: '0.5rem',
    defaultBorderRadius: '0.5rem',
    defaultTextAreaHeight: 8
  },
  colors: {
    black: '#000',
    grey: '#D7DCE7',
    greyTwo: '#F6F9FB',
    greyThree: 'rgba(0, 0, 0, 0.5)',
    greyFor: 'rgba(65, 93, 120, 0.2)',
    greyFive: 'rgba(0, 0, 0, 0.7)',
    greySix: '#5D6267',
    greySeven: 'rgba(0, 0, 0, 0.08)',
    greyEight: 'rgba(116, 159, 200, 0.5)',
    greyNine: '#6E9FC6',
    greyEleven: 'rgba(116, 159, 200, 0.2)',
    grayTwelve: 'rgba(116, 159, 200, 0.3)',
    athensGray: '#EFF1F4',
    hitGray: '#A4B1B9',
    catskillWhite: '#E4EDF2',
    kashmirBlue: '#4C7092',
    sapphire: '#304EA9',
    glacier: '#749FC8',
    periwinkleGray: '#D2DAEB',
    waikawaGray: '#5A7690',
    sherpaBlue: '#003E52',
    geyser: '#C8D3DD',
    warn: '#F83F20',
    white: '#fff',
    mystic: '#E6EBF0',
    whiteLilac: '#eff2f9',
    lightGreen: '#92DBD1',
    jaggedIce: '#C5EDE8',
    iron: '#D8DDE0',
    hippieBlue: '#638DB9',
    grayChateau: '#99A2AD',
    danube: '#6C9ACA',
    grayChateauTwo: '#98A1AE',
    rollingStone: '#7C7D7E',
    whiteLilacTwo: '#F7F9FC',
    wildSand: '#F4F4F4',
    poloBlue: '#98B3D5',
    sanMarino: '#4C79AA',
    kashmirBlueTwo: '#547392',
    spindle: '#B6CDE6',
    jordyBlue: '#73AFEE',
    lynch: '#7885A4',
    blackSqueeze: '#F5F9FC',
    periwinkleGrayTwo: '#C3D8EA',
    periwinkleGrayThree: '#C9D8EC',
    linkWater: '#FBFCFE',
    serenade: '#FFF5E7',
    sunshade: '#FFAD33',
    transparent: 'transparent'
  },
  fonts: {
    default: {
      fontSize: '1.4rem',
      lineHeight: '1.641rem',
      fontWeight: 400,
      fontFamily: `'Roboto', sans-serif`
    },
    caption: {
      fontSize: '1.2rem',
      lineHeight: '1.68rem',
      fontWeight: 400,
      fontFamily: `'Lato', sans-serif;`
    },
    subTitle: {
      fontSize: '1.4rem',
      lineHeight: '1.44rem',
      fontWeight: 400,
      fontFamily: `'Lato', sans-serif;`
    },
    subTitleTwo: {
      fontSize: '1.4rem',
      lineHeight: '1.68rem',
      fontWeight: 400,
      fontFamily: `'Lato', sans-serif;`
    },
    hint: {
      fontSize: '1.2rem',
      lineHeight: '1.44rem',
      fontWeight: 600,
      fontFamily: `'Lato', sans-serif;`
    },
    small: {
      fontSize: '1rem',
      lineHeight: '1.2rem',
      fontWeight: 400,
      fontFamily: `'Lato', sans-serif;`
    },
    label: {
      fontSize: '1.6rem',
      lineHeight: '1.92rem',
      fontWeight: 400,
      fontFamily: `'Lato', sans-serif;`
    },
    h1: {
      fontSize: '3.6rem',
      lineHeight: '4.3rem',
      fontWeight: 700,
      fontFamily: `'Lato', sans-serif;`
    },
    h1Two: {
      fontSize: '3.6rem',
      lineHeight: '4.3rem',
      fontWeight: 500,
      fontFamily: `'Lato', sans-serif;`
    },
    h2: {
      fontSize: '2.4rem',
      lineHeight: '2.88rem',
      fontWeight: 400,
      fontFamily: `'Lato', sans-serif;`
    },
    h2Two: {
      fontSize: '2.4rem',
      lineHeight: '2.88rem',
      fontWeight: 700,
      fontFamily: `'Lato', sans-serif;`
    },
    h3: {
      fontSize: '1.8rem',
      lineHeight: '2.16rem',
      fontWeight: 400,
      fontFamily: `'Lato', sans-serif;`
    },
    h3Two: {
      fontSize: '1.8rem',
      lineHeight: '2.16rem',
      fontWeight: 700,
      fontFamily: `'Lato', sans-serif;`
    },
    h5: {
      fontSize: '1.4rem',
      lineHeight: '1.68rem',
      fontWeight: 600,
      fontFamily: `'Lato', sans-serif;`
    },
    h6: {
      fontSize: '1.4rem',
      lineHeight: '1.68rem',
      fontWeight: 700,
      fontFamily: `'Lato', sans-serif;`
    },
    body: {
      fontSize: '1.6rem',
      lineHeight: '2.272rem',
      fontWeight: 600,
      fontFamily: `'Lato', sans-serif;`
    },
    body2: {
      fontSize: '1.4rem',
      lineHeight: '1.988rem',
      fontWeight: 500,
      fontFamily: `'Lato', sans-serif;`
    },
    body3: {
      fontSize: '1.4rem',
      lineHeight: '1.988rem',
      fontWeight: 600,
      fontFamily: `'Lato', sans-serif;`
    },
    body4: {
      fontSize: '1.4rem',
      lineHeight: '2.1rem',
      fontWeight: 400,
      fontFamily: `'Lato', sans-serif;`
    }
  }
};

export type Theme = typeof theme;

export type VariantTypography = keyof Theme['fonts'];

export type ColorType = keyof Theme['colors'];

export default theme;
