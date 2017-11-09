import {grey50, grey800, grey700, grey600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//global.navigator = global.navigator || {};
//global.navigator.userAgent = global.navigator.userAgent || 'all';

const muiTheme = getMuiTheme({
    palette: {
      textColor: grey50,
      canvasColor: grey800,
      primary1Color: grey700,
      primary2Color: grey700,
      primary3Color: grey600,
    },
    appBar: {
      height: 50,
    },
    userAgent: (typeof navigator !== 'undefined' && navigator.userAgent) || 'all',
  });
export default muiTheme;