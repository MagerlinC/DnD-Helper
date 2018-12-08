/**
 * Created by mac on 08/09/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';


class NewPlayerSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleSetName(name) {
        this.props.onNameChange(name);
    }

    handleSetClass(playerClass) {
        this.props.onClassChange(playerClass);
    }

    handleSetLevel(level) {
        this.props.onLevelChange(level);
    }

    render() {
        return (
                <div className={'new-player-section'}>
                    <h1>Name</h1>
                    <input onChange={e => this.handleSetName(e.target.value)} value={this.props.playerName} className="player-name-input"/>
                    <h1>Class</h1>
                    <input onChange={e => this.handleSetClass(e.target.value)} value={this.props.playerClass}  className="player-class-input"/>
                    <h1>Level</h1>
                    <input onChange={e => this.handleSetLevel(Number(e.target.value))} value={this.props.playerLevel}  className="player-level-input"/>
                    <button className={this.props.canConfirm ? "confirm-new-player-button ready" : "confirm-new-player-button"} onClick={() => this.props.onConfirm()}>
                        Confirm
                    </button>
                </div>
        );
    }
}

NewPlayerSection.propTypes = {
    playerName: PropTypes.string.isRequired,
    playerClass: PropTypes.string.isRequired,
    playerLevel: PropTypes.number.isRequired,
    onNameChange: PropTypes.func,
    onClassChange: PropTypes.func,
    onLevelChange: PropTypes.func,
    canConfirm: PropTypes.bool,
    onConfirm: PropTypes.func,
};

export default NewPlayerSection;
