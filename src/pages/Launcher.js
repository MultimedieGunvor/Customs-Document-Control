import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../firebaseConfig";
import MakeManifests from "../components/MakeManifests";

export default function Launcher() {

    const [Manifests, SetManifests] = useState([]);
    const [filteredManifests, SetFilteredManifests] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "manifests");
        const q = query(collectionRef, orderBy("date", "desc"));
        onSnapshot(q, (snapshot) => {
            const manifests = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            SetManifests(manifests);
        });
    }, []);

    const handleChange = (e) => {
        sessionStorage.setItem('termId', e.target.value);
        console.log(sessionStorage);
        window.dispatchEvent(new Event("select")); 
    }
    return (
        <div>
            <h1>Manifest list</h1>
            <div className="filter-box">
                <div className="range">
                    <legend>Show range</legend>
                    <select id="select-range">
                        <option value="today">Today</option>
                        <option value="3days">3 Days</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option> {/* Gør til default */}
                        <option value="year">Year</option>
                        <option value="all">All</option>
                    </select>
                </div>
                <div className="type">
                    <legend>Show type</legend>
                    <select id="select-type">
                        <option value="all">All</option> {/* Gør til default + lav filterfunktion */}
                        <option value="import">Import</option>
                        <option value="export">Export</option>
                    </select>
                </div>
                <div className="termId">
                    <legend>Show termID</legend>
                    <select id="select-termID" onChange={handleChange}>
                        <option value="all">All</option> 
                        {Manifests.map((Manifest) => (
                            <option key={Manifest+Manifest.terminalId} value={Manifest.terminalId}>{Manifest.terminalId}</option>
                        ))}
                    </select>
                </div>
                <div className="status">
                    <legend>Show status</legend>
                    <select id="select-status">
                        <option value="all">All</option> 
                        <option value="working">Working</option> {/* Gør til default */}
                        <option value="waitData">Wait data</option>
                        <option value="wait">Wait</option>
                        <option value="notDone">Not done</option>
                    </select>
                </div>
                <div className="party"> {/* Hvis tid: generér dynamisk ud fra manifest-data */}
                    <legend>Party</legend>
                    <div>PICit</div>
                </div>
                <div className="party2"> {/* Hvis tid: generér dynamisk ud fra manifest-data */}
                    <div>PICit</div>
                </div>
            </div>
            <MakeManifests manifests={Manifests} />
        </div>
    );
}