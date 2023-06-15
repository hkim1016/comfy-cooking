import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState, useEffect, React} from 'react';
import {supabase} from './supabaseClient';
import './index.css'
// import './Pages/style/index.css'
// import './style/index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import NavigateLanding from './Pages/NavigateLanding';
import Landing from './Pages/Landing';
import Profile from './Pages/Profile';
import UpdateProfile from './Pages/UpdateProfile';
import PublicRecipes from './Pages/PublicRecipes';
import CreateRecipe from './Pages/CreateRecipe';
import UpdateRecipe from './Pages/UpdateRecipe';
import ViewRecipe from './Pages/ViewRecipe';
import ErrorPage from './Pages/ErrorPage';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    document.title = 'Comfy Cooking';

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

          <Route path='/updateProfile' element={<UpdateProfile />} />

          <Route path='/publicRecipes' element={<PublicRecipes />} />

          {!session ? <Route path='*' element={<ErrorPage />} /> : <Route path='/createRecipe' element={<CreateRecipe key={session.user.id} session={session}/>} />}

          {!session ? <Route path='*' element={<ErrorPage />} /> : <Route path='/updateRecipe' element={<UpdateRecipe key={session.user.id} session={session}/>} />}

          <Route path='/viewRecipe' element={<ViewRecipe />} />

          {/* <Route path='/createRecipe' element={<CreateRecipe key={session.user.id} session={session}/>} /> */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
