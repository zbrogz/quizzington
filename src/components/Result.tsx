import type { Component, Setter } from "solid-js";
import type { ResultType } from "../types/quiz";

const Result: Component<{
    result: ResultType;
    setQuestionIndex: Setter<number | null>;
    setSelectedAnswers: Setter<Record<number, number>>;
}> = (props) => {
    return (
        <div class="flex flex-col items-center text-center p-6 max-w-3xl mx-auto space-y-6">
            <h1 class="text-4xl text-gray-800">{props.result.result}</h1>

            {props.result.imageUrl && (
                <img
                    src={props.result.imageUrl}
                    alt={props.result.result}
                    draggable="false"
                    class="rounded-2xl w-full mx-auto shadow-md"
                />
            )}

            <button
                class="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
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
