import React, { Component } from 'react';

import "./post.css";

const Post = props => {
    return (
        <div className="post">
            <h4 className="title">{props.data.title}</h4>
            <div className="image">
                <img src={props.data.image_url} />
            </div>
            <div className="description">{props.data.description}</div>
        </div>
    );
};

export default Post;