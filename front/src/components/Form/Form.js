import {
    Form,
    Label
} from "semantic-ui-react";
import axios from 'axios'
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

    const validateValue = (value) => {
        return [49002010965, 49002010976, 49002010987, 49002010998].includes(Number(value));
    }

    return (
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
                {errors.personalNumber && <Label basic color='red' pointing='below'>
                    {errMessage}
                </Label>}
                <input
                    {...register("personalNumber", { required: true, validate: (value) => validateValue(value) })} />
            </Form.Field>
            <StyledButton buttonText={buttonText}></StyledButton>
        </Form>
    );
}

export default StyledForm;
