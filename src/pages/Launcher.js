import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Launcher() {

    async function getmanifests() {
        const querySnapshot = await getDocs(collection(db, "manifests"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        })
    };

    getmanifests();

    return (
        <div>
            Insert launcher here
        </div>
    );
}