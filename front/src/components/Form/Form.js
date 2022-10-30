import {
    Form,
    Label
} from "semantic-ui-react";
import axios from 'axios'
import { isPersonalNrValid, isLoanAmountValid, isLoanPeriodValid } from './formValidationHandler'
import StyledButton from "../Buttons/Button";
import { useForm } from "react-hook-form";

const StyledForm = ({ buttonText, errMessage }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        await axios.post('http://localhost:4000/decision', data)
            .catch((error) => {
                console.log(error)
            })
            .then((response) => {

            });
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
            <StyledButton buttonText={buttonText}></StyledButton>
        </Form>
    );
}

export default StyledForm;
