import {BrowserRouter, Route, Routes} from 'react-router';
import './App.css';
import Home from './views/Home';
import Layout from './components/Layout';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/single" element={<Single />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
