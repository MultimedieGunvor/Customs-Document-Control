import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../firebaseConfig";
import MakeManifests from "../components/MakeManifests";

export default function Launcher() {

    const [Manifests, SetManifests] = useState([]);
    const [Filtered, setFiltered] = useState(Manifests);

    useEffect(() => {
        const collectionRef = collection(db, "manifests");
        const q = query(collectionRef, orderBy("date", "desc"));
        onSnapshot(q, (snapshot) => {
            const manifests = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFiltered(manifests);
            SetManifests(manifests);
        });
    }, []);

    const handleChange = (e) => {        
        let key = e.target.value;
        let filter = e.target.id;
        console.log("filter: ", filter);
        if (key === "all") {
            setFiltered(Manifests);
        } 
        else {
            if (filter === "terminalId") {
                let keys = ["MTB", "CH", "AAL"];
                keys.forEach((element) => {
                    if (key === element) {
                        const filtered = Manifests.filter((item) => item.terminalId === element);
                        setFiltered(filtered);
                    }
                })
            } else if (filter === "type") {
                let keys = ["import", "export"];
                keys.forEach((element) => {
                    if (key === element) {
                        const filtered = Manifests.filter((item) => item.type === element);
                        setFiltered(filtered);
                    }
                })
            } else {
                let keys = ["Open (201)", "Done (8nd)", "Cancel (8nc)"];
                keys.forEach((element) => {
                    if (key === element) {
                        const filtered = Manifests.filter((item) => item.status === element);
                        setFiltered(filtered);
                    }
                }) 
            }
        }
    }
    return (
        <div className="launcher-page">
            <h1>Manifest list</h1>
            <div className="filter-box">
                <div className="range">
                    <legend>Show range</legend>
                    <select id="select-range">
                        <option value="today">Today</option>
                        <option value="3days">3 Days</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                        <option value="all">All</option>
                    </select>
                </div>
                <div className="type">
                    <legend>Show type</legend>
                    <select id="type" onChange={handleChange}>
                        <option value="all">All</option>
                        <option value="import">Import</option>
                        <option value="export">Export</option>
                    </select>
                </div>
                <div className="termId">
                    <legend>Show termID</legend>
                    <select id="terminalId" onChange={handleChange}>
                        <option value="all">All</option>
                        <option value="MTB">MTB</option> 
                        <option value="CH">CH</option>
                        <option value="AAL">AAL</option>                        
                    </select>
                </div>
                <div className="status">
                    <legend>Show status</legend>
                    <select id="status" onChange={handleChange}>
                        <option value="all">All</option> 
                        <option value="Open (201)">Open</option>
                        <option value="Done (8nd)">Done</option>
                        <option value="Cancel (8nc)">Cancel</option>
                    </select>
                </div>
                <div className="party"> {/* Hvis tid: generér dynamisk ud fra manifest-data */}
                    <legend>Party</legend>
                    <div>PICit</div>
                </div>
                <div className="party2"> {/* Hvis tid: generér dynamisk ud fra manifest-data */}
                    <legend>Party</legend>
                    <div>PICit</div>
                </div>
            </div>
            <MakeManifests manifests={Filtered} />
        </div>
    );
}