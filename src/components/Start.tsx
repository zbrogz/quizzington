import type { Component, Setter } from "solid-js";
import Button from "./Button";

const Start: Component<{
    title: string;
    description?: string;
    imageUrl?: string;
    setQuestionIndex: Setter<number | null>;
}> = (props) => {
    return (
        <div class="flex flex-col items-center w-full h-dvh overflow-auto">
            <div class="flex flex-col items-center text-center p-6 space-y-6 fade-in max-w-3xl my-auto">
                <h1 class="text-3xl text-gray-700">{props.title}</h1>

                {props.imageUrl && (
                    <img
                        src={props.imageUrl}
                        alt={props.title}
                        draggable="false"
                        class="rounded-md w-full mx-auto shadow-md"
                    />
                )}

                {props.description && (
                    <p class="text-md text-gray-600 leading-relaxed">
                        {props.description}
                    </p>
                )}

                <Button fullWidth onClick={() => props.setQuestionIndex(0)}>
                    Start
                </Button>
            </div>
        </div>
    );
};

export default Start;
