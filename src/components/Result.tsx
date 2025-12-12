import type { Component, Setter } from "solid-js";
import type { ResultType } from "../types/quiz";
import Button from "./Button";

const Result: Component<{
    result: ResultType;
    questionIndex: number;
    setQuestionIndex: Setter<number | null>;
    setSelectedAnswers: Setter<Record<number, number>>;
}> = (props) => {
    return (
        <div class="flex flex-col items-center text-center p-6 mx-auto space-y-6 fade-in max-w-xl 2xl:max-w-2xl">
            <h1 class="text-4xl text-gray-800">{props.result.result}</h1>

            {props.result.imageUrl && (
                <img
                    src={props.result.imageUrl}
                    alt={props.result.result}
                    draggable="false"
                    class="rounded-2xl w-full mx-auto shadow-md"
                />
            )}

            {props.result.description && (
                <div
                    class="text-lg text-gray-600 leading-relaxed"
                    innerHTML={props.result.description}
                />
            )}

            <div class="flex justify-center gap-4 shrink-0 py-4 w-full">
                <Button
                    fullWidth
                    onClick={() => {
                        const newIndex = props.questionIndex - 1;
                        props.setQuestionIndex(newIndex < 0 ? null : newIndex);
                    }}
                >
                    Previous
                </Button>
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
        </div>
    );
};

export default Result;
