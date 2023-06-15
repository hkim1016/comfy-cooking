import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {supabase} from '../supabaseClient';
import ViewPicture from '../Components/ViewPicture';
import '../style/viewrecipe.css';

export default function ViewRecipe() {
    const location = useLocation();
    const navigate = useNavigate();

    let step = 1;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [servings, setServings] = useState(location.state.servings);
    const [time, setTime] = useState([]);
    const [image_url, setImageUrl] = useState(null);

    useEffect(() => {
        setTitle(location.state.title);
        setDescription(location.state.description);
        setIngredients(location.state.ingredients);
        setInstructions(location.state.instructions);
        setServings(location.state.servings);
        setTime(location.state.time);
        setImageUrl(location.state.recipe_image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id='view_recipe'>
            <nav>
                <div id='firstDiv'>
                    <p id='logo' className='navbar-brand' onClick={() => {navigate('/publicRecipes')}}>COMFY COOKING</p>
                    <div id='secondDiv'>
                        <button className='btn' onClick={() => navigate('/publicRecipes')}>View Recipes</button>
                        {/* <button className='btn' onClick={() => navigate('/createRecipe')}>Create Recipe</button> */}
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
            <div id='view_grid'>
                <div id='pic_title_desc'>
                    <div id='view_picture'>
                        <ViewPicture
                            url={image_url}
                            size={500}
                        />
                    </div>

                    <div id='view_title_desc'>
                        <h2>{title}</h2>
                        <h4>{description}</h4>
                    </div>
                </div>
                <div id='rec_content'>
                    <h4 id='view_servings'><span style={{fontWeight: 'bold'}}>Servings:</span> {servings} | <span style={{fontWeight: 'bold'}}>Time:</span> {time[0]} Days, {time[1]} Hours, {time[2]} Minutes</h4>

                    <div id='view_ingred_instruct'>
                        <div id='view_ingred'>
                            <h3>Ingredients</h3>
                            <ul>
                            {
                                ingredients.map((ingred, index) => (
                                    <li>{ingred}</li>
                                ))
                            }
                            </ul>
                        </div>

                        <div id='view_instruct'>
                            <h3>Instructions</h3>
                            {
                                instructions.map((instruct, index) => (
                                    <div>
                                        <p className='instruct_step' style={{fontWeight: 'bold'}}>Step {step++}</p>
                                        <p>{instruct}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}