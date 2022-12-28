import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabaseClient';

export default function CreateRecipe({session}) {
    // const [session, setSession] = useState(null);
    const [title, setTitle] = useState('');
    const [recipe, setRecipe] = useState('');

    const navigate = useNavigate();

    const createRecipe = async () => {

        try {
            const newRecipe = {
                user_id: session.user.id,
                title,
                recipe,
            };

            const {error} = await supabase
                .from('recipes')
                .insert([newRecipe]);

            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        } finally {
            navigate('/profile');
        }
    }

    return (
        <div>
            <button onClick={() => navigate('/profile')}>GO TO YOUR PROFILE</button>
            create recipe page
            <form onSubmit={() => {createRecipe(); navigate('/profile')}}>
                <label htmlFor='title'>Title</label>
                <input
                    id='title'
                    type='text'
                    placeholder='Your Recipe Title'
                    value={title}
                    onChange={e => setTitle(e.target.value.trim())}
                />
                <label htmlFor='recipe'>Recipe</label>
                <input
                    id='recipe'
                    type='text'
                    placeholder='Your Recipe'
                    value={recipe}
                    onChange={e => setRecipe(e.target.value.trim())}
                />
                <button type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}