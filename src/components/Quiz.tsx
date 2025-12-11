import { createSignal, Switch, Match, type Component } from "solid-js";
import type { QuizType } from "../types/quiz";
import Start from "./Start";
import Result from "./Result";
import Question from "./Question";

const Quiz: Component<{ quiz: QuizType }> = (props) => {
    const [questionIndex, setQuestionIndex] = createSignal<number | null>(null);
    const [selectedAnswers, setSelectedAnswers] = createSignal<
        Record<number, number>
    >({});

    const currentQuestion = () => {
        const index = questionIndex();
        return index !== null ? props.quiz.questions[index] : undefined;
    };

    const resultIndex = () => {
        const answers = selectedAnswers();
        const tagCounts: Record<string, number> = {};
        for (const [qIndex, aIndex] of Object.entries(answers)) {
            const question = props.quiz.questions[Number(qIndex)];
            const answer = question.answers[aIndex];
            for (const tag of answer.tags) {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            }
        }

        let maxCount = 0;
        let maxTag = "";
        for (const [tag, count] of Object.entries(tagCounts)) {
            if (count > maxCount) {
                maxCount = count;
                maxTag = tag;
            }
        }

        for (const [index, result] of props.quiz.results.entries()) {
            if (result.tags.includes(maxTag)) {
                return index;
            }
        }
        return 0;
    };

    return (
        <Switch>
            <Match when={questionIndex() === null}>
                <Start
                    title={props.quiz.title}
                    description={props.quiz.description}
                    imageUrl={props.quiz.imageUrl}
                    setQuestionIndex={setQuestionIndex}
                />
            </Match>
            <Match when={questionIndex()! < props.quiz.questions.length}>
                {/* TODO: Add questions component that has a For/Show component for each question to make css transitions easier, etc */}
                <Question
                    question={currentQuestion()!.question}
                    imageUrl={currentQuestion()!.imageUrl}
                    answers={currentQuestion()!.answers}
                    questionCount={props.quiz.questions.length}
                    questionIndex={questionIndex() as number}
                    setQuestionIndex={setQuestionIndex}
                    selectedAnswers={selectedAnswers}
                    setSelectedAnswers={setSelectedAnswers}
                />
            </Match>
            <Match when={questionIndex()! >= props.quiz.questions.length}>
                <Result
                    result={props.quiz.results[resultIndex()]}
                    questionIndex={questionIndex() as number}
                    setQuestionIndex={setQuestionIndex}
                    setSelectedAnswers={setSelectedAnswers}
                />
            </Match>
        </Switch>
    );
};

export default Quiz;
