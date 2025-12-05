import type { Component, Setter } from "solid-js";

const Start: Component<{
    title: string;
    description?: string;
    imageUrl?: string;
    setQuestionIndex: Setter<number | null>;
}> = (props) => {
    return (
        <div class="start-screen">
            <h1>{props.title}</h1>
            <p>{props.description}</p>

            {props.imageUrl && (
                <img
                    src={props.imageUrl}
                    alt={props.title}
                    class="start-image"
                />
            )}

            <button
                class="start-button"
                onClick={() => props.setQuestionIndex(0)}
            >
                Start
            </button>
        </div>
    );
};

export default Start;
