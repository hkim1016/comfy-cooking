import {supabase} from '../supabaseClient';
import {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UploadPicture from '../Components/UploadPicture';

export default function UpdateRecipe({session}) {
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState('')
    const [recipe, setRecipe] = useState('');
    const [image_url, setImageUrl] = useState(null)

    useEffect(() => {
        setTitle(location.state.title);
        setRecipe(location.state.recipe);
        setImageUrl(location.state.recipe_image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const updateRecipe = async e => {
        e.preventDefault();

        try {
            const updates = {
                title,
                recipe,
                recipe_image: image_url,
            };

            const {error} = await supabase
                .from('recipes')
                .update(updates)
                .eq('id', location.state.id);

            if (error) {
                throw error;
            }

            console.log(123123123, image_url);
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
                <UploadPicture
                    url={image_url}
                    size={150}
                    onUpload={(url) => {
                        setImageUrl(url)
                        updateRecipe({ title, recipe, image_url: url })
                    }}
                />

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