import { Button } from 'semantic-ui-react';



const StyledButton = ({ buttonText }) => {
    return (
        <Button color="teal" type="submit" fluid size="large">{buttonText}</Button>
    );
};


export default StyledButton;
