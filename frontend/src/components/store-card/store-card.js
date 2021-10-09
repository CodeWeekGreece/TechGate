import React, { useState, useEffect, useCallback } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faDollarSign, faClock, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Price2 } from "./price-range-2.svg";
import { ReactComponent as Price3 } from "./price-range-3.svg";

import { connect, useDispatch } from 'react-redux';

import "./store-card.css";
import { addFavouriteShop, removeFavouriteShop } from '../../redux/actions/shopActions';


const StoreCard = props => {
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

    function renderPriceRange() {
        if (props.data.price_range === 3) {
            return <Price3 className="price-range" />;
        } else if (props.data.price_range === 2) {
            return <Price2 className="price-range" />;
        } else {
            return <FontAwesomeIcon icon={faDollarSign} className="price-range price-one" />;
        };
    };

    return (
        <div className="store-card">

            <a className="store-card-link" href={"store/" + props.data.id}>
                <div className="image">
                        <img src={props.data.images_url.split(", ").slice(0)} />
                </div>

                <div className="title-description">
                    <div className="title">
                        {props.data.name}
                    </div>
                    <div className="description">
                        <div className="address">
                            <FontAwesomeIcon icon={faMapMarker} /> {props.data.address}
                        </div>
                        <div className="time">
                            <FontAwesomeIcon icon={faClock} /> {props.data.opening_time.slice(0, 5)} - {props.data.closing_time.slice(0, 5)}
                        </div>
                    </div>
                </div>
            </a>

            <div className="favourite-price">
                <div className="favourite">
                    <FontAwesomeIcon icon={faHeart} className={renderFavourite()} onClick={handleLike} />
                </div>
                <div className="price">
                    <div className="dollar-signs">
                        {renderPriceRange()}
                    </div>
                </div>
            </div>

        </div>
    );
};

function mapStateToProps(state) {
    return {
        fav_shops: state.shops.favourites,
    };
};


export default connect(mapStateToProps)(StoreCard);