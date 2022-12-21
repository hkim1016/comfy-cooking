import {useState} from 'react';
import {supabase} from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    async function handleSignup(e) {
        e.preventDefault();

        try {
            const {error} = await supabase.auth.signUp({email, password});
            if (error) {
                throw error;
            }
            alert('Please confirm your email');
        } catch (error) {
            alert(error.message || error.error.description);
        }
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const {error} = await supabase.auth.signInWithPassword({email, password});
            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message || error.error_description);
        }
    }

    return (
        <div>
            <button onClick={() => navigate('/')}>Home</button>
            <div className='mb-3'>
                <form onSubmit={handleSignup}>
                    <label htmlFor='signup_email' className='form-label'>Email</label>
                    <input
                        id='signup_email'
                        className='form-control'
                        type='email'
                        placeholder='Your Email'
                        onChange={e => setEmail(e.target.value.trim())}
                    />
                    <label htmlFor='signup_pass' className='form-label'>Password</label>
                    <input
                        id='signup_pass'
                        className='form-control'
                        type='password'
                        placeholder='Your Password'
                        onChange={e => setPassword(e.target.value.trim())}
                    />
                    <button>
                        Sign Up
                    </button>
                </form>
            </div>
            <div className='mb-3'>
                <form onSubmit={handleLogin}>
                    <label htmlFor='login_email' className='form-label'>Email</label>
                    <input
                        id='login_email'
                        className='form-control'
                        type='email'
                        placeholder='Your Email'
                        onChange={e => setEmail(e.target.value.trim())}
                    />
                    <label htmlFor='login_pass' className='form-label'>Password</label>
                    <input
                        id='login_pass'
                        className='form-control'
                        type='password'
                        placeholder='Your Password'
                        onChange={e => setPassword(e.target.value.trim())}
                    />
                    <button>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}