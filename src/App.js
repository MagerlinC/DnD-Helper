import React, { Component } from 'react';
import './App.scss';
import SpellCard from "./spell_card";
import AbilityCard from "./ability_card";
import AppFooter from "./app_footer";
import axios from 'axios';
import NewPlayerSection from "./new-player-section";
import CardModal from "./card_modal";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerConfirmed: false,
            playerName: '',
            playerClass: '',
            playerLevel: 0,
            totalUsed: 0,
            totalAvailable: 0,
            selectedSpells: [],
            selectedAbilities: [],
            availableSpells: [],
            cardModalOpen: false,
            cardModalType: null,
            input: '',
        };
        this.baseUrl = 'https://api-beta.open5e.com/';
        this.title = 'Test App';
    }

    componentDidMount() {
        this.getAvailableSpells();
    }

    getSpellSlotsAvailable(playerLevel) {
        //axios.get('http://www.dnd5eapi.co/api/classes/')
        //  .then(response => console.log(response));
        return Number(playerLevel);
    }

    takeShortRest(){

    }

    takeLongRest() {
        this.setState({totalUsed: 0});
    }

    handlePlayerNameInputDidChange(name) {
        this.setState({playerName: name});
    }

    handlePlayerClassInputDidChange(playerClass) {
        this.setState({playerClass: playerClass});
    }

    handlePlayerLevelInputDidChange(playerLevel) {
        this.setState({playerLevel: playerLevel, totalAvailable: this.getSpellSlotsAvailable(playerLevel)});
    }

    handleNewPlayerConfirmed() {
        this.setState({playerConfirmed: true});
    }
    handleInputDidChange(e) {
        this.setState({input: e.target.value});
    }


    getSpellObjectFromName(name) {
        let obj = null;
        this.state.availableSpells.forEach(spellObj => {
            if(spellObj.name.toLowerCase().includes(name.toLowerCase())) {
                obj = spellObj;
            }
        });
        return obj;

    }

    getAvailableSpells() {
        axios.get(this.baseUrl + 'spells/').then(res => {
            this.setState({availableSpells: res.data.results});
        });
    }

    handleAddSpellCard() {
        const spellToAdd = this.getSpellObjectFromName(this.state.input);
        this.setState((prevState) => {
            const spells = prevState.selectedSpells;
            spells.push({id: spellToAdd.slug, name: spellToAdd.name, description: spellToAdd.desc, level: spellToAdd.level });
            return {selectedSpells: spells};
        });
        this.closeCardModal();
    }


    handleAddAbilityCard() {
        const abilityToAdd = this.getSpellObjectFromName(this.state.input);

        this.setState((prevState) => {
            const abilities = prevState.selectedAbilities;
            abilities.push({id: abilityToAdd.index, name: this.state.input, description: abilityToAdd.desc, cost: this.getSpellObjectFromName(this.state.input).cost });
            return {selectedSpells: abilities};
        });
        this.closeCardModal();
    }

    getSpellCostUnit() {
        switch(this.state.playerClass.toLowerCase()) {
            case 'monk':
                return 'KI';
            default:
                return 'Mana';
        }
    }

    getAbilityUsesFromId(id) {
        let cost = 0;
        this.state.selectedAbilities.forEach(elem => {
            if(elem.id === id) {
                cost = elem.uses;
            }
        });
        return cost;
    }

    handleSpellCast(spellLevel) {
        if(this.state.totalAvailable - this.state.totalUsed < spellLevel) {
            return;
        }
        else this.setState(prevState => {
            return {totalUsed: prevState.totalUsed + spellLevel};
        });
    }

    handleAbilityUse(id) {

    }

    openCardModal() {
        this.setState({cardModalOpen: true, inputLabel: '', inputValue: ''});
    }

    closeCardModal() {
        this.setState({cardModalOpen: false});
    }

    handleCardTypeSelection(value) {
        this.setState({cardModalType: value});
        if(this.firstInput) {
            this.firstInput.focus();
        }
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="app-title">
                        <h1 className="app-title-text">{this.title} V0.1</h1>
                    </div>

                    {
                        this.state.playerConfirmed ?  <div className="header-options">
                            <button className="add-card-button" onClick={() => this.openCardModal()}>+</button>
                        </div> : null
                    }
                </header>
                {
                    !this.state.playerConfirmed ?
                        <NewPlayerSection playerName={this.state.playerName}
                                          playerClass={this.state.playerClass}
                                          playerLevel={this.state.playerLevel}
                                          onClassChange={(e) => this.handlePlayerClassInputDidChange(e)}
                                          onNameChange={(e) => this.handlePlayerNameInputDidChange(e)}
                                          onLevelChange={(e) => this.handlePlayerLevelInputDidChange(e)}
                                          canConfirm={((this.state.playerName.length > 0) && (this.state.playerClass.length > 0) && this.state.playerLevel) ? true : false}
                                          onConfirm={() => this.handleNewPlayerConfirmed()}
                        />
                        : null
                }
                {
                    this.state.playerConfirmed ?
                        <div className="app-contents">
                            <div className="app-actions">
                                <button className="long-rest-button" onClick={() => this.takeLongRest()}>
                                    Take Long Rest
                                </button>
                                <button className="short-rest-button" onClick={() => this.takeShortRest()}>
                                    Take Short Rest
                                </button>
                            </div>
                            <div className="card-lists">
                                <div className="card-list spells">
                                    {
                                        this.state.selectedSpells ? (
                                            this.state.selectedSpells.map((spell, index) => {
                                                return (
                                                    <SpellCard id={spell.slug}
                                                               key={index}
                                                               name={spell.name}
                                                               description={spell.description}
                                                               level={spell.level}
                                                               onSpellCast={(level) => this.handleSpellCast(level)}
                                                               isDisabled={(this.state.totalUsed >= this.state.totalAvailable)
                                                               || this.state.totalAvailable - this.state.totalUsed < spell.cost}
                                                    />);
                                            })
                                        ) : null
                                    }
                                </div>
                                <div className="card-list abilities">
                                    {
                                        this.state.selectedAbilities ? (
                                            this.state.selectedAbilities.map((ability, index) => {
                                                return (
                                                    <AbilityCard id={ability.id}
                                                                 key={index}
                                                                 name={ability.name}
                                                                 description={ability.description}
                                                                 cost={ability.cost}
                                                                 onAbilityUse={(id) => this.handleAbilityUse(id)}
                                                    />);
                                            })
                                        ) : null
                                    }
                                </div>
                            </div>
                            <AppFooter totalUsed={this.state.totalUsed} totalAvailable={this.state.totalAvailable} costUnit={this.getSpellCostUnit()}/>
                        </div>: null
                }
                {
                    this.state.cardModalOpen ?
                       <CardModal
                           handleAddAbilityCard={this.handleAddAbilityCard.bind(this)}
                           handleAddSpellCard={this.handleAddSpellCard.bind(this)}
                           handleInputDidChange={this.handleInputDidChange.bind(this)}
                       />
                        : null
                }
            </div>
        );
    }
}

export default App;
