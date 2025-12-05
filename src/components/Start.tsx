import type { Component, Setter } from "solid-js";

const Start: Component<{
    title: string;
    description?: string;
    imageUrl?: string;
    setQuestionIndex: Setter<number | null>;
}> = (props) => {
    return (
        <div class="flex flex-col items-center text-center p-6 max-w-3xl mx-auto space-y-6">
            <h1 class="text-4xl text-gray-800">{props.title}</h1>

            {props.imageUrl && (
                <img
                    src={props.imageUrl}
                    alt={props.title}
                    draggable="false"
                    class="rounded-2xl w-full mx-auto shadow-md"
                />
            )}

            {props.description && (
                <p class="text-lg text-gray-600 leading-relaxed">
                    {props.description}
                </p>
            )}

            <button
                class="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
                onClick={() => props.setQuestionIndex(0)}
            >
                Start
            </button>
        </div>
    );
};

export default Start;
