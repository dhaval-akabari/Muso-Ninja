import { ref } from 'vue';
import '../firebase/config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const user = ref(auth.currentUser);

onAuthStateChanged(auth, (_user) => {
    user.value = _user;
})

const getUser = () => {
    return { user };
}

export default getUser;