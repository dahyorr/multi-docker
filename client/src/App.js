import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
import logo from'./logo.svg';
import './App.css';
import OtherPage from './OtherPage';
import Fib from './Fib';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to react</h1>
        <Link to="/">Home</Link>
        <Link to="/otherPage">Other Page</Link>
      </header>
      <div>
        <Routes>
          <Route path='/' element={<Fib/>}/>
          <Route path='/otherpage' element={<OtherPage/>}/>
        </Routes>
      </div>
    </div>

    </BrowserRouter>
  );
}

export default App;
