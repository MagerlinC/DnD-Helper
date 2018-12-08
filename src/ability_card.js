/**
 * Created by mac on 08/09/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import Swipeable from 'react-swipeable';


class AbilityCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            isUsed: false,
            type: this.props.type,
            usesLeft: this.props.uses,
        }
    }

    handleUseAbility(abilityId) {
        this.props.onAbilityUse(abilityId);
    }

    toggleExpand() {
        this.setState(prevState => {
            return {isExpanded: !prevState.isExpanded};
        });
    }

    render() {
        return (
            <Swipeable onSwiped={() => this.handleUseAbility(this.props.id)}>
                <div className={this.props.isDisabled ? 'spell-card disabled' : 'ability-card'} onClick={() => this.toggleExpand()}>
                    <header className="card-header">
                        <p className="card-title">{this.props.id} {this.props.name}</p>
                        <p className="ability-cost">{this.props.cost}</p>
                    </header>
                    {
                        this.state.isExpanded ?
                            <p className="ability-description">
                                {this.props.description}
                            </p>
                            : null
                    }
                </div>
            </Swipeable>
        );
    }
}

AbilityCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    uses: PropTypes.number,
    description: PropTypes.string.isRequired,
    onAbilityUse: PropTypes.func,
    isDisabled: PropTypes.bool,
};

export default AbilityCard;
