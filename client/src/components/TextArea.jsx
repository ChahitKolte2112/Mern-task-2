import React from "react";
import { useState } from "react";
import "./TextArea.css";
const ReadLess = ({ text, maxCharacter, setReadMore }) => {
    const resultString = text.slice(0, maxCharacter);
    return (
        <>
            {" "}
            <pre className="post-content">{resultString}</pre>
            <p
                className="read"
                onClick={() => {
                    setReadMore(true);
                }}
            >
                Read more
            </p>
        </>
    );
};
const TextArea = (props) => {
    const [readmore, setReadMore] = useState(false);

    return (
        <>
            {!readmore ? (
                <ReadLess
                    text={props.str}
                    maxCharacter={50}
                    setReadMore={setReadMore}
                />
            ) : (
                <>
                    <pre className="post-content">{props.str}</pre>
                    <p
                        className="read"
                        onClick={() => {
                            setReadMore(false);
                        }}
                    >
                        Read less
                    </p>{" "}
                </>
            )}
        </>
    );
};

export default TextArea;
