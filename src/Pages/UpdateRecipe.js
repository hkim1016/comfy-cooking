import {supabase} from '../supabaseClient';
import {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UpdateRecipe({session}) {
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState('')
    const [recipe, setRecipe] = useState('');

    useEffect(() => {
        setTitle(location.state.title);
        setRecipe(location.state.recipe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const updateRecipe = async e => {
        e.preventDefault();

        try {
            const updates = {
                title,
                recipe,
            };

            const {error} = await supabase
                .from('recipes')
                .update(updates)
                .eq('id', location.state.id);

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
            hello this is where you update recipes
            <form onSubmit={updateRecipe}>
                <label htmlFor='title'>Title</label>
                <input
                    id='title'
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value.trim())}
                />

                <label htmlFor='recipe'>Recipe</label>
                <input
                    id='recipe'
                    type='text'
                    value={recipe}
                    onChange={e => setRecipe(e.target.value.trim())}
                />
                <button>
                    Save
                </button>
            </form>
            <button onClick={() => {navigate('/profile')}}>
                Cancel
            </button>
        </div>
    )
}