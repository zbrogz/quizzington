import type { Component, Accessor, Setter } from "solid-js";
import type { AnswerType } from "../types/quiz";
import { For } from "solid-js";

const Question: Component<{
    question: string;
    imageUrl?: string;
    answers: AnswerType[];
    questionCount: number;
    questionIndex: number;
    setQuestionIndex: Setter<number | null>;
    selectedAnswers: Accessor<Record<number, number>>;
    setSelectedAnswers: Setter<Record<number, number>>;
}> = (props) => {
    const selectedAnswerIndex = () =>
        props.selectedAnswers()[props.questionIndex];

    const handleAnswerSelect = (answerIndex: number) => {
        props.setSelectedAnswers((prev) => ({
            ...prev,
            [props.questionIndex]: answerIndex,
        }));
        handleNextQuestion();
    };

    const handleNextQuestion = () => {
        props.setQuestionIndex(props.questionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        const newIndex = props.questionIndex - 1;
        props.setQuestionIndex(newIndex < 0 ? null : newIndex);
    };

    return (
        <div class="max-w-3xl mx-auto p-6 space-y-6">
            <div class="text-center">
                <p class="text-gray-700">
                    Question {props.questionIndex + 1} of {props.questionCount}
                </p>
                <h1 class="text-4xl text-gray-800">{props.question}</h1>
                {props.imageUrl && (
                    <img
                        src={props.imageUrl}
                        alt={`Question ${props.questionIndex + 1}`}
                        draggable="false"
                        class="mx-auto mt-4 max-h-64 object-contain rounded shadow"
                    />
                )}
            </div>

            <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-4"
                classList={{
                    "md:grid-cols-3":
                        props.answers.length > 4 || props.answers.length === 3,
                }}
            >
                <For each={props.answers}>
                    {(answer, idx) => {
                        const isSelected = () =>
                            selectedAnswerIndex() === idx();
                        return (
                            <label
                                tabIndex={0}
                                class={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center text-center transition box-border
                                    ${
                                        isSelected()
                                            ? "border-gray-500 bg-gray-200 border-3"
                                            : "bg-gray-100 border-gray-300 hover:bg-gray-200 active:bg-gray-300"
                                    }
                                `}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleAnswerSelect(idx());
                                    }
                                }}
                            >
                                <input
                                    type="radio"
                                    name={`question-${props.questionIndex}`}
                                    value={idx()}
                                    class="hidden"
                                    checked={isSelected()}
                                    onChange={() => handleAnswerSelect(idx())}
                                />
                                {answer.imageUrl && (
                                    <img
                                        src={answer.imageUrl}
                                        alt={answer.answer}
                                        draggable="false"
                                        class="w-64 h-64 object-cover mb-2 rounded"
                                    />
                                )}
                                <span class="text-gray-800 font-medium">
                                    {answer.answer}
                                </span>
                            </label>
                        );
                    }}
                </For>
            </div>

            <div class="flex justify-between mt-6">
                <button
                    class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePreviousQuestion}
                >
                    {props.questionIndex === 0 ? "Back to Start" : "Previous"}
                </button>
                <button
                    class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNextQuestion}
                    disabled={selectedAnswerIndex() === undefined}
                >
                    {props.questionIndex === props.questionCount - 1
                        ? "See Result"
                        : "Next"}
                </button>
            </div>
        </div>
    );
};

export default Question;
