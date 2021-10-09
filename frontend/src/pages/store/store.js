import React, { useEffect, useState } from 'react'

import { connect, useDispatch } from "react-redux"
import { addShopComment, createBooking, fetchBookings, fetchPosts, fetchShop, fetchShopComments } from '../../redux/actions/shopActions';

import Nav from "../../components/nav/nav";
import Comment from "../../components/comment/comment";
import Calendar from '../../components/calendar/calendar';
import Map from '../../components/map/leaflet-map';
import Alert from '../../components/alerts/alerts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCommentSlash, faStar } from '@fortawesome/free-solid-svg-icons';

import "./store.css";
import Post from '../../components/post/post';

const Store = props => {
    const [shopData, setShopData] = useState({ data: [] });
    const [posts, setPosts] = useState({ data: [] });
    const [comments, setComments] = useState({ data: [] });
    const [comment, setComment] = useState({ content: "", rating: 0, commented_store: props.match.params.id });

    const dispatch = useDispatch();

    useEffect(() => {
        getShop();
        getPosts();
        getComments();
    }, [dispatch, props.shop_data]);

    function getShop() {
        if (props.shop_data.length === 0) {
            dispatch(fetchShop(props.match.params.id));
        } else {
            setShopData({ data: props.shop_data[0] });
        };
    };

    function getPosts() {
        if (props.shop_data.length === 0) {
            dispatch(fetchPosts(props.match.params.id));
        } else {
            setPosts({ data: props.posts });
        };
    };

    function getComments() {
        if (props.comments.length === 0) {
            dispatch(fetchShopComments(props.match.params.id));
        } else {
            setComments({ data: props.comments[0] });
        };
    };

    function renderComments() {
        const all_comments = comments.data.map(comment => {
            return (
                <div key={comment.id}>
                    <Comment data={comment} />
                    <br />
                </div>
            );
        });

        if (all_comments.length > 0) {
            return all_comments;
        } else {
            return (
                <div className="no-reviews">
                    <div className="comment-slash">
                        <FontAwesomeIcon icon={faCommentSlash} />
                    </div>
                    <div className="text">This shop has no reviews.</div>
                </div>
            );
        };
    };

    function renderMap() {
        if (shopData.data.length !== 0) {
            return <Map 
                location={[parseFloat(shopData.data.location.slice(1, 9)), parseFloat(shopData.data.location.slice(12, -2))]} 
                message={shopData.data.name}
            />
        };
        return null;
    };

    function handleCommentChange(event) {
        setComment({ ...comment, [event.target.name]: event.target.value });
    };

    function handleCommentSubmit() {
        window.event.preventDefault()
        dispatch(addShopComment(comment));
        window.location.reload();
    };

    function renderStars() {
        return [...Array(5)].map((star, id) => {
            const i = id + 1;
            return (
                <label htmlFor={"star " + i} key={i}>
                    <input type="radio" name="rating" value={i} />
                    <FontAwesomeIcon 
                        icon={faStar} 
                        className={"star " + i} 
                        onClick={() => setComment({
                            ...comment,
                            rating: i,
                        })}
                        color={parseInt(comment.rating) < i ? "grey" : "#D9BC00"}
                    />
                </label>
            );
        });
    };

    function renderPosts() {
        const all_posts = posts.data.map(post => {
            return (
                <Post data={post} key={post.id} />
            );
        });
        return all_posts;
    };

    return (
        <div className="store">
            <Nav />
            {props.all_messages.map(message => {
                return <Alert message={message[1]} type={message[0]} key={message.id} />
            })}

            <div className="store-info">
                <div className="col first-col">
                    <h1>{shopData.data.name}</h1>
                    <img src={shopData.data.images_url} className="image" alt="image" />
                </div>

                <div className="col second-col">
                    <Calendar id={props.match.params.id} shop={shopData.data} />
                </div>
            </div>

            <div className="map">
                <div className="map-title">
                    <h3>Shop's Location</h3>
                </div>
                <div className="map-container">
                    {renderMap()}
                </div>
            </div>

            <div className="posts">
                <div className="posts-title">
                    <h3>Posts</h3>
                </div>
                <div className="posts-inner">
                    {renderPosts()}
                </div>
            </div>

            <div className="review-form">
                <div className="comment-form-holder">
                    <div className="review-title-holder">
                        <h3>Write a Review</h3>
                    </div>
                    <div className="stars-wrapper">
                        <div className="stars">
                            {renderStars()}
                        </div>
                    </div>
                    <form method="post" className="comment-form" id="comment-form">
                        <textarea type="text" name="content" id="content" className="content" placeholder="Write a review..." onChange={handleCommentChange} required />
                        <FontAwesomeIcon icon={faPaperPlane} className="send-button" onClick={handleCommentSubmit} />
                    </form>
                </div>


                <div className="reviews">
                    <div className="comments-container">
                        {renderComments()}
                    </div>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        shop_data: state.shops.current_shop,
        posts: state.shops.posts,
        comments: state.shops.comments,
        all_messages: state.msg.messages,
    };
};

export default connect(mapStateToProps)(Store);