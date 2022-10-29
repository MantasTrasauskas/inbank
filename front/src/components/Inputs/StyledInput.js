import { Form } from 'semantic-ui-react';
import { useForm , useFormContext, FormProvider} from "react-hook-form";



const StyledInput = ({ placeholderText }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder={placeholderText}
        />
    );
};


export default StyledInput;
