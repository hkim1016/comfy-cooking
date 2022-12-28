import {useNavigate} from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div id='landing'>
            <button id='to_auth' className='btn btn-large top-0 end-0' onClick={() => {navigate('/auth')}}>LOGIN</button>
            <div className='position-absolute top-50 start-50 translate-middle'>
                <h1 id='landing_title'>COMFY COOKING</h1>
            </div>
        </div>
    )
}