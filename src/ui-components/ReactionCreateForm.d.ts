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
export declare type ReactionCreateFormInputValues = {
    userId?: string;
    postId?: string;
};
export declare type ReactionCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    postId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReactionCreateFormOverridesProps = {
    ReactionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    postId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReactionCreateFormProps = React.PropsWithChildren<{
    overrides?: ReactionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReactionCreateFormInputValues) => ReactionCreateFormInputValues;
    onSuccess?: (fields: ReactionCreateFormInputValues) => void;
    onError?: (fields: ReactionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReactionCreateFormInputValues) => ReactionCreateFormInputValues;
    onValidate?: ReactionCreateFormValidationValues;
} & React.CSSProperties>;
export default function ReactionCreateForm(props: ReactionCreateFormProps): React.ReactElement;
