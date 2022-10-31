import StyledHeader from './Header';

import { Grid } from "semantic-ui-react";
const PageLayout = ({ children, headerText }) => {
    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <StyledHeader headerText={headerText} />
                {children}
            </Grid.Column>
        </Grid>
    );
};

export default PageLayout;
