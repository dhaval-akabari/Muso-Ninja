import { ref } from "vue";
import "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
  error.value = null;
  isPending.value = true;

  try {
    const auth = getAuth();
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (!res) {
      throw new Error("Could not complete the signup!");
    }
    await updateProfile(auth.currentUser, { displayName });
    error.value = null;
    isPending.value = false;

    return res;
  } catch (err) {
    console.log(err.code, err.message);
    let message = null;
    switch (err.code) {
      case "auth/missing-email":
        message = "The email address is required.";
        break;
      case "auth/invalid-email":
        message = "The email address is invalid.";
        break;
      case "auth/email-already-in-use":
        message = "The email address is already in use.";
        break;
      case "auth/weak-password":
        message = "Password should be at least 6 characters.";
        break;
      default:
        message = "Error in sign up. Please try again.";
    }
    error.value = message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
