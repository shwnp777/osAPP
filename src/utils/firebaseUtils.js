// firebaseUtils.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const storage = getStorage();

export const uploadPhotosToFirebase = async (photos) => {
	const photoUrls = await Promise.all(
		photos.map(async (photo) => {
			const storageRef = ref(storage, `rentals/${uuidv4()}-${photo.name}`);
			const snapshot = await uploadBytes(storageRef, photo);
			return await getDownloadURL(snapshot.ref);
		})
	);
	return photoUrls;
};
