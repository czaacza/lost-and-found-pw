import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../firebase';
import * as ImageManipulator from 'expo-image-manipulator';

export async function uploadImage(
  imageUri,
  onProgress,
  setImage,
  updateUser,
  user
) {
  try {
    // resize the image under imageUri to 200x200 and fetch(reiszedImage.uri)
    const resizedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 200, height: 200 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );

    const response = await fetch(resizedImage.uri); // Fetch the resized image data
    const blob = await response.blob(); // Convert image data to blob

    const storageRef = ref(
      storage,
      `profile_pictures/${user.id}/${new Date().getTime()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, blob); // Upload blob to Firebase Storage

    // listen for events
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        console.log(`Upload is ${progress * 100}% done`);
        onProgress(progress); // Invoke the callback with the current progress
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      },
      () => {
        // Handle successful uploads on complete
        setImage(resizedImage.uri);

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          addDoc(collection(db, 'images'), { url: downloadURL });

          updateUser(user.id, { ...user, image: downloadURL });
        });

        alert('Image uploaded successfully!');
      }
    );
  } catch (error) {
    console.error(error);
    alert('Sorry, there was an error uploading your image.');
  }
}

export const handleImagePicked = async (
  pickerResult,
  setImage,
  setUploadProgress,
  updateUser,
  user
) => {
  console.log(pickerResult); // Log the image data

  // Ensure there's at least one asset and it wasn't cancelled
  if (
    !pickerResult.canceled &&
    pickerResult.assets &&
    pickerResult.assets.length > 0
  ) {
    const uri = pickerResult.assets[0].uri; // Access URI from assets array

    // Upload the image to Firebase Storage
    try {
      await uploadImage(
        uri,
        (progress) => setUploadProgress(progress),
        setImage,
        updateUser,
        user
      );
    } catch (error) {
      console.log(error);
      alert('Sorry, there was an error uploading your image.');
    }
  }
};
