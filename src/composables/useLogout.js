import { ref } from "vue";
import "../firebase/config";
import { getAuth, signOut } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const logout = async () => {
  error.value = null;
  isPending.value = true;

  try {
    const auth = getAuth();
    await signOut(auth);
    isPending.value = false;
  } catch (err) {
    console.log(err);
    error.value = err.message;
    isPending.value = false;
  }
};

const useLogout = () => {
  return { error, logout, isPending };
};

export default useLogout;
