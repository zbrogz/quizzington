import type { Component, JSX } from "solid-js";

const Button: Component<{
    onClick: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
    children: JSX.Element;
}> = (props) => {
    return (
        <button
            class={`bg-gray-600 hover:bg-gray-700 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 text-white font-semibold px-4 py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${
                props.fullWidth ? "w-full" : ""
            }`}
            onClick={props.onClick}
            onTouchStart={() => {}}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
