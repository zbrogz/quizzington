import type { Component, Accessor, Setter } from "solid-js";
import type { AnswerType } from "../types/quiz";
import { For } from "solid-js";
import Button from "./Button";

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
        <div>
            <div
                class="flex-1 w-full overflow-auto flex flex-col items-stretch space-y-6 p-6 pt-8 fade-in max-w-xl 2xl:max-w-2xl mx-auto"
                style={{ height: "calc(100dvh - 81px)" }}
            >
                <div class="text-center">
                    <p class="text-gray-700">
                        Question {props.questionIndex + 1} of{" "}
                        {props.questionCount}
                    </p>
                    <h1 class="text-4xl text-gray-700 shrink-0">
                        {props.question}
                    </h1>
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
                    class="grid grid-cols-2 auto-rows-fr gap-4"
                    classList={{
                        "md:grid-cols-3":
                            props.answers.length > 4 ||
                            props.answers.length === 3,
                    }}
                >
                    <For each={props.answers}>
                        {(answer, idx) => {
                            // TODO: add answers component
                            const isSelected = () =>
                                selectedAnswerIndex() === idx();
                            return (
                                <label
                                    tabIndex={0}
                                    class={`min-h-24 cursor-pointer border rounded-lg p-2 sm:p-3 2xl:p-4 flex flex-col items-center justify-between text-center transition select-none h-full fade-in
                                    ${
                                        isSelected()
                                            ? "border-gray-500 bg-gray-200"
                                            : "bg-gray-100 border-gray-300 hover:bg-gray-200 active:bg-gray-300"
                                    }
                                `}
                                    style={
                                        isSelected()
                                            ? {
                                                  "box-shadow":
                                                      "inset 0 0 0 2px var(--color-gray-500)",
                                              }
                                            : undefined
                                    }
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                        ) {
                                            e.preventDefault();
                                            handleAnswerSelect(idx());
                                        }
                                    }}
                                    onClick={() => {
                                        handleAnswerSelect(idx());
                                    }}
                                    onTouchStart={() => {}}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${props.questionIndex}`}
                                        value={idx()}
                                        class="hidden"
                                        checked={isSelected()}
                                        onChange={() =>
                                            handleAnswerSelect(idx())
                                        }
                                    />
                                    {answer.imageUrl && (
                                        <div class="aspect-square w-full mb-2 rounded pointer-events-none shrink-0 overflow-hidden">
                                            <img
                                                src={answer.imageUrl}
                                                alt={answer.answer}
                                                draggable="false"
                                                class="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <span class="text-gray-700 font-medium shrink my-auto">
                                        {answer.answer}
                                    </span>
                                </label>
                            );
                        }}
                    </For>
                </div>
            </div>
            <div class="flex justify-center gap-4 shrink-0 fixed bottom-0 left-0 right-0 p-4 bg-white/95 border-t border-gray-200">
                <Button fullWidth onClick={handlePreviousQuestion}>
                    {props.questionIndex === 0 ? "Back to Start" : "Previous"}
                </Button>
                <Button
                    fullWidth
                    onClick={handleNextQuestion}
                    disabled={selectedAnswerIndex() === undefined}
                >
                    {props.questionIndex === props.questionCount - 1
                        ? "See Result"
                        : "Next"}
                </Button>
            </div>
        </div>
    );
};

export default Question;
