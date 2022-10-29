import PageLayoutWrapper from './PageLayoutWrapper'
import PageLayoutContainer from './PageLayoutContainer'
import PageLayoutContent from './PageLayoutContent'
import PropTypes from 'prop-types';
import Header from './Header';
const PageLayout = ({ children }) => {
    return (
            <PageLayoutContainer data-selector="page-layout-container">
                <Header data-selector="page-layout-header"/>
                    <PageLayoutContent
                        data-selector="page-layout-content"
                        role="main"
                        aria-live="polite"
                    >
                        {children}
                        <Foot
                    </PageLayoutContent>
            </PageLayoutContainer>
    );
};

PageLayout.propTypes = {
    children: PropTypes.node.isRequired,
    footerLinks: PropTypes.array
};

export default PageLayout;
