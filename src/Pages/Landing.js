import {useNavigate} from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div>
            COMFY COOKING
            <button onClick={() => {navigate('/auth')}}>LOGIN OR SIGNUP</button>
        </div>
    )
}