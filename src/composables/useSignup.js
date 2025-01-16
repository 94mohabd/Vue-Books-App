import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password) => {
    error.value = null;
    isPending.value = true;

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (!res) {
            throw new Error("Could not complete the signup");
        }
        error.value = null;
        isPending.value = false;
        return res;
    } catch (err) {
        error.value = err.message;
        isPending.value = false;
        console.log(err.message);
    }

}

const useSignup = () => {
    return { error, isPending, signup }
}

export default useSignup;