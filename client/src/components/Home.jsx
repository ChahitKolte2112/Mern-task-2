import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { selectUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { SignOut } from "../api/auth";
import Spinner from "./Spinner";
import Header from "../components/Header";
import PostForm from "./PostForm";
import Postsecttion from "./Postsecttion";
import { Getall } from "../api/post";

const Home = () => {
    const user = useSelector(selectUser);
    const isopen = useSelector((state) => state.modal.isOpen);
    const navigate = useNavigate();

    const loading = useSelector((state) => state.loader.loading);
    const dispatch = useDispatch();
    const postData = useSelector((state) => state.data.postdata);
    const [post, setPost] = useState([...postData]);

    useEffect(() => async () => {
        await Getall(dispatch, navigate);
    });
    return (
        <>
            <div>
                <Header />
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px",
                }}
            >
                <PostForm />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {postData.map((item, index) => {
                    return <Postsecttion key={item._id} item={item} />;
                })}
            </div>
            {loading && <Spinner />}
        </>
    );
};

export default Home;
