import { collection, getDocs } from "firebase/firestore";
// import { useState } from "react";

import { db } from "../firebaseConfig";

export default function Launcher() {

    // const [Manifests, SetManifests] = useState([]);
    const manifests = [];
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
                <select id="select-range">
                    <option value="today">Today</option>
                    <option value="3days">3 Days</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option> {/* Gør til default */}
                    <option value="year">Year</option>
                    <option value="all">All</option>
                </select>
                <select id="select-type">
                    <option value="all">All</option> {/* Gør til default */}
                    <option value="import">Import</option>
                    <option value="export">Export</option>
                </select>
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
                <select id="select-status">
                    <option value="all">All</option> 
                    <option value="working">Working</option> {/* Gør til default */}
                    <option value="waitData">Wait data</option>
                    <option value="wait">Wait</option>
                    <option value="notDone">Not done</option>
                </select>
                <div className="party"> {/* Hvis tid: generér dynamisk ud fra manifest-data */}
                    <legend>Party</legend>
                    <div>PICit</div>
                </div>
                <div className="party2"> {/* Hvis tid: generér dynamisk ud fra manifest-data */}
                    <div>PICit</div>
                </div>
            </div>
            <div className="manifest-box">
                <div className="folderNo manifest-header">Folder no</div>
                <div className="folderId manifest-header">Folder ID</div>
                <div className="date manifest-header">Date</div>
                <div className="type manifest-header">Type</div>
                <div className="termId manifest-header">Terminal ID</div>
                <div className="mot manifest-header">Primary MOT</div>
                <div className="status manifest-header">Status</div>
                <div className="docs manifest-header">Documents</div>
                <div className="refNo manifest-header">Ref no</div>
                <div className="callInfo manifest-header">Call info</div>
                <div className="canRead manifest-header">Can read</div>
                <div className="div12"></div>
                <div className="div13"> </div>
                <div className="div14"> </div>
                <div className="div15"> </div>
                <div className="div16"> </div>
                <div className="div17"> </div>
                <div className="div18"> </div>
                <div className="div19"> </div>
                <div className="div20"> </div>
                <div className="div21"> </div>
                <div className="div22"> </div>
                <div className="div23"> </div>
                <div className="div24"> </div>
                <div className="div25"> </div>
                <div className="div26"> </div>
                <div className="div27"> </div>
                <div className="div28"> </div>
                <div className="div29"> </div>
                <div className="div30"> </div>
                <div className="div31"> </div>
                <div className="div32"> </div>
                <div className="div33"> </div>
            </div>
        </div>
    );
}