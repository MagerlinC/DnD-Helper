import React, { Component } from 'react';
import './App.scss';
import * as PropTypes from "prop-types";

class AppFooter extends Component {

    render() {
        return (
            <div className="app-footer">
                <div className="total-used">
                    <div className="footer-spacer"/>
                    <p className="total-value">{this.props.totalUsed}/{this.props.totalAvailable}</p>
                    <p className="cost-unit">{this.props.costUnit}</p>
                </div>
            </div>
        );
    }
}

AppFooter.propTypes = {
    totalUsed: PropTypes.number.isRequired,
    totalAvailable: PropTypes.number.isRequired,
    costUnit: PropTypes.string.isRequired,
};

export default AppFooter;
