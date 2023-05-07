import * as React from "react";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ModWeight = ({BL, folder, onClose}) => {
    const batch = writeBatch(db);

    const handleChange = (e) => {
        const blRef = doc(db, "manifests", folder.id, "docs", BL[0]);
        console.log("Testing e.target: ", e.target.name, " + ", e.target.value);
        batch.update(blRef, {[e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
        console.log("Batch: ", batch);
        // await batch.commit();
    }
    return (
        <div className="popup-weight">
            <h2>Modify weight</h2>
            <div>
                <legend>Folder no</legend>
                <div>{folder.folderNo}</div>
            </div>
            <div>
                <legend>B/L</legend>
                <div>{BL[0]}</div>
            </div>
            <div>
                <legend>Container</legend>
                <div>{BL[1].container}</div>
            </div>
            <div>
                <div>
                    <legend>Colli</legend>
                    <input 
                        type="number" 
                        name="ciBl" 
                        value={BL[1].ciBl}
                        onChange={(e) => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <legend>Weight</legend>
                    <input 
                        type="number" 
                        name="wBl" 
                        value={BL[1].wBl}
                        onChange={(e) => handleChange(e)}>
                    </input>
                </div>
            </div>
            <div>
                <div className="cancel btn" onClick={onClose}>Cancel</div>
                <div className="ok btn"
                onClick={() => {
                    handleSubmit()
                    // onClose
                }}>OK</div>
            </div>
        </div>
    )
};

export default ModWeight;