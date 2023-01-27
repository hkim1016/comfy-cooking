// let index = 1;


// const addIngredient = () => {
//     const new_ingred = document.createElement('input');
//     new_ingred.setAttribute('className', 'ingredient')
//     new_ingred.setAttribute('type', 'text');
//     new_ingred.setAttribute('placeholder', 'Add new ingredient');
//     new_ingred.setAttribute('required', '');

//     const new_btn = document.createElement('button');
//     new_btn.append('x');
//     new_btn.setAttribute('type', 'button');
//     new_btn.setAttribute('id', index);
//     new_btn.setAttribute('onClick', removeIngredient(document.getElementById("" + index++ + "")));


//     const new_div = document.createElement('div');
//     new_div.append(new_ingred);
//     new_div.append(new_btn);

//     const ingred_div = document.getElementById('ingredients_input');
//     ingred_div.append(new_div);
// }

// const removeIngredient = (x) => {
//     if(x !== null) {
//         const parentDiv = x.parentElement;
//         console.log(x, parentDiv);
//         parentDiv.remove();
//     }
// }

// module.exports = {
    // addIngredient,
    // removeIngredient
// }
