import {
    Form,
    Segment
} from "semantic-ui-react";
import StyledInput from "../Inputs/StyledInput";
import StyledButton from "../Buttons/Button";
import { useForm , useFormContext, FormProvider} from "react-hook-form";

const StyledForm = ({placeholderText, buttonText}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
            <Segment stacked>
                <StyledInput 
                    placeholderText={placeholderText}
                    {...register("firstName", { required: false, maxLength: 10 })}></StyledInput>
                    {errors.firstName && <p className="text-error">Please check the First Name</p>}
                <StyledButton buttonText={buttonText}></StyledButton>
            </Segment>
        </Form>
    );
}

export default StyledForm;
