import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';

import { grey50 } from 'material-ui/styles/colors';
import Done from 'material-ui/svg-icons/action/done';

export default class Info extends Component {
    constructor(props) {
        super(props)
        var accepted = false;
        if (typeof localStorage !== 'undefined') {
            accepted = localStorage.getItem("AlgoliaBannerAccepted") != null;
        }
        this.state = { open: true, accepted: accepted };
    }

    close(reason = "accept") {
        switch (reason) {
            case "accept":
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("AlgoliaBannerAccepted", true);
                }
                this.setState({ open: false, accepted: true });
                break;
            default:
                if (this.state.accepted) {
                    this.setState({ open: false });
                }
                break

        }
    }

    render() {
        return <MuiThemeProvider>
            <Snackbar
                open={this.state.open}
                message={<a href="https://www.algolia.com" style={{}}><img style={{ marginTop: 10, width: 200 }} src="https://www.algolia.com/static_assets/images/press/downloads/search-by-algolia-white.png" /></a>}
                action={<Done color={grey50} />}
                autoHideDuration={5000}
                onActionClick={() => this.close()}
                onRequestClose={(reason) => this.close(reason)}
            />
        </MuiThemeProvider>
    }
}