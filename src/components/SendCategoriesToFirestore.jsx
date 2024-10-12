import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const categories = [
	{
		name: 'Vehicles',
		subcategories: [
			'Automobiles',
			'Motorcycles',
			'RVs & Campers',
			'Boats',
			'Bicycles',
			'ATVs & Off-Road',
			'Aircraft',
		],
	},
	{
		name: 'Appliances',
		subcategories: ['Kitchen', 'Laundry', 'Bathroom', 'General'],
	},
	{
		name: 'Real Estate & Rooms',
		subcategories: ['House', 'Condo', 'TownHome', 'Apartment', 'Room Rental'],
	},
	{
		name: 'Get Away',
		subcategories: ['Vacation', 'Campsite'],
	},
	{
		name: 'Tools & Equipment',
		subcategories: [
			'Construction Equipment',
			'Home Improvement Tools',
			'Audio/Visual Equipment',
			'Office Equipment',
		],
	},
	{
		name: 'Recreational Items',
		subcategories: [
			'Sports Equipment',
			'Camping Gear',
			'Outdoor Recreation',
			'Water Sports',
		],
	},
	{
		name: 'Technology',
		subcategories: [
			'Electronics',
			'Photography Equipment',
			'Videography Equipment',
		],
	},
	{
		name: 'Party & Event',
		subcategories: [
			'Venues',
			'Party Supplies',
			'Catering Equipment',
			'Entertainment',
		],
	},
	{
		name: 'Fashion & Fitness',
		subcategories: ['Clothing', 'Accessories', 'Health & Fitness'],
	},
	{
		name: 'Miscellaneous',
		subcategories: ['Musical Instruments', 'Books & Media', 'Specialty Items'],
	},
	{
		name: 'Moving Equipment',
		subcategories: ['Moving Truck Rentals', 'Moving Supplies'],
	},
	{
		name: 'Storage & Space',
		subcategories: ['Storage Space', 'Storage Unit', 'Parking'],
	},
];

const SendCategoriesToFirestore = () => {
	const sendToDatabase = async () => {
		for (const category of categories) {
			// Check if the category exists
			const categoryCollectionRef = collection(db, 'categories');
			const categoryQuerySnapshot = await getDocs(categoryCollectionRef);
			const existingCategory = categoryQuerySnapshot.docs.find(
				(doc) => doc.data().title === category.name
			);

			let categoryId;
			if (existingCategory) {
				// If the category exists, get its ID
				categoryId = existingCategory.id;
			} else {
				// If the category doesn't exist, add it
				const categoryDocRef = await addDoc(categoryCollectionRef, {
					title: category.name,
				});
				categoryId = categoryDocRef.id;
			}

			// Now handle subcategories
			const subcategoryCollectionRef = collection(
				db,
				`categories/${categoryId}/subcategories`
			);
			const subcategoryQuerySnapshot = await getDocs(subcategoryCollectionRef);

			for (const subcategory of category.subcategories) {
				const existingSubcategory = subcategoryQuerySnapshot.docs.find(
					(doc) => doc.data().title === subcategory
				);

				if (!existingSubcategory) {
					// If the subcategory doesn't exist, add it
					await addDoc(subcategoryCollectionRef, {
						title: subcategory,
					});
				}
			}
		}

		alert('Categories and subcategories sent to Firestore!');
	};

	return (
		<div>
			<button onClick={sendToDatabase}>Send to Database</button>
		</div>
	);
};

export default SendCategoriesToFirestore;
