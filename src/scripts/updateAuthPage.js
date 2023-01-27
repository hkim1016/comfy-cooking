export const updateAuthPage = (signUpHidden) => {
    const signUp = document.querySelector('.signup');
    const login = document.querySelector('.login');

    if (signUpHidden) {
        signUp.style.display = 'none';
        login.style.display = '';
    } else {
        signUp.style.display = '';
        login.style.display = 'none';
    }
}