import {
    Header,
} from "semantic-ui-react";

const StyledHeader = ({headerText}) => {
    return (
        <Header as="h2" color="teal" textAlign="center">
            {headerText}
        </Header>
    );
}

export default StyledHeader;
