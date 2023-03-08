import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import ViewPicture from '../Components/ViewPicture';

export default function ViewRecipe() {
    const location = useLocation();

    const [title, setTitle] = useState('')
    const [recipe, setRecipe] = useState('');
    const [image_url, setImageUrl] = useState(null)

    useEffect(() => {
        setTitle(location.state.title);
        setRecipe(location.state.recipe);
        setImageUrl(location.state.recipe_image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            view recipe
            <ViewPicture
                url={image_url}
                size={150}
            />
            <h2>{title}</h2>
            <p>{recipe}</p>
        </div>
    )
}