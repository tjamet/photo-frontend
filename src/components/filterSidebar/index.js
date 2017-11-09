import React, { Component } from 'react';

import theme from '../../theme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';

import ImageFilter from '../imageFilter';


export default class FilterSidebar extends Component {
    static propTypes = {
    }

    render() {
        return <MuiThemeProvider muiTheme={theme}>
            <Drawer
                docked={true}
                width={200}
                open={true}
                width={"20%"}
                openSecondary={true}
            >
                <ImageFilter/>
            </Drawer>
        </MuiThemeProvider>
    }
}