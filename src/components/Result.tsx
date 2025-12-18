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
        <div class="flex flex-col items-center w-full h-dvh overflow-auto">
            <div class="flex flex-col items-center text-center p-6 space-y-6 fade-in max-w-3xl my-auto">
                <h1 class="text-3xl text-gray-700">{props.result.result}</h1>

                {props.result.imageUrl && (
                    <img
                        src={props.result.imageUrl}
                        alt={props.result.result}
                        draggable="false"
                        class="rounded-md w-full mx-auto shadow-md"
                    />
                )}

                {props.result.description && (
                    <div
                        class="text-sm text-gray-600 leading-relaxed flex flex-col space-y-4"
                        innerHTML={props.result.description}
                    />
                )}

                <div class="flex justify-center gap-4 shrink-0 py-4 w-full">
                    <Button
                        fullWidth
                        onClick={() => {
                            const newIndex = props.questionIndex - 1;
                            props.setQuestionIndex(
                                newIndex < 0 ? null : newIndex
                            );
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
        </div>
    );
};

export default Result;
