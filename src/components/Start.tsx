import type { Component, Setter } from "solid-js";
import Button from "./Button";

const Start: Component<{
    title: string;
    description?: string;
    imageUrl?: string;
    setQuestionIndex: Setter<number | null>;
}> = (props) => {
    return (
        <div class="flex flex-col items-center text-center p-6 mx-auto space-y-6 fade-in max-w-xl 2xl:max-w-2xl">
            <h1 class="text-4xl text-gray-800">{props.title}</h1>

            {props.imageUrl && (
                <img
                    src={props.imageUrl}
                    alt={props.title}
                    draggable="false"
                    class="rounded-2xl w-full mx-auto shadow-md max-w-2xl"
                />
            )}

            {props.description && (
                <p class="text-lg text-gray-600 leading-relaxed">
                    {props.description}
                </p>
            )}

            <Button fullWidth onClick={() => props.setQuestionIndex(0)}>
                Start
            </Button>
        </div>
    );
};

export default Start;
