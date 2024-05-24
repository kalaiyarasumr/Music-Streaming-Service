import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Player from './pages/Home'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Player />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
