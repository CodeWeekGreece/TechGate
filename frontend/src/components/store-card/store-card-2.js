import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { connect, useDispatch } from 'react-redux';

import { addFavouriteShop, removeFavouriteShop } from '../../redux/actions/shopActions';

import "./store-card-2.css";


const StoreCard2 = props => {
    const [inFav, setFav] = useState({ inFav: false, likeClass: "white" });

    const dispatch = useDispatch();
    
    function isInFav() {
        for (let index in props.fav_shops) {
            if (parseInt(props.fav_shops[index].store.id) === props.data.id) {
                return setFav({
                    inFav: true,
                    likeClass: "red",
                });
            };
        };
        return setFav({
            inFav: false,
            likeClass: "white",
        });
    };

    useEffect(() => {
        isInFav();
    }, [dispatch, props, inFav.likeClass]);
    
    function handleLike() {
        if (isInFav() === true || inFav.inFav === true) {
            dispatch(removeFavouriteShop(props.data.id));
            setFav({
                inFav: true,
                className: "white",
            });
        } else {
            dispatch(addFavouriteShop(props.data.id));
            setFav({
                inFav: false,
                className: "red",
            });
        };
    };

    function renderFavourite() {
        if (inFav.inFav === true) {
            return inFav.likeClass
        } else {
            return inFav.likeClass
        };
    };

    return (
        <div className="store-card-2">
            <a href={"store/" + props.data.id}>
                <img src={props.data.images_url.split(", ").slice(0)} />
                {/* <FontAwesomeIcon icon={faHeart} className={renderFavourite()} onClick={handleLike} /> */}
            </a>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        fav_shops: state.shops.favourites,
    };
};


export default connect(mapStateToProps)(StoreCard2);