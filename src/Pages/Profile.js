import {supabase} from '../supabaseClient';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Profile({session}) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [posts, setPosts] = useState([]);

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

    const updateProfile = async e => {
        // e.preventDefault();

        try {
            const {user} = session;
            const updates = {
                updated_at: new Date(),
                first_name: firstName,
                last_name: lastName,
            };

            const {error} = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id)

            if (error) {
                throw error;
            }

            setFirstName('');
            setLastName('');
        } catch (error) {
            // alert(123);
            // console.log(error);
            alert(error.message);
        }
    }

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
        <div>
            <button onClick={() => navigate('/publicRecipes')}>GO TO RECIPES</button>
            <button onClick={() => navigate('/createRecipe')}>CREATE RECIPE</button>
            <div>Email: {session.user.email}</div>
            <div>Name: {firstName} {lastName}</div>

            <form onSubmit={updateProfile}>
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
            </form>

            {
                posts.map(post => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.recipe}</p>
                        <button onClick={() => {navigate('/updateRecipe', {state: post})}}>
                            Edit
                        </button>
                        <button onClick={() => {deletePost(post)}}>
                            Delete
                        </button>
                    </div>
                ))
            }

            <button onClick={() => {
                supabase.auth.signOut();
                navigate('/')
            }}>
                Sign out
            </button>
        </div>
    )
}