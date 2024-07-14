/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TopicPostCreateFormInputValues = {
    userId?: string;
    content?: string;
    to?: string;
};
export declare type TopicPostCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
    to?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TopicPostCreateFormOverridesProps = {
    TopicPostCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    to?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TopicPostCreateFormProps = React.PropsWithChildren<{
    overrides?: TopicPostCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TopicPostCreateFormInputValues) => TopicPostCreateFormInputValues;
    onSuccess?: (fields: TopicPostCreateFormInputValues) => void;
    onError?: (fields: TopicPostCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TopicPostCreateFormInputValues) => TopicPostCreateFormInputValues;
    onValidate?: TopicPostCreateFormValidationValues;
} & React.CSSProperties>;
export default function TopicPostCreateForm(props: TopicPostCreateFormProps): React.ReactElement;
