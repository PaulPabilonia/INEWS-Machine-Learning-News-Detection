import logo from './assets/images/logo.svg';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import WithNav from './WithNav';
import WithoutNav from './WithoutNav';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Community from './pages/Community';
import About from './pages/About';
import NewsFeed from './pages/NewsFeed';
import HowItWorks from './pages/HowItWorks';
import Prediction from './pages/Prediction';
import Page404 from './pages/Page404';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Settings from './pages/Settings';



function App() {
  return (
    <>
      <Routes>
        
        <Route element = {<WithoutNav />}>
          <Route exact path='/' element={<LandingPage />}></Route>
          <Route path='*' element={<Page404 />}></Route>
          <Route path='/SignIn' element = {<SignIn />}></Route>
          <Route path='/SignUp' element = {<SignUp />}></Route>
        </Route>

        <Route element = {<WithNav />}>
          <Route path='/Home'>
            <Route index element={<Home />}></Route>
            <Route path='Prediction/:id' element={<Prediction />}></Route>
          </Route>
          <Route path='/Community' element={<Community />}></Route>
          <Route path='/About' element={<About />}></Route>
          <Route path='/NewsFeed' element={<NewsFeed />}></Route>
          <Route path='/HowItWorks' element={<HowItWorks />}></Route>
          <Route path='/Profile' element={<Profile />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;
