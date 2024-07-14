/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { TopicPost } from "../API.ts";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TopicPostUpdateFormInputValues = {
    userId?: string;
    content?: string;
    to?: string;
};
export declare type TopicPostUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
    to?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TopicPostUpdateFormOverridesProps = {
    TopicPostUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    to?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TopicPostUpdateFormProps = React.PropsWithChildren<{
    overrides?: TopicPostUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    topicPost?: TopicPost;
    onSubmit?: (fields: TopicPostUpdateFormInputValues) => TopicPostUpdateFormInputValues;
    onSuccess?: (fields: TopicPostUpdateFormInputValues) => void;
    onError?: (fields: TopicPostUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TopicPostUpdateFormInputValues) => TopicPostUpdateFormInputValues;
    onValidate?: TopicPostUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TopicPostUpdateForm(props: TopicPostUpdateFormProps): React.ReactElement;
