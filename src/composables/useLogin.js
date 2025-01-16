import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
    error.value = null;
    isPending.value = true;

    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        error.value = null;
        isPending.value = false;
        return res;
    } catch (err) {
        error.value = "Incorect login credentials";
        isPending.value = false;
        console.log(err.message);
    }

}

const useLogin = () => {
    return { error, isPending, login }
}

export default useLogin;