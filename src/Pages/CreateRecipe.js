import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabaseClient';
import UploadPicture from '../Components/UploadPicture';

export default function CreateRecipe({session}) {
    // const [session, setSession] = useState(null);
    const [title, setTitle] = useState('');
    const [recipe, setRecipe] = useState('');
    const [image_url, setImageUrl] = useState(null);

    const navigate = useNavigate();

    const createRecipe = async () => {

        try {
            const newRecipe = {
                user_id: session.user.id,
                title,
                recipe,
                recipe_image: image_url,
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
        <div id='create_recipe'>
            <nav>
                <div id='firstDiv'>
                    <p id='logo' className='navbar-brand' onClick={() => {navigate('/publicRecipes')}}>COMFY COOKING</p>
                    <div id='secondDiv'>
                        <button className='btn' onClick={() => navigate('/publicRecipes')}>View Recipes</button>
                        <button className='btn' onClick={() => navigate('/createRecipe')}>Create Recipe</button>

                        <button id='logout' className='btn' onClick={() => {
                            supabase.auth.signOut();
                            navigate('/')
                        }}>
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
            <div id='input_recipe'>
                <form onSubmit={() => {createRecipe(); navigate('/profile')}}>
                    <h2>Add Your Recipe!</h2>
                    <hr></hr>
                    <div class='pic_title_desc'>
                        <div id='new_rec_pic'>
                            <p>Upload a Photo <br></br> (Optional)</p>
                            <UploadPicture
                                url={image_url}
                                size={150}
                                onUpload={(url) => {
                                    setImageUrl(url)
                                    createRecipe({ user_id: session.user.id, title, recipe, image_url: url })
                                }}
                            />
                        </div>

                        <div class='title_desc'>
                            <label htmlFor='title'>Title</label>
                            <input
                                id='title'
                                type='text'
                                placeholder='Your Recipe Title'
                                value={title}
                                onChange={e => setTitle(e.target.value.trim())}
                                required
                            />
                            <label htmlFor='decription'>Description (Optional)</label>
                            <textarea id='description' placeholder='Your Recipe Description'></textarea>
                        </div>
                    </div>

                    <hr></hr>

                    <div class='ingredients'>
                        <p>Ingredients</p>
                        <div>
                            <input
                                class='ingredient'
                                type='text'
                                placeholder='i.e. 2 tbsp of lemon juice'
                                required
                            />
                            {/* <button>x</button> */}
                        </div>
                        <button id='add_ingred'>Add Ingredient</button>
                    </div>

                    <hr></hr>

                    <div class='directions'>
                        <p>Directions</p>
                        <div>
                            <textarea id='directions' placeholder='i.e. Preheat oven to 275 degrees F'></textarea>
                            {/* <button>x</button> */}
                        </div>
                        <button id='add_instruc'>Add Instruction</button>
                    </div>

                    <hr></hr>

                    <div class='serving_time'>
                        <div class='servings'>
                            <label htmlFor='servings'>Servings (Optional)</label>
                            <input
                                id='servings'
                                type='number'
                                placeholder='i.e. 6'
                            />
                        </div>

                        
                        <div id='total_time'>
                            <p>Total Time</p>
                            <div id='time_days'>
                                <input
                                    class='total_time_input'
                                    id='total_time_days'
                                    type='number'
                                    placeholder='0'
                                />
                                <label htmlFor='total_time_days'>Days</label>
                            </div>
                            <div id='time_hours'>  
                                <input
                                    class='total_time_input'
                                    id='total_time_hours'
                                    type='number'
                                    placeholder='0'
                                />
                                <label htmlFor='total_time_hours'>Hours</label>
                            </div>
                            <div id='time_min'>
                                <input
                                    class='total_time_input'
                                    id='total_time_min'
                                    type='number'
                                    placeholder='0'
                                />
                                <label htmlFor='total_time_min'>Minutes</label>
                            </div>
                        </div>
                    </div>

                    <hr></hr>

                    <div id='public_private'>
                        <div id='rec_public'>
                            <input
                                id='public'
                                name='recipe_privacy'
                                type='radio'
                                value='public'
                            />
                            <label htmlFor='public'>Public Recipe?</label>
                        </div>
                        <div id='rec_private'>
                            <input
                                id='private'
                                name='recipe_privacy'
                                type='radio'
                                value='private'
                            />
                            <label htmlFor='private'>Private Recipe?</label>
                        </div>
                    </div>

                    <button id='submit' className='btn' type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}