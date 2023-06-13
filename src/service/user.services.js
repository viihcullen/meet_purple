import { db } from "../connectionFirebase"
import { doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc} from "firebase/firestore";

const userCollectionRef = collection(db, "users");

class UserService{

    getTask = (id) => {
        const taskDoc = doc(db, "users", id);
        return getDoc(taskDoc);
    }

    getAllTasks = () => {
        return getDocs(userCollectionRef);
    }

    addTasks = (newTask) => {
        return addDoc(userCollectionRef, newTask);
    }

    updateTask = (id, updatedTask) => {
        const taskDoc = doc(db, "users", id);
        return updateDoc(taskDoc, updatedTask);
    }

    deleteTask = (id) => {
        const taskDoc = doc(db, "users", id);
        return deleteDoc(taskDoc);
    }
}

export default new UserService();