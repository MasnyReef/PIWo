import { firestore  } from "./init";
import { collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";

export const addTodo = async (user, content) => {
    try {
        await addDoc(collection(firestore, 'todos'), {
            uid: user.uid,
            content: content,
            competed: false,
            created: Timestamp.now()
        });
    } catch (err) {
        console.log({err});
    }
}

export const getAllTodos = async (user) => {
    const q = query(collection(firestore, "todos"),
        where("uid", "==", user.uid));
    
    const todos = [];
    
    try {
        const querySnaphot = await getDocs(q);
        querySnaphot.forEach((doc) => {
            todos.push(doc.data().content);
        })
    } catch (err) {
        console.log({err});
    }
    return todos;
}