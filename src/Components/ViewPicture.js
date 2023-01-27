import {supabase} from '../supabaseClient';
import {useEffect, useState, React} from 'react';

export default function ViewPicture({url}) {
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    const downloadImage = async (path) => {
        try {
            console.log('path', path);
            const { data, error } = await supabase.storage.from('avatars').download(path);

            if (error) {
                throw error
            }

            const url = URL.createObjectURL(data);
            console.log('123', data);
            setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message);
        }
    }

    return (
        <div id='view_pic'>
            <img
                src={avatarUrl ? avatarUrl : 'https://place-hold.it/100'}
                alt={avatarUrl ? 'Avatar' : 'No image'}
                className="avatar image recipe_image"
            />
        </div>
    )
}