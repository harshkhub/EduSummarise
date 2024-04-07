import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import CoursesPage from './components/Courses';
import NoteCreator from './components/Notes';
import Home from './components/Home'
import About from './components/About'

function App() {
  return (
    <>
    <Router>
        <Routes> {/* Use BrowserRouter as the root router */}
          <Route path='/' element={<Layout/>}>
          <Route path = "/" element={<Home/>}/>
          <Route path='/courses' element={<CoursesPage/>}>
            
          </Route>
          
          <Route path = "/about" element={<About/>}/>
          <Route path='/notes' element={<NoteCreator/>}>
            
          </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
