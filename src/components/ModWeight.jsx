import * as React from "react";
import { writeBatch, doc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebaseConfig";

const ModWeight = ({BL, folder, onClose}) => {
    const batch = writeBatch(db);
    const [Value, setValue] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValue(values => ({...values, [name]: Number(value)}))
    };

    const handleSubmit = async () => {
        const blRef = doc(db, "manifests", folder.id);
        batch.update(blRef, {[`docs.${BL[0]}.ciBl`]: Value.ciBl || BL[1].ciBl});
        batch.update(blRef, {[`docs.${BL[0]}.wBl`]: Value.wBl || BL[1].wBl});
        console.log("batch: ", batch);
        await batch.commit();
        window.dispatchEvent(new Event('update'));
        toast.success(`Updated colli: ${Value.ciBl || BL[1].ciBl} weight: ${Value.wBl || BL[1].wBl}`);
        onClose();
    };

    
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
                        value={Value.ciBl || BL[1].ciBl}
                        onChange={(e) => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <legend>Weight</legend>
                    <input 
                        type="number" 
                        name="wBl" 
                        value={Value.wBl || BL[1].wBl}
                        onChange={(e) => handleChange(e)}>
                    </input>
                </div>
            </div>
            <div>
                <div className="cancel btn" onClick={onClose}>Cancel</div>
                <div className="ok btn"
                onClick={() => {
                    handleSubmit()
                }}>OK</div>
            </div>
        </div>
    )
};

export default ModWeight;