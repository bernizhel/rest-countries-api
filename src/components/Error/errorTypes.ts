import {ErrorInfo, ReactChild, ReactNode} from "react";
import {SerializedError} from "@reduxjs/toolkit";

export type ErrorType = Error | SerializedError | null | undefined;

export interface IErrorBoundaryProps {
    children?: ReactChild | ReactNode;
}

export interface IErrorBoundaryState {
    error?: ErrorType;
    errorInfo?: ErrorInfo;
}

export interface IErrorComponentProps {
    children?: ReactChild | ReactNode;
    error: ErrorType;
    stack: string;
}

export interface IFormattedInfoProps {
    stack: string;
}