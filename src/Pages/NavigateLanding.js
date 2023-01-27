import {useEffect, useState, React} from 'react';
import { supabase } from '../supabaseClient';
import Auth from './Auth';
import Profile from './Profile';

export default function NavigateLanding() {
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
        {!session ? <Auth /> : <Profile key={session.user.id} session={session} />}
      </div>
    )
}