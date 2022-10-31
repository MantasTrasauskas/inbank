import {
    Form,
    Label,
    Segment
} from "semantic-ui-react";

import { isPersonalNrValid, isLoanAmountValid, isLoanPeriodValid } from './FormValidationHandler'
import StyledButton from "../Buttons/Button";
import { useForm } from "react-hook-form";
import onSubmitHandler from "./OnSubmitHandler";
import React, { useState } from 'react';

const StyledForm = ({ buttonText, errMessage }) => {

    const [response, setResponse] = useState(false);
    const [error, setError] = useState(undefined);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        await onSubmitHandler(data)
            .then((response) => {
                setError(false)
                setResponse(response)
            })
            .catch((error) => {
                setResponse(false)
                setError(error)
            })
    }

    return (
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
                {errors.personalNumber && <Label basic color='red' pointing='below'>
                    {errMessage}
                </Label>}
                <input type="text" placeholder='Personal Number:'
                    {...register("personalNumber", { required: true, validate: (value) => isPersonalNrValid(value) })} />
            </Form.Field>
            <Form.Field>
                {errors.loanAmount && <Label basic color='red' pointing='below'>
                    {errMessage}
                </Label>}
                <input placeholder='Loan Amount:'
                    {...register("loanAmount", { required: true, validate: (value) => isLoanAmountValid(value) })} />
            </Form.Field>
            <Form.Field>
                {errors.loanPeriod && <Label basic color='red' pointing='below'>
                    {errMessage}
                </Label>}
                <input type='date' placeholder='Loan Period:'
                    {...register("loanPeriod", { required: true, validate: (value) => isLoanPeriodValid(value) })} />
            </Form.Field>

            {response ? (
                <Segment>
                    <Form.Field>Your loan amount is: {response.data.isSummedApproved ? 'Approved' : 'Rejected'}</Form.Field>
                    <Form.Field>Loan amount available to you with current parameters: {response.data.loanAmountAvailable}</Form.Field>
                    <Form.Field>Max loan Amount: {response.data.maxLoanAmount}</Form.Field>
                </Segment>
            ) : (<></>)}
            {error ? (
                <Segment>
                    <Form.Field>Error Code: {error.code}</Form.Field>
                    {error.message ? (<Form.Field>{error.message}</Form.Field>) : (error.response.data.errors.map(errorItem => {
                        return (
                            <Form.Field>{errorItem.msg}</Form.Field>
                        );
                    }))}
                </Segment>
            ) : (<></>)}


            <StyledButton buttonText={buttonText}></StyledButton>
        </Form>
    );
}

export default StyledForm;
