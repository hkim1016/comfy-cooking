import {supabase} from '../supabaseClient';
import {useEffect, useState, React} from 'react';

export default function UploadPicture({url, size, onUpload}) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    const downloadImage = async (path) => {
        try {
            // console.log('path', path);
            const { data, error } = await supabase.storage.from('avatars').download(path);

            if (error) {
                throw error
            }

            const url = URL.createObjectURL(data);
            // console.log('123', data);
            setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message);
        }
    }

    const uploadAvatar = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            onUpload(filePath);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div style={{ width: size }} aria-live="polite">
            <img
                src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
                alt={avatarUrl ? 'Avatar' : 'No image'}
                className="avatar image"
                style={{ height: size, width: size }}
            />

            {uploading ? (
                'Uploading...'
            ) : (
            <>
                <label className="button primary block" htmlFor="single">
                    Upload a picture
                </label>

                <div className="visually-hidden">
                    <input
                        type="file"
                        id="single"
                        accept="image/*"
                        onChange={uploadAvatar}
                        disabled={uploading}
                    />
                </div>
            </>
            )}
        </div>
    )
}