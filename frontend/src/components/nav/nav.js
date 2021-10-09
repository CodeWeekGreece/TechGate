import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faSearch, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import Logo from "./logo-text.svg";

import { connect, useDispatch } from 'react-redux';

import "./nav.css";
import { searchShop } from '../../redux/actions/shopActions';
import StoreCard from '../store-card/store-card';

const Nav = props => {    
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [results, setResults] = useState({ data: [] });

    const dispatch = useDispatch()

    useEffect(() => {
        const controller = new AbortController();
        dispatch(searchShop(search));
        return () => {
            controller.abort();
        };
    }, [debouncedSearch]);

    useEffect(() => {
        const handle = setTimeout(() => {
            setDebouncedSearch(search);
        }, 600);

        return () => {
            clearTimeout(handle)
        };
    }, [search]);

    useEffect(() => {
        if (props.results.length !== 0) {
            setResults({
                data: [props.results],
            });
        };
    }, [props.results]);

    function renderResults() {
        if (results.data.lenght > 0) {
            return results.data.map(result => {
                return <StoreCard data={result} id={result.id} />
            });
        };
    };

    function handleChange(event) {
        setSearch(event.target.value);
    };

    return (
        <nav>
            <input type="checkbox" name="nav-toggle" id="nav-toggle" />
            <label htmlFor="nav-toggle">
                <span></span>
            </label>
            <div className="nav-inner">
                <div className="logo-container">
                    <Link to="/">
                        <img src={Logo} className="logo" />
                    </Link>
                </div>
                <div className="links-container">
                    <Link to="/" className="navlink">
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                    <Link to="/favourites" className="navlink">
                        <FontAwesomeIcon icon={faHeart} />
                    </Link>
                    <Link to="/bookings-list" className="navlink">
                        <FontAwesomeIcon icon={faClock} />
                    </Link>
                    <Link to="/account" className="navlink">
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                </div>
                <div className="search-box">
                    <input type="text" name="search" id="search" placeholder="Search..." onChange={handleChange} />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <div className="results">
                        {renderResults()}
                    </div>
                </div>
            </div>
        </nav>
    );
};

function mapStateToProps(state) {
    return {
        logged_in: state.auth.logged_in,
        results: state.shops.search_results,
    };
};

export default connect(mapStateToProps)(Nav);