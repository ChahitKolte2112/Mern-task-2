import React, { useState } from "react";
import { Create, Getall } from "../api/post";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
// import { create } from "../redux/postSlice";
import "./FormComponent.css";

const PostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        title: "",
        description: "",
    });

    const [error, setError] = useState({
        title: false,
        description: false,
        image: false,
    });
    const changeHandler = (event) => {
        setDetails({ ...details, [event.target.name]: event.target.value });
        setError({ ...error, [event.target.name]: false });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        let { title, description } = error;

        if (details.title === "") title = true;
        if (details.description === "") description = true;

        if (!description && !title) {
            const postData = {
                title: details.title,
                description: details.description,
            };
            await Create(postData, dispatch, navigate);
            await Getall(dispatch, navigate);
            setDetails({
                title: "",
                description: "",
            });
        } else {
            setError({
                title,
                description,
            });
        }
    };
    const cancelHandler = () => {
        setDetails({
            title: "",
            description: "",
        });

        setError({
            title: false,
            description: false,
        });
    };

    return (
        <form style={{ width: "50%" }} onSubmit={submitHandler}>
            <div className="new-post__controls">
                <div className="new-post__control">
                    <label>Title</label>
                    <input
                        style={{ width: "90%", fontSize: "20px" }}
                        type="text"
                        name="title"
                        value={details.title}
                        onChange={changeHandler}
                    />
                    {error.title && (
                        <p className="error">Please add the title</p>
                    )}
                </div>
                <div className="new-post__control">
                    <label>Description</label>
                    <textarea
                        style={{
                            width: "90%",
                            minHeight: "100px",
                            fontSize: "20px",
                            borderRadius: "5px",
                        }}
                        type="textarea"
                        name="description"
                        value={details.description}
                        onChange={changeHandler}
                    />
                    {error.price && (
                        <p className="error">Please add Description</p>
                    )}
                </div>
            </div>
            <div className="new-post__actions">
                <button
                    type="button"
                    onClick={cancelHandler}
                    className="new-post__actionsitem"
                >
                    Cancel
                </button>
                <button type="submit" className="new-post__actionsitem">
                    Post
                </button>
            </div>
        </form>
    );
};

export default PostForm;
