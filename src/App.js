import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {supabase} from './supabaseClient';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import NavigateLanding from './Pages/NavigateLanding';
import Landing from './Pages/Landing';
import Profile from './Pages/Profile';
import PublicRecipes from './Pages/PublicRecipes';
import CreateRecipe from './Pages/CreateRecipe';
import ErrorPage from './Pages/ErrorPage';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    })

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      // console.log('auth change occured', !session, event);
    })
  }, []);

  return (
    <div> 
      <Router>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/auth' element={<NavigateLanding />}/>
          {/* <Route path='/profile' element={<Profile />} /> */}

          {!session ? <Route path='*' element={<ErrorPage />} /> : <Route path='/profile' element={<Profile key={session.user.id} session={session}/>} />}

          <Route path='/publicRecipes' element={<PublicRecipes />} />

          {!session ? <Route path='*' element={<ErrorPage />} /> : <Route path='/createRecipe' element={<CreateRecipe key={session.user.id} session={session}/>} />}

          {/* <Route path='/createRecipe' element={<CreateRecipe key={session.user.id} session={session}/>} /> */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
