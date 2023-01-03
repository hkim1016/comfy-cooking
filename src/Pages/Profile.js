import {supabase} from '../supabaseClient';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Profile({session}) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [posts, setPosts] = useState([]);
    const [profilePic, setProfilePic] = useState('https://i.postimg.cc/Wzx40rMT/blank-avatar.png');

    useEffect(() => {
        const getPosts = async () => {
            try {
                const {user} = session;
    
                const {data, error} = await supabase
                    .from('recipes')
                    .select()
                    .eq('user_id', user.id);
                
                if (error) {
                    throw error;
                }
    
                setPosts(data);
            } catch (error) {
                // alert(123);
                alert(error.message);
            }
        }

        getProfile();
        getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    const getProfile = async () => {
        try {
            const {user} = session;
            const {data, error} = await supabase
                .from('profiles')
                .select(`first_name, last_name`)
                .eq('id', user.id)
                .single();
            
            if (error) {
                throw error;
            }

            setFirstName(data.first_name);
            setLastName(data.last_name);
        } catch (error) {
            alert(error.message);
            // alert(123);
        }
    }

    // const updateProfile = async e => {
    //     // e.preventDefault();

    //     try {
    //         const {user} = session;
    //         const updates = {
    //             updated_at: new Date(),
    //             first_name: firstName,
    //             last_name: lastName,
    //         };

    //         const {error} = await supabase
    //             .from('profiles')
    //             .update(updates)
    //             .eq('id', user.id)

    //         if (error) {
    //             throw error;
    //         }

    //         setFirstName('');
    //         setLastName('');
    //     } catch (error) {
    //         // alert(123);
    //         // console.log(error);
    //         alert(error.message);
    //     }
    // }

    const deletePost = async (post, e) => {
        // e.preventDefault();

        try {
            // const {user} = session;
            console.log('hello', post);

            const {error} = await supabase
                .from('recipes')
                .delete()
                // .eq('user_id', user.id) 
                .eq('id', post.id)
            
            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
            // console.log(error);
        } finally {
            window.location.reload();
        }
    }

    return (
        <div id='profile'>
            <nav>
                <div>
                <button className='btn' onClick={() => navigate('/publicRecipes')}>GO TO RECIPES</button>
                <button className='btn' onClick={() => navigate('/createRecipe')}>CREATE RECIPE</button>

                <button id='logout' className='btn' onClick={() => {
                    supabase.auth.signOut();
                    navigate('/')
                }}>
                    Log Out
                </button>
                </div>
            </nav>
            <div id='main_section'>
                <div id='user_info'>
                    <div id='profile_picture'>
                        <img src={profilePic} alt='profile' />
                    </div>
                    <div id='profile_info'>
                        <p>Email: {session.user.email}</p>
                        <p>Name: {firstName} {lastName}</p>
                        <button id='edit_profile' onClick={() => {navigate('/updateProfile')}}>Edit Profile</button>
                    </div>

                    {/* <form onSubmit={updateProfile}>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            id='firstName'
                            type='text'
                            placeholder='First Name'
                            onChange={e => setFirstName(e.target.value.trim())}
                        />
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            id='lastName'
                            type='text'
                            placeholder='Last Name'
                            onChange={e => setLastName(e.target.value.trim())}
                        />
                        <button>
                            Update Profile
                        </button>
                    </form> */}
                </div>
                <div id='hr'><hr></hr></div>
                <div id='user_recipes'>
                    {
                        posts.map(post => (
                            <div id='post' key={post.id}>
                                <div id='recipe_image'></div>
                                <div id='recipe_content'>
                                    <h3>{post.title}</h3>
                                    {/* <p>{post.recipe}</p> */}
                                    <div id='post_btn'>
                                        <button id='view' className='btn' onClick={() => {navigate('/viewRecipe', {state: post})}}>
                                            View
                                        </button>
                                        <button id='edit' className='btn' onClick={() => {navigate('/updateRecipe', {state: post})}}>
                                            Edit
                                        </button>
                                        <button id='delete' className='btn' onClick={() => {deletePost(post)}}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}