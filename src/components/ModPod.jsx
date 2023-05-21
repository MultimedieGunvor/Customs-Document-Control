import * as React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebaseConfig";

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
        toast.success(`Updated POD: ${Value.pod || BL[1].pod}`);
        onClose(); 
    };

    
    return (
        <div className="popup-pod">
            <h2>Modify POD</h2>
            <div className="original-pod">
                <legend>Original POD</legend>
                <div>{BL[1].pod}</div>
            </div>
            <div className="new-pod">
                <legend>New POD</legend>
                <input 
                    type="text" 
                    name="pod"
                    onChange={(e) => handleChange(e)}>
                </input>
            </div>
            <div className="pod-btns">
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