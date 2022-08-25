
import '../../src/App.css';
import LoginPage from './LoginPage';
import AddQuestion from './AddQuestion';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import DisplayErrorPage from './DisplayErrorPage';
import { handleInitialData } from '../actions/shared';
import LeaderBoard from './LeaderBoard';
import QuestionDetail from './QuestionDetail';
import { LoadingBar } from 'react-redux-loading-bar';
import { useEffect } from 'react';
import Dashboard from './Dashboard';
import NavigationBar from './NavigationBar';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props])
  return (
    <div>
      <NavigationBar />
      <div className="main-container">
        {props.loading === true ? null : (
         <Routes>
            <Route path ="/" element={<Dashboard/>} />
            <Route path="*"  element={<DisplayErrorPage />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/add" element={<AddQuestion />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
          </Routes>
      )}
    </div>
    </div>
  )
}

const mapStatetoProps = ({ questions }) => ({
  loading: questions === null,
});

export default connect(mapStatetoProps)(App);


/*function App() {
  console.log("HereHi");
  return (
    <div className="App">
      <header className="App-header">
        This is Landing Login Page
      </header>
      <LoginPage />
    </div>
  );
}

export default App;
*/