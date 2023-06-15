import {supabase} from '../supabaseClient';
import {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import UploadPicture from '../Components/UploadPicture';
import '../style/updateprofile.css';

export default function UpdateProfile() {
    const navigate = useNavigate();
    const location = useLocation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        setFirstName(location.state.firstName);
        setLastName(location.state.lastName);
        setProfilePic(location.state.profilePic);
        console.log('aksdhflkasjhdf',location.state.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateProfile = async e => {
        e.preventDefault();

        try {
            const updates = {
                first_name: firstName,
                last_name: lastName,
                avatar_url: profilePic,
            };

            const {error} = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', location.state.userId);

            if (error) {
                throw error;
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            navigate('/profile');
        }
    }

    return (
        <div id='update_profile'>
            <nav>
                <div id='firstDiv'>
                    <p id='logo' className='navbar-brand' onClick={() => {navigate('/publicRecipes')}}>COMFY COOKING</p>
                    <div id='secondDiv'>
                        <button className='btn' onClick={() => navigate('/publicRecipes')}>View Recipes</button>
                        <button className='btn' onClick={() => navigate('/createRecipe')}>Create Recipe</button>
                        <button className='btn' onClick={() => navigate('/profile')}>Profile</button>

                        <button id='logout' className='btn' onClick={() => {
                            supabase.auth.signOut();
                            navigate('/')
                        }}>
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
            <div id='update_prof_form'>
                <form onSubmit={updateProfile}>
                    <div id='update_prof_pic'>
                        <UploadPicture
                            url={profilePic}
                            size={250}
                            onUpload={(url) => {
                                setProfilePic(url)
                                // createRecipe({ user_id: session.user.id, title, description, ingredients, instructions, time, publicRecipe, image_url: url })
                            }}
                        />
                    </div>
                    <div id='update_first_last'>
                        <div id='update_first'>
                            <label htmlFor='firstName'>First Name</label>
                            <input
                                id='firstName'
                                type='text'
                                defaultValue={firstName}
                                onChange={e => setFirstName(e.target.value.trim())}
                            />
                        </div>
                        <br></br>
                        <div id='update_last'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input
                                id='lastName'
                                type='text'
                                defaultValue={lastName}
                                onChange={e => setLastName(e.target.value.trim())}
                            />
                        </div>
                    </div>
                    <button id='submit' className='btn' type='submit'>
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    )
}