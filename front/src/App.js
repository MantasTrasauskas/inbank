import './App.css';
import StyledForm from './components/Form/Form';
import PageLayout from './components/PageLayout/PageLayout';
import 'semantic-ui-css/semantic.min.css';


const App = () => {
  return (
    <div className="App">
      <PageLayout headerText="Decision Engine">
        <StyledForm placeholderText='Enter Personal Number' buttonText='Submit'></StyledForm>
      </PageLayout>
    </div>
  );
}

export default App;
