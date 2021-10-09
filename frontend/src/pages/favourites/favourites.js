import React, { useState, useEffect } from 'react';
import StoreCard from '../../components/store-card/store-card';

import { useDispatch, useSelector, connect } from 'react-redux';

import { fetchFavouriteShops } from '../../redux/actions/shopActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';

import Nav from '../../components/nav/nav';

import "./favourites.css";

const Favourites = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavouriteShops());
    }, [dispatch]);

    function getData() {
        const array = [];
        for (let index in props.fav_shops) {
            array.push(props.fav_shops[index].store);
        };
        return array;
    };

    function renderStores() {
        const stores = []
        getData().map(fav_shop => {
            stores.push(<StoreCard data={fav_shop} key={fav_shop.id} />)
        });

        if (stores.length !== 0) {
            return stores;
        } else {
            return (
                <div className="no-stores">
                    <div className="no-stores-message">
                        <FontAwesomeIcon icon={faHeartBroken} className="heart-broken" />
                        <p className="no-stores-message-text">You don't have any shops in favourites.</p>
                    </div>
                </div>
            );
        };
    };

    return (
        <div className="favourites">
            <Nav />
            <div className="stores-wrapper">
                {renderStores()}
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        fav_shops: state.shops.favourites,
    };
};

export default connect(mapStateToProps)(Favourites);