import React, { useState, useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';

import { fetchShops, fetchFavouriteShops } from '../../redux/actions/shopActions';

import Banner from "./welcome-banner.png";

import StoreCard from '../../components/store-card/store-card';
import StoreCard2 from '../../components/store-card/store-card-2';
import Carousel from 'react-bootstrap/Carousel'
import Nav from '../../components/nav/nav';
import Footer from '../../components/footer/footer';

import "./home.css";

const Home = props => {
    const [shops, setShops] = useState({ data: [] });

    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, [dispatch, props.all_shops]);

    function fetchData() {
        if (props.all_shops.length > 0 ) {
            setShops({data: props.all_shops});
        } else {
            dispatch(fetchShops());
        };
    };
    
    function renderCarousel(items) {
        return <Carousel>
            <Carousel.Item>
                <a href="/">
                    <img src={Banner} />
                </a>
            </Carousel.Item>
            {shops.data.slice(0, items).map(shop => {
                return (
                    <Carousel.Item interval={4000}>
                        <a href={`store/${shop.id}`}>
                            <img src={shop.images_url.split(", ").slice(0)} />
                        </a>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    };

    return (
        <div className="home">
            <Nav />
            <div className="home-inner">
                <div className="carousel-wrapper">
                    {renderCarousel(5)}
                </div>

                <div className="recommendations-wrapper">
                    <p className="header">Recommendations: </p>
                    <div className="cards-wrapper">
                        {shops.data.slice(0, 3).map(shop => {
                            return <StoreCard2 data={shop} key={shop.id} />
                        })}
                        {/* {shops.data[0] ? (
                            <StoreCard2 data={shops.data[0]} key={shops.data[0].id} />
                        ) : (
                            <></>
                        )} */}
                    </div>
                </div>

                <div className="categories-wrapper">
                    
                </div>

                <div className="more-shops-wrapper">
                    <p className="header">More Shops:</p>
                    <div className="stores-wrapper">
                        {shops.data.map(shop => {
                            return <StoreCard data={shop} key={shop.id} />
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        all_shops: state.shops.all_shops,
    };
};

export default connect(mapStateToProps)(Home);