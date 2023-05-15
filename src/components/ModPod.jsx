import * as React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState } from "react";

const ModPod = ({BL, folder, onClose}) => {

    const [Value, setValue] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValue(values => ({...values, [name]: value}))
    };

    const handleSubmit = async () => {
        const blRef = doc(db, "manifests", folder.id);
        await updateDoc(blRef, {[`docs.${BL[0]}.pod`]: Value.pod || BL[1].pod});
        window.dispatchEvent(new Event('update'));
        onClose(); // --- Remember to add Alert or Toast Message ---
    };

    
    return (
        <div className="popup-pod">
            <h2>Modify POD</h2>
            <div>
                <legend>Original POD</legend>
                <div>{BL[1].pod}</div>
            </div>
            <div>
                <legend>New POD</legend>
                <input 
                    type="text" 
                    name="pod"
                    onChange={(e) => handleChange(e)}>
                </input>
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

export default ModPod;