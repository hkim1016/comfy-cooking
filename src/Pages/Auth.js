import {useEffect, useState} from 'react';
import {supabase} from '../supabaseClient';
import { updateAuthPage } from '../updateAuthPage';

export default function Auth() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [signUpHidden, isSignUpHidden] = useState(true);

    useEffect(() => {
        updateAuthPage(signUpHidden);
    }, [signUpHidden])

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

    function updateHidden() {
        isSignUpHidden(!signUpHidden)
    }

    return (
        <div id='auth'>
            {/* <button id='home_btn' className='btn' onClick={() => {navigate('/')}}>Home</button> */}
            <div className='mb-3 signup'>
                <div id='signup_background_image'></div>
                <div id='signup_form'>
                    <p>COMFY COOKING</p>
                    <form onSubmit={handleSignup}>
                        <h3>Sign Up</h3>
                        <label htmlFor='signup_email' className='form-label'>Email</label>
                        <input
                            id='signup_email'
                            className='form-control'
                            type='email'
                            placeholder='Your Email'
                            onChange={e => setEmail(e.target.value.trim())}
                        />
                        <label htmlFor='signup_pass' className='password form-label'>Password</label>
                        <input
                            id='signup_pass'
                            className='form-control'
                            type='password'
                            placeholder='Your Password'
                            onChange={e => setPassword(e.target.value.trim())}
                        />
                        <button id='signup_submit' className='btn'>
                            Sign Up
                        </button>

                        <div className='or'>OR</div>
                        <button type='button' id='changeAuthForm' className='btn' onClick={() => {updateHidden()}}>
                            ALREADY HAVE AN ACCOUNT?
                        </button>
                    </form>
                </div>
            </div>
            <div className='mb-3 login position-absolute top-50 start-50 translate-middle'>
                <div id='login_background_image'></div>
                <div id='login_form'>
                    <p>COMFY COOKING</p>
                    <form onSubmit={handleLogin}>
                        <h3>Login</h3>
                        <label htmlFor='login_email' className='form-label'>Email</label>
                        <input
                            id='login_email'
                            className='form-control'
                            type='email'
                            placeholder='Your Email'
                            onChange={e => setEmail(e.target.value.trim())}
                        />
                        <label htmlFor='login_pass' className='password form-label '>Password</label>
                        <input
                            id='login_pass'
                            className='form-control'
                            type='password'
                            placeholder='Your Password'
                            onChange={e => setPassword(e.target.value.trim())}
                        />
                        <button id='login_submit' className='btn'>
                            Login
                        </button>

                        <div className='or'>OR</div>
                        {/* <a onclick="updateHidden()" href="javascript:void(0);"></a> */}
                        <button type='button' id='changeAuthForm' className='btn' onClick={() => {updateHidden()}}>
                            CREATE ACCOUNT
                        </button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}