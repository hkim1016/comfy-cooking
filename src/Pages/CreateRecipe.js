import {useState, React} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabaseClient';
import UploadPicture from '../Components/UploadPicture';

export default function CreateRecipe({session}) {
    // library.add(faCircleXmark);

    let index_ingred = 1;
    let index_instruct = 1001;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [recipe, setRecipe] = useState('');
    // const [ingredients, setIngredients] = useState([]);
    const [servings, setServings] = useState(0);
    const [image_url, setImageUrl] = useState(null);

    const ingredients = [];
    const instructions = [];
    
    let time = [];
    // let servings = 0;
    let publicRecipe = true;

    const navigate = useNavigate();

    const createRecipe = async (e) => {
        e.preventDefault();
        try {
            const ingredInputs = document.getElementsByClassName('ingredient');
            for(let i = 0; i < ingredInputs.length; i ++) {
                if(ingredInputs[i].value !== "") {
                    ingredients.push(ingredInputs[i].value);
                }
            }

            const instrucInputs = document.getElementsByClassName('instructions');
            for(let i = 0; i < instrucInputs.length; i ++) {
                if(instrucInputs[i].value !== "") {
                    instructions.push(instrucInputs[i].value);
                }
            }

            // alert(document.getElementById('servings').value);
            // alert(servings);
            // servings = document.getElementById('servings').value;

            time = [document.getElementById('total_time_days').value, document.getElementById('total_time_hours').value, document.getElementById('total_time_min').value];

            if(document.getElementById('public').checked) {
                publicRecipe = true;
            } else {
                publicRecipe = false;
            }

            const newRecipe = {
                user_id: session.user.id,
                title,
                instructions,
                description,
                ingredients,
                servings,
                time,
                publicRecipe,
                recipe_image: image_url,
            };

            const {error} = await supabase
                .from('recipes')
                .insert([newRecipe]);

            if (error) {
                throw error;
            }
        } catch (error) {
            console.log(error);
            alert(error);
        } finally {
            navigate('/profile');
        }
    }

    function removeIngredient(e) {
        e.parentElement.remove();
    }

    const addIngredient = () => {
        const ingredInputs = document.getElementsByClassName('ingredient');
        // console.log(ingredInputs.length);
        // ingredInputs.forEach(ingred => {
        //     console.log(ingred);
        // });
        for(let i = 0; i < ingredInputs.length; i ++) {
            console.log(ingredInputs[i].value === "");
            // console.log(' ');
            // ingredients.push(ingredInputs)
        }

        const new_ingred = document.createElement('input');
        new_ingred.setAttribute('class', 'ingredient')
        new_ingred.setAttribute('type', 'text');
        new_ingred.setAttribute('placeholder', 'Add new ingredient');
        new_ingred.setAttribute('required', '');
        // new_ingred.setAttribute('id', 'ingred_' + index_ingred)
    
        const new_btn = document.createElement('button');
        new_btn.setAttribute('type', 'button');
        new_btn.setAttribute('id', index_ingred);

        const btn_div = document.createElement('div');
        new_btn.append(btn_div);
    
        const new_div = document.createElement('div');
        new_div.append(new_ingred);
        new_div.append(new_btn);
    
        const ingred_div = document.getElementById('ingredients_input');
        ingred_div.append(new_div);
    }

    const addInstructions = () => {
        const new_instruct = document.createElement('textarea');
        new_instruct.setAttribute('class', 'instructions');
        new_instruct.setAttribute('placeholder', 'Add new directions');
        new_instruct.setAttribute('required', '');

        const new_btn = document.createElement('button');
        new_btn.setAttribute('type', 'button');
        new_btn.setAttribute('id', index_instruct);

        const btn_div = document.createElement('div');
        new_btn.append(btn_div);

        const new_div = document.createElement('div');
        new_div.append(new_instruct);
        new_div.append(new_btn);

        const instruct_div = document.getElementById('instructions_input');
        instruct_div.append(new_div);
    }
    
    const addOnClickIngred = () => {
        const btn = document.getElementById("" + index_ingred + "");
        // btn.setAttribute('onClick', "(function(){ console.log(document.getElementById(" + '' + index + ").parentElement) })()");
        btn.setAttribute('onClick', "(function(){ document.getElementById(" + index_ingred + ").parentElement.remove() })()");

        // const input = document.getElementById('ingred_' + index_ingred);
        // input.setAttribute('onChange', "{e => {console.log(1)} }")

        index_ingred++;
    }

    const addOnClickInstruc = () => {
        const btn = document.getElementById("" + index_instruct + "");
        // btn.setAttribute('onClick', "(function(){ console.log(document.getElementById(" + '' + index + ").parentElement) })()");
        btn.setAttribute('onClick', "(function(){ document.getElementById(" + index_instruct + ").parentElement.remove() })()");

        index_instruct++;
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
                {/* <form onSubmit={() => {createRecipe(); navigate('/profile')}}> */}
                <form id='form123' onSubmit={createRecipe}>
                    <h2>Add Your Recipe!</h2>
                    <hr></hr>
                    <div className='pic_title_desc'>
                        <div id='new_rec_pic'>
                            <p>Upload a Photo <br></br> (Optional)</p>
                            <UploadPicture
                                url={image_url}
                                size={150}
                                onUpload={(url) => {
                                    setImageUrl(url)
                                    createRecipe({ user_id: session.user.id, title, description, ingredients, instructions, time, publicRecipe, image_url: url })
                                }}
                            />
                        </div>

                        <div className='title_desc'>
                            <label htmlFor='title'>Title</label>
                            <input
                                id='title'
                                type='text'
                                placeholder='Your Recipe Title'
                                // value={title}
                                onChange={e => setTitle(e.target.value.trim())}
                                required
                            />
                            <label htmlFor='decription'>Description (Optional)</label>
                            <textarea
                                id='description'
                                placeholder='Your Recipe Description'
                                onChange={e => setDescription(e.target.value.trim())}
                            >    
                            </textarea>
                        </div>
                    </div>

                    <hr></hr>

                    <div className='ingredients'>
                        <p>Ingredients</p>
                        <div id='ingredients_input'>
                            <div>
                                <input
                                    className='ingredient'
                                    type='text'
                                    placeholder='i.e. 2 tbsp of lemon juice'
                                    required
                                />
                                <button id='0' type='button' onClick={() => removeIngredient(document.getElementById('0'))}>
                                    <div></div>
                                </button>
                            </div>
                        </div>
                        <button type='button' id='add_ingred' onClick={() => {addIngredient(); addOnClickIngred()}}>Add Ingredient</button>
                    </div>

                    <hr></hr>

                    <div className='directions'>
                        <p>Directions</p>
                        <div id='instructions_input'>
                            <div>
                                <textarea className='instructions' placeholder='i.e. Preheat oven to 275 degrees F'></textarea>

                                <button id='1000' type='button' onClick={() => removeIngredient(document.getElementById('1000'))}>
                                    <div></div>
                                </button>
                            </div>
                        </div>
                        <button type='button' id='add_instruc' onClick={() => {addInstructions(); addOnClickInstruc()}}>Add Instruction</button>
                    </div>

                    <hr></hr>

                    <div className='serving_time'>
                        <div className='servings'>
                            <label htmlFor='servings'>Servings (Optional)</label>
                            <input
                                id='servings'
                                type='number'
                                placeholder='0'
                                // value='0'
                                onChange={e => setServings(e.target.value)}
                            />
                        </div>

                        <p id='total_time_title'>Total Time (Optional)</p>
                        <div id='total_time'>
                            <div id='time_days'>
                                <input
                                    className='total_time_input'
                                    id='total_time_days'
                                    type='number'
                                    placeholder='0'
                                />
                                <label htmlFor='total_time_days'>Days</label>
                            </div>
                            <div id='time_hours'>  
                                <input
                                    className='total_time_input'
                                    id='total_time_hours'
                                    type='number'
                                    placeholder='0'
                                />
                                <label htmlFor='total_time_hours'>Hours</label>
                            </div>
                            <div id='time_min'>
                                <input
                                    className='total_time_input'
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
                                required
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