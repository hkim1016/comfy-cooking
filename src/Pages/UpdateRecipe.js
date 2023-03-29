import {supabase} from '../supabaseClient';
import {useState, useEffect, React} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UploadPicture from '../Components/UploadPicture';

export default function UpdateRecipe({session}) {
    let index_ingred = 1;
    let index_instruct = 1001;
    const [load, setLoad] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [servings, setServings] = useState(location.state.servings);
    const [time, setTime] = useState([]);
    const [image_url, setImageUrl] = useState(null);

    const new_ingredients = [];
    const new_instructions = [];
    let new_time = [];
    let publicRecipe = true;

    useEffect(() => {
        setTitle(location.state.title);
        setDescription(location.state.description);
        setIngredients(location.state.ingredients);
        setInstructions(location.state.instructions);
        setServings(location.state.servings);
        setTime(location.state.time);
        setImageUrl(location.state.recipe_image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // console.log('load: ' + load);
        if(load === 20) {
            fillIngredAndInstruc();
        }
        if(load < 50) {
            setLoad(load + 1);
        }
    }, [load])

    // window.onload = () => {
    //     setTimeout(() => {
    //         fillIngredAndInstruc();
    //     }, 3000);
    // }

    // document.addEventListener("DOMContentLoaded", function() {
    //     // function body
    //     fillIngredAndInstruc();
    // }, false);
    
    const updateRecipe = async e => {
        e.preventDefault();

        try {
            const ingredInputs = document.getElementsByClassName('ingredient');
            for(let i = 0; i < ingredInputs.length; i ++) {
                if(ingredInputs[i].value !== "") {
                    new_ingredients.push(ingredInputs[i].value);
                }
            }

            const instrucInputs = document.getElementsByClassName('instructions');
            for(let i = 0; i < instrucInputs.length; i ++) {
                if(instrucInputs[i].value !== "") {
                    new_instructions.push(instrucInputs[i].value);
                }
            }

            const days = document.getElementById('total_time_days').value === '' ? 0 : document.getElementById('total_time_days').valueAsNumber;
            const hours = document.getElementById('total_time_hours').value === '' ? 0 : document.getElementById('total_time_hours').valueAsNumber;
            const min = document.getElementById('total_time_min').value === '' ? 0 : document.getElementById('total_time_min').valueAsNumber;
            new_time = [days, hours, min];

            if(document.getElementById('public').checked) {
                publicRecipe = true;
            } else {
                publicRecipe = false;
            }

            const updates = {
                title,
                description,
                ingredients: new_ingredients,
                instructions: new_instructions,
                servings,
                time: new_time,
                publicRecipe,
                recipe_image: image_url,
            };

            const {error} = await supabase
                .from('recipes')
                .update(updates)
                .eq('id', location.state.id);

            if (error) {
                throw error;
            }

            // console.log(123123123, image_url);
        } catch (error) {
            alert(error.message);
        } finally {
            navigate('/profile');
        }
    }

    const fillIngredAndInstruc = () => {
        const instrucInputs = document.getElementsByClassName('instructions');
            for(let i = 0; i < instrucInputs.length; i ++) {
                if(instrucInputs[i].value !== "") {
                    // instructions.push(instrucInputs[i].value);
                    console.log(1, instrucInputs[i].value);
                }
            }
        ingredients.forEach((ingr, i) => {
            console.log(ingr);
            const ingred = document.createElement('input');
            ingred.setAttribute('class', 'ingredient');
            ingred.setAttribute('type', 'text');
            ingred.setAttribute('value', '' + ingr);
            ingred.setAttribute('required', '');

            const new_btn = document.createElement('button');
            new_btn.setAttribute('type', 'button');
            new_btn.setAttribute('id', index_ingred);

            const btn_div = document.createElement('div');
            new_btn.append(btn_div);

            const new_div = document.createElement('div');
            new_div.append(ingred);
            new_div.append(new_btn);

            const ingred_div = document.getElementById('ingredients_input');
            ingred_div.append(new_div);

            addOnClickIngred();
        });

        instructions.forEach((intr, i) => {
            console.log(intr);
            const instruct = document.createElement('textarea');
            instruct.setAttribute('class', 'instructions');
            // instruct.setAttribute('value', intr); 
            instruct.setAttribute('required', '');
            instruct.innerHTML = intr;

            const new_btn = document.createElement('button');
            new_btn.setAttribute('type', 'button');
            new_btn.setAttribute('id', index_instruct);

            const btn_div = document.createElement('div');
            new_btn.append(btn_div);

            const new_div = document.createElement('div');
            new_div.append(instruct);
            new_div.append(new_btn);

            const instruct_div = document.getElementById('instructions_input');
            instruct_div.append(new_div);

            addOnClickInstruc();
        });
    }

    const addIngredient = () => {
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
        
        btn.setAttribute('onClick', "(function(){ document.getElementById(" + index_ingred + ").parentElement.remove() })()");
        // console.log(index_ingred);
        index_ingred++;
    }

    const addOnClickInstruc = () => {
        const btn = document.getElementById("" + index_instruct + "");
        
        btn.setAttribute('onClick', "(function(){ document.getElementById(" + index_instruct + ").parentElement.remove() })()");

        index_instruct++;
    }
    
    return (
        <div id='update_recipe'>
            <nav>
                <div id='firstDiv'>
                    <p id='logo' className='navbar-brand' onClick={() => {navigate('/publicRecipes')}}>COMFY COOKING</p>
                    <div id='secondDiv'>
                        <button className='btn' onClick={() => navigate('/publicRecipes')}>View Recipes</button>
                        <button className='btn' onClick={() => navigate('/createRecipe')}>Create Recipe</button>
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
            <div id='input_recipe'>
                {/* <form onSubmit={() => {createRecipe(); navigate('/profile')}}> */}
                <form id='form123' onSubmit={updateRecipe}>
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
                                    // createRecipe({ user_id: session.user.id, title, description, ingredients, instructions, time, publicRecipe, image_url: url })
                                }}
                            />
                        </div>

                        <div className='title_desc'>
                            <label htmlFor='title'>Title</label>
                            <input
                                id='title'
                                type='text'
                                defaultValue={title}
                                onChange={e => setTitle(e.target.value.trim())}
                                required
                            />
                            <label htmlFor='decription'>Description (Optional)</label>
                            <textarea
                                id='description'
                                defaultValue={description}
                                // onChange={e => setDescription(e.target.value.trim())}
                            >    
                            </textarea>
                        </div>
                    </div>

                    <hr></hr>

                    <div className='ingredients'>
                        <p>Ingredients</p>
                        <div id='ingredients_input'>
                            <div>
                                {/* <input
                                    className='ingredient'
                                    type='text'
                                    placeholder='i.e. 2 tbsp of lemon juice'
                                    required
                                /> */}
                                {/* <button id='0' type='button' onClick={() => removeIngredient(document.getElementById('0'))}>
                                    <div></div>
                                </button> */}
                            </div>
                        </div>
                        <button type='button' id='add_ingred' onClick={() => {addIngredient(); addOnClickIngred()}}>Add Ingredient</button>
                    </div>

                    <hr></hr>

                    <div className='directions'>
                        <p>Instructions</p>
                        <div id='instructions_input'>
                            <div>
                                {/* <textarea className='instructions' placeholder='i.e. Preheat oven to 275 degrees F'></textarea> */}

                                {/* <button id='1000' type='button' onClick={() => removeIngredient(document.getElementById('1000'))}>
                                    <div></div>
                                </button> */}
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
                                defaultValue={servings}
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
                                    defaultValue={time[0]}
                                />
                                <label htmlFor='total_time_days'>Days</label>
                            </div>
                            <div id='time_hours'>  
                                <input
                                    className='total_time_input'
                                    id='total_time_hours'
                                    type='number'
                                    defaultValue={time[1]}
                                />
                                <label htmlFor='total_time_hours'>Hours</label>
                            </div>
                            <div id='time_min'>
                                <input
                                    className='total_time_input'
                                    id='total_time_min'
                                    type='number'
                                    defaultValue={time[2]}
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

                    <button id='cancel_edit' className='btn' type='button' onClick={() => {navigate('/profile')}}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}