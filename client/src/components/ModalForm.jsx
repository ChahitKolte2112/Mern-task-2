import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create, updateexpense } from "../redux/expenseSlice";
import { setIsopen } from "../redux/modalSlice";
import "../component/FormComponent.css";

const ModalForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { editFormData } = useSelector((state) => state.modal);
    const [enteredTitle, setEnteredTitle] = useState(editFormData.title);
    const [enteredDescription, setEnteredDescription] = useState(
        editFormData.description
    );

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };
    const priceChangeHandler = (event) => {
        setEnteredDescription(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const postData = {
            _id: editFormData._id,
            title: enteredTitle,
            price: enteredAmount,
        };
        // console.log(expenseData.date);
        dispatch(updatepost(postData));
    };

    const cancelHandler = () => {
        dispatch(setIsopen());
    };

    return (
        <div className="form_container">
            <form onSubmit={submitHandler}>
                <div className="new-expense__controls">
                    <div className="new-expense__control">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={enteredTitle}
                            onChange={titleChangeHandler}
                        />
                    </div>
                    <div className="new-expense__control">
                        <label>Description</label>
                        <input
                            type="textarea"
                            name="description"
                            value={enteredAmount}
                            onChange={priceChangeHandler}
                        />
                    </div>
                </div>
                <div className="new-expense__actions">
                    <button
                        type="button"
                        onClick={cancelHandler}
                        className="new-expense__actionsitem"
                    >
                        Back
                    </button>
                    <button type="submit" className="new-expense__actionsitem">
                        Make Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalForm;
