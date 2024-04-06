import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Routes> {/* Use BrowserRouter as the root router */}
        <Route path='/' element={<Layout/>}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
