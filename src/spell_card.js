/**
 * Created by mac on 08/09/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import Swipeable from 'react-swipeable';

class SpellCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            timesUsed: this.props.timesUsed,
            type: this.props.type,
            usesLeft: this.props.uses,
        }
    }

    handleSpellCast() {
        let slotToExpand = parseInt(this.props.level, 10);
        this.props.onSpellCast(slotToExpand ? slotToExpand : 0);
    }

    toggleExpand() {
        this.setState(prevState => {
            return {isExpanded: !prevState.isExpanded};
        });
    }

    render() {
        return (
            <Swipeable onSwiped={() => this.props.isDisabled? null : this.handleSpellCast()}>
                <div ref={c => this.card = c} className={this.props.isDisabled ? 'spell-card disabled' : 'spell-card'} onClick={() => this.toggleExpand()}>
                    <header className="card-header">
                        <p className="card-title">{this.props.id} {this.props.name}</p>
                        <p className="spell-cost">{this.props.level}</p>
                    </header>
                    {
                        this.state.isExpanded ?
                            <p className="spell-description">
                                {this.props.description}
                            </p>
                            : null
                    }
                </div>
            </Swipeable>
        );
    }
}

SpellCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.string,
    description: PropTypes.string.isRequired,
    onSpellCast: PropTypes.func,
    timesUsed: PropTypes.number,
    isDisabled: PropTypes.bool,
};

export default SpellCard;
