/**
 * Created by mac on 08/09/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';

class CardModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardModalType: null,
        }
    }

    handleCardTypeSelection(value) {
        this.setState({cardModalType: value});
        if(this.firstInput) {
            this.firstInput.focus();
        }
    };

    render() {
        return (  <div className="card-modal">
            <div className="card-modal-content">
                <h1 className="card-modal-header">
                    Add Card
                </h1>
                <div className="card-modal-types">
                    <button
                        onClick={() => this.handleCardTypeSelection('spell')}
                        className={this.state.cardModalType === 'spell' ? 'card-modal-type-button active' : "card-modal-type-button "}>Spell</button>
                    <button
                        onClick={() => this.handleCardTypeSelection('ability')}
                        className={this.state.cardModalType === 'ability' ? 'card-modal-type-button active' : "card-modal-type-button "}>Ability</button>
                </div>
                {
                    this.state.cardModalType? (
                        this.state.cardModalType === 'spell' ?
                            <div className="card-modal-spell-input">
                                <div className="input-section">

                                    <p className="card-modal-input-label">
                                        Spell Name
                                    </p>
                                    <input ref={input => this.firstInput = input} value={this.props.inputLabel} onChange={(e) => this.props.handleInputDidChange(e)} className="card-modal-input"/>
                                </div>
                                <button className="card-modal-add-button" onClick={() => this.props.handleAddSpellCard()}>Add Spell</button>
                            </div>
                            :
                            <div className="card-modal-ability-input">
                                <div className="input-section">
                                    <p className="card-modal-input-label">
                                        Ability Name
                                    </p>
                                    <input value={this.props.inputLabel} onChange={(e) => this.props.handleInputDidChange(e)} className="card-modal-input"/>
                                </div>
                                <button className="card-modal-add-button" onClick={() => this.handleAddAbilityCard()}>Add Ability</button>
                            </div>) : null
                }
            </div>
        </div>);
    }
}
CardModal.propTypes = {
    handleInputDidChange: PropTypes.func.isRequired,
    handleAddAbilityCard: PropTypes.func.isRequired,
    handleAddSpellCard: PropTypes.func.isRequired,
};

export default CardModal;