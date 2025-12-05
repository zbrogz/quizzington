import type { Component, Setter } from "solid-js";
import type { ResultType } from "../types/quiz";

const Result: Component<{
    result: ResultType;
    setQuestionIndex: Setter<number | null>;
    setSelectedAnswers: Setter<Record<number, number>>;
}> = (props) => {
    return (
        <div class="result-screen">
            <h1>Your Result: {props.result.result}</h1>
            <img
                src={props.result.imageUrl}
                alt={props.result.result}
                class="result-image"
            />
            <button
                class="restart-button"
                onClick={() => {
                    props.setQuestionIndex(null);
                    props.setSelectedAnswers({});
                }}
            >
                Restart Quiz
            </button>
        </div>
    );
};

export default Result;
