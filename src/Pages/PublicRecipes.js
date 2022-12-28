import {supabase} from '../supabaseClient';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function PublicRecipes({session}) {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    // const [postsLikes, setPostsLikes] = useState([]);

    useEffect(() => {
        getPosts();
        // getLikes();

        // console.log(posts.sort((a, b) => b.id - a.id));
        // console.log(postsLikes.sort());
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

    // TODO: Create savePost() to save posts to user's save_post array
    // Create a new React page called saved posts that renders saved posts
    // Make sure it handles recipes being deleted

    // const getLikes = async () => {
    //     try {
    //         const {data, error} = await supabase
    //             .from('recipes_social')
    //             .select();

    //         if (error) {
    //             throw error;
    //         }

    //         setPostsLikes(data);
    //         // console.log(data);
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // }

    // const likePost = async post => {
    //     try {
    //         const updatedLikes = post.likes + 1;
    //         console.log(post.id, updatedLikes);

    //         const {data, error} = await supabase
    //             .from('recipes')
    //             .update({likes: updatedLikes})
    //             .eq('id', post.id)

    //         if(error) {
    //             throw error;
    //         }

    //         console.log('data', data);
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // }

    return (
        <div>
            <button onClick={() => navigate('/profile')}>GO TO YOUR PROFILE</button>
            {
                posts.map((post, index) => (
                    <div key={post.id}>
                        <h3>{post.title} {post.id}</h3>
                        <p>{post.recipe}</p>
                        {/* <p>Likes: {post.likes}</p>
                        <button onClick={() => {likePost(post)}}>
                            Like
                        </button> */}
                    </div>
                ))
            }
        </div>
    )
}