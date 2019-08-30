// Core
import React, { Component } from 'react';
import $T from '../../support/translations.js';

// Model
import Palette from '../../models/Palette.js';

// Components
import Title from '../Title/Title.js';
import InputSearch from '../InputSearch/InputSearch.js';
import PaletteDisplay from '../PaletteDisplay/PaletteDisplay.js';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation.js';

// Styles
import styles from './SearchView.module.scss';


class SearchView extends Component {
    styles = styles;
    page=1;
    canLoadMore=true;
    searchTimeout = 0;
    lastSearch = "";
    
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            search: "",
            isPaginating: false,
            palettes: []
        }
    }

   handleSearch(value) {
        // Invalidate previous search.
        clearTimeout(this.searchTimeout);
        this.lastSearch = "";
        this.canLoadMore = true;
        
        if (this.state.isPaginating) return;
        
        this.setState({search: value});
        
        if (value.length < 3) return;

        this.searchTimeout = setTimeout(async () => {
            let searchPromise = Palette.search(value, 1);

            this.lastSearch = value;

            await searchPromise.catch((error) => {
                alert(error) 
            });

            if (value === this.lastSearch) {
                window.scrollTo(0, 0);
                this.setState({
                    palettes: Palette.all()
                })
            }
        }, 2000);        
    }

    handleScroll(event) {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            this.paginate();
        }
    }

    async paginate() {
        let wasPaletteCount = this.state.palettes.length;
        let palettes = [];

        if (!this.state.palettes.length) return;
        if (this.state.isPaginating) return;
        if (this.canLoadMore === false) return;
            
        this.setState({
            isPaginating: true
        })

        this.page++;

        await Palette.search(this.lastSearch, this.page).catch((error) => {
            alert(error)
        })

        palettes = Palette.all()

        if (wasPaletteCount === palettes.length) {
            this.canLoadMore = false;
        }

        this.setState({
            palettes: palettes,
            isPaginating: false
        })
    }

    componentDidMount() {
        // Refence needed to allow the listener to be removed.
        this.handleScroll = this.handleScroll.bind(this);

        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    render() {
        return (
            <div className={ this.styles["main"] }>
                <div className={ this.styles["header"] }>
                    <div className={ this.styles["inner-header"] }>
                        <div className={ this.styles["title-container"] }>
                            <Title/>
                        </div>
                        <div className={ this.styles["input-container"] }>
                            <InputSearch
                                placeholder={ $T("1") }
                                onchange={ this.handleSearch.bind(this) }
                                value={ this.state.value }
                            />
                        </div>
                    </div>
                </div>
                <div className={ this.styles["palette-list"] }>
                    {
                        !this.state.palettes.length &&
                        <div className={ this.styles["empty-list"] }>
                            { $T(2) }
                        </div>
                    }
                    {
                        this.state.palettes.map((palette) => (
                            <PaletteDisplay
                                key={ palette.id }
                                palette={ palette }
                            />
                        ))
                    }
                    {
                        this.state.isPaginating &&
                        <div className={ this.styles["loading-section"] }>
                            <div className={ this.styles["loading-container"] }>
                                <LoadingAnimation/>
                            </div>
                        </div>
                    }

                </div>
            </div>
        )
	}
}

export default SearchView;
