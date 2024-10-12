/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import {
	addPhoto,
	removePhoto,
} from '../../../features/products/newRentalSlice';
import { PhotoIcon } from '@heroicons/react/24/solid';
import imageCompression from 'browser-image-compression';

const PhotoUploadForm = ({ setLocalFiles }) => {
	const { images, photoPackage } = useSelector(
		(state) => state.newRental.basicItemInfo
	);
	const maxPhotos = photoPackage ? 25 : 5;

	const dispatch = useDispatch();

	const handlePhotoUpload = async (event) => {
		const files = Array.from(event.target.files);
		const options = {
			maxSizeMB: 1, // Set the max file size (in MB)
			maxWidthOrHeight: 1024, // Set max width/height to resize
			useWebWorker: true, // Use web workers for better performance
		};

		for (let file of files) {
			try {
				// Compress the image
				const compressedBlob = await imageCompression(file, options);

				// Convert Blob back to a File (preserving original file metadata)
				const compressedFile = new File([compressedBlob], file.name, {
					type: file.type,
					lastModified: file.lastModified,
				});

				// Generate a URL for the compressed image
				const imageUrl = URL.createObjectURL(compressedFile);

				// Dispatch the URL to Redux and store the File locally
				dispatch(addPhoto(imageUrl));
				setLocalFiles((prevFiles) => [...prevFiles, compressedFile]); // Store compressed File object locally
			} catch (error) {
				console.error('Error while compressing the image:', error);
			}
		}
	};

	const handlePhotoRemove = (index) => {
		dispatch(removePhoto(index));
		setLocalFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove corresponding File object locally
	};

	return (
		<div>
			<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 p-4 bg-white shadow rounded-lg'>
				<label htmlFor='file-upload'>
					<h2 className='text-lg text-teal-600 font-semibold mb-4'>
						Upload Photos here
					</h2>
				</label>
				<div className='mt-2 sm:col-span-3 sm:mt-0'>
					<div className='flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
						<div className='text-center'>
							<PhotoIcon
								aria-hidden='true'
								className='mx-auto h-12 w-12 text-gray-300'
							/>
							<div className='mt-4 flex text-sm leading-6 text-gray-600'>
								<label
									htmlFor='file-upload'
									className='relative cursor-pointer rounded-md bg-white font-semibold text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-600 focus-within:ring-offset-2 hover:text-teal-500'
								>
									<span>Upload a file</span>
									<input
										id='file-upload'
										type='file'
										accept='image/*'
										multiple
										onChange={handlePhotoUpload}
										className='sr-only'
									/>
								</label>
								<p className='pl-1'>or drag and drop</p>
							</div>
							<p className='text-xs leading-5 text-gray-600'>
								PNG, JPG, GIF up to 10MB
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className='image-array-div'>
				{images.map((image, index) => (
					<div className='image-preview-div' key={index}>
						<img src={image} alt={`Preview ${index}`} />
						<button
							className='deletePhoto'
							onClick={() => handlePhotoRemove(index)}
						>
							X
						</button>
					</div>
				))}
			</div>

			<p className='text-sm font-medium leading-6 text-gray-900 mt-4'>
				{images.length}/{maxPhotos} photos uploaded
			</p>
		</div>
	);
};

export default PhotoUploadForm;
