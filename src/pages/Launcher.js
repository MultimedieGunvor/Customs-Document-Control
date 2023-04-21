import { collection, getDocs } from "firebase/firestore";
// import { useState } from "react";

import { db } from "../firebaseConfig";

export default function Launcher() {

    // const [Manifests, SetManifests] = useState([]);
    const manifests= [];
    async function getManifests() {
        const querySnapshot = await getDocs(collection(db, "manifests"));
        querySnapshot.forEach((manifest) => {
            let item = [];
            item.push(manifest.id);
            item.push(manifest.data());
            manifests.push(item);            
        })
        console.log("manifests: ", manifests);
        return manifests;
    };
    getManifests();
    console.log("Testing ", manifests);

    return (
        <div>
            <div className="filter-box">
                <legend>Show range</legend>
                <select className="select-range">
                    <option value="month">Month</option>
                </select>
                <select className="select-type">
                    <option value="all">All</option>
                </select>
                <select className="select-termID">
                    <option value="all">All</option>
                </select>
                <select className="select-status">
                    <option value="working">Working</option>
                </select>
            </div>
        </div>
    );
}