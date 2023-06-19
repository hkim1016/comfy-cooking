import {useEffect, useState, React} from 'react';
import {supabase} from '../supabaseClient';
import {updateAuthPage} from '../scripts/updateAuthPage';
import '../style/auth.css';

export default function Auth() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [signUpHidden, isSignUpHidden] = useState(true);

    useEffect(() => {
        updateAuthPage(signUpHidden);
    }, [signUpHidden, password])

    useEffect(() => {
        window.onload = () => {
            const myInput = document.getElementById("signup_pass");
            const letter = document.getElementById("letter");
            const capital = document.getElementById("capital");
            const number = document.getElementById("number");
            const length = document.getElementById("length");

            myInput.onfocus = function() {
                document.getElementById("message").style.display = "block";
            }
            
            myInput.onblur = function() {
                document.getElementById("message").style.display = "none";
            }

            myInput.onkeyup = () => {
                // Validate lowercase letters
                const lowerCaseLetters = /[a-z]/g;
                if(myInput.value.match(lowerCaseLetters)) {  
                    console.log('lowercase')
                    letter.classList.remove("invalid");
                    letter.classList.add("valid");
                } else {
                    letter.classList.remove("valid");
                    letter.classList.add("invalid");
                }
                
                // Validate capital letters
                const upperCaseLetters = /[A-Z]/g;
                if(myInput.value.match(upperCaseLetters)) {  
                    capital.classList.remove("invalid");
                    capital.classList.add("valid");
                } else {
                    capital.classList.remove("valid");
                    capital.classList.add("invalid");
                }
              
                // Validate numbers
                const numbers = /[0-9]/g;
                if(myInput.value.match(numbers)) {  
                    number.classList.remove("invalid");
                    number.classList.add("valid");
                } else {
                    number.classList.remove("valid");
                    number.classList.add("invalid");
                }
                
                // Validate length
                if(myInput.value.length >= 8) {
                    length.classList.remove("invalid");
                    length.classList.add("valid");
                } else {
                    length.classList.remove("valid");
                    length.classList.add("invalid");
                }
            }
        }
    })

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
        isSignUpHidden(!signUpHidden);
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
                            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                            onInvalid={e => e.target.setCustomValidity('1 Uppercase, 1 Lowercase, 1 Number, 8 Min Characters')} 
                            onInput={e => e.target.setCustomValidity('')} 
                        />

                        <div id="message">
                            <h3>Password must contain the following:</h3>
                            <p id="letter" className="invalid">A <b>lowercase</b> letter</p>
                            <p id="capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
                            <p id="number" className="invalid">A <b>number</b></p>
                            <p id="length" className="invalid">Minimum <b>8 characters</b></p>
                        </div>

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