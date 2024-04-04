import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './assets/components/template/signup';
import SignIn from './assets/components/template/signin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App

