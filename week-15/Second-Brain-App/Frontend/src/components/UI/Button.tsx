
import type { ReactNode } from "react";

interface ButtonProps {
    text?: string;
    title?: string;
    size?: "lg" | "sm" | "md";
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    variant?: "primary" | "secondary" | "danger" | "quiet";
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit";
}

const sizeStyles = {
    lg: "button-large",
    md: "button-medium",
    sm: "button-small",
};

const variantStyles = {
    primary: "button-primary",
    secondary: "button-secondary",
    danger: "button-danger",
    quiet: "button-quiet",
};

export function Button(props: ButtonProps) {
    const label = props.text ?? props.title ?? "";
    return (
        <button
            type={props.type ?? "button"}
            onClick={props.onClick}
            disabled={props.disabled || props.loading}
            className={`button ${sizeStyles[props.size ?? "md"]} ${variantStyles[props.variant ?? "primary"]} ${props.fullWidth ? "button-full" : ""}`}
        >
            <span className="button-content">
                {props.startIcon && (
                    <span className="button-icon">
                        {props.startIcon}
                    </span>
                )}

                <span>{props.loading ? "Please wait..." : label}</span>

                {props.endIcon && (
                    <span className="button-icon">
                        {props.endIcon}
                    </span>
                )}
            </span>
        </button>
    );
}
