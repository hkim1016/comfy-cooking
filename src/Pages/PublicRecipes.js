import {supabase} from '../supabaseClient';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function PublicRecipes({session}) {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const {data, error} = await supabase
                .from('recipes')
                .select();
            
            if (error) {
                throw error;
            }

            setPosts(data);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <button onClick={() => navigate('/profile')}>GO TO YOUR PROFILE</button>
            {
                posts.map(post => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.recipe}</p>
                    </div>
                ))
            }
        </div>
    )
}