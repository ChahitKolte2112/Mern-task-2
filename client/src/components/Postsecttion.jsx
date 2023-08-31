import React from "react";
import postimage2 from "../assests/postimage2.jpg";
import TextArea from "./TextArea";
import { useDispatch } from "react-redux";
import { Deletepost } from "../api/post";
import { setEditFormData, setIsopen } from "../slices/modalSlice";
import { useNavigate } from "react-router-dom";
const Postsecttion = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onDelete = async () => {
        await Deletepost(props.item._id, dispatch, navigate);
    };
    const onEdit = () => {
        const data = props.item._id;
        // dispatch(setEditFormData(data));
        // dispatch(setIsopen());
    };
    return (
        <div
            style={{
                border: "2px solid black",
                width: "50%",
                background: "white",
            }}
        >
            <h3 style={{ marginLeft: "50px" }}>{props.item.title}</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {props.item.img_url && <img src={props.item.img_url}></img>}
            </div>
            <div style={{ marginLeft: "50px" }}>
                <TextArea str={props.item.description} />
            </div>
            <div style={{ display: "flex" }}>
                <div className="post-item__button" onClick={onEdit}>
                    <i
                        className="fa fa-edit"
                        aria-hidden="true"
                        style={{ fontSize: "24px", margin: "10px" }}
                    ></i>
                </div>
                <div className="post-item__button" onClick={onDelete}>
                    <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        style={{ fontSize: "24px", margin: "10px" }}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default Postsecttion;
