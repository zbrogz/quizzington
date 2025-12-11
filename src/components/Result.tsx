import type { Component, Setter } from "solid-js";
import type { ResultType } from "../types/quiz";
import Button from "./Button";

const Result: Component<{
    result: ResultType;
    setQuestionIndex: Setter<number | null>;
    setSelectedAnswers: Setter<Record<number, number>>;
}> = (props) => {
    return (
        <div class="flex flex-col items-center text-center p-6 max-w-3xl mx-auto space-y-6 fade-in">
            <h1 class="text-4xl text-gray-800">{props.result.result}</h1>

            {props.result.imageUrl && (
                <img
                    src={props.result.imageUrl}
                    alt={props.result.result}
                    draggable="false"
                    class="rounded-2xl w-full mx-auto shadow-md"
                />
            )}

            <Button
                fullWidth
                onClick={() => {
                    props.setQuestionIndex(null);
                    props.setSelectedAnswers({});
                }}
            >
                Restart Quiz
            </Button>
        </div>
    );
};

export default Result;
