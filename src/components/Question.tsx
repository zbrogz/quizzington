import type { Component, Accessor, Setter } from "solid-js";
import type { AnswerType } from "../types/quiz";

const Question: Component<{
    question: string;
    imageUrl: string;
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
    };

    const handleNextQuestion = () => {
        props.setQuestionIndex(props.questionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        const newIndex = props.questionIndex - 1;
        props.setQuestionIndex(newIndex < 0 ? null : newIndex);
    };

    return (
        <div class="question-screen">
            <h2>
                Question {props.questionIndex + 1} of {props.questionCount}
            </h2>
            <p>{props.question}</p>

            {props.imageUrl && (
                <img
                    src={props.imageUrl}
                    alt={`Question ${props.questionIndex + 1}`}
                    class="question-image"
                />
            )}

            <ul class="answers-list">
                {props.answers.map((answer, idx) => (
                    <li
                        class={
                            selectedAnswerIndex() === idx
                                ? "answer selected"
                                : "answer"
                        }
                        onClick={() => handleAnswerSelect(idx)} // TODO: Switch to radio buttons?
                    >
                        {answer.answer}
                        {answer.imageUrl && (
                            <img src={answer.imageUrl} class="answer-image" />
                        )}
                    </li>
                ))}
            </ul>

            <div class="navigation-buttons">
                <button onClick={handlePreviousQuestion}>
                    {props.questionIndex === 0 ? "Back to Start" : "Previous"}
                </button>
                <button
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
