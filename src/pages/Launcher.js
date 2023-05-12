import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../firebaseConfig";
import MakeManifests from "../components/MakeManifests";

export default function Launcher() {

    const [Manifests, SetManifests] = useState([]);

    useEffect(() => {
        const manifestRef = collection(db, "manifests");
        const q = query(manifestRef, orderBy("date", "desc"));
        onSnapshot(q, (snapshot) => {
            const manifests = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            SetManifests(manifests);
        });
    }, []);

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
                    <select id="select-termID"> {/* Hvis tid: generér dynamisk ud fra manifest-data */}
                        <option value="all">All</option> {/* Gør til default */}
                        <option value="bk9">BK9</option>
                        <option value="tct">TCT</option>
                        <option value="eur">EUR</option>
                        <option value="cta">CTA</option>
                        <option value="mtb">MTB</option>
                        <option value="ch">CH</option>
                        <option value="aal">AAL</option>
                        <option value="apmt">APMT</option>
                        <option value="aad">AAD</option>
                        <option value="aat">AAT</option>
                        <option value="q">Q</option>
                        <option value="k">K</option>
                        <option value="f">F</option>
                        <option value="kl">KL</option>
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