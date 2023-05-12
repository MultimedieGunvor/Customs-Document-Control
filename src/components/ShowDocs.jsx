import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Popup from "./Popup";

export default function ShowDocs ({documents, docs}) {

    const DOCS = Object.entries(docs);

    function getCustRefs(obj) {
        const values = Object.values(obj);

        return values.join(" ");
    };

    const [show, setShow] = useState(false);
    const [DocKey, setDocKey] = useState();
    const [updates, setUpdates] = useState();

    function getDocKey (prop) {
        const docKey = prop;
        console.log("docKey: ", docKey);
        setDocKey(docKey);
    }
    const closePopup = () => {
        setShow(false);
    };

    window.addEventListener('storage', () => {
        let keys = Object.keys(sessionStorage);
        setUpdates(keys); 
        sessionStorage.clear();
    });
    function getValue(key, prop) {
        if(updates === undefined)
        return prop // TO be continued... Make it reload the entire manifest, so you don't have any problems when there's more than one doc!
    }

    // window.addEventListener('storage', () => { // -- This all works, but it's cumbersome. Find a better way?
    //     let keys = Object.keys(sessionStorage);
    //     let dbUpdates = {};
    //     for (let key of keys) {
    //         let item = sessionStorage.getItem(key);
    //         dbUpdates[key] = item;
    //         console.log(dbUpdates);
    //     }
    //     console.log("dbUpdates: ", dbUpdates);
    //     setUpdates(dbUpdates);
    // });
    // function getPod(prop) {
    //     if (updates === undefined)
    //     return prop
    //     else if (!updates.pod)
    //     return prop
    //     else return updates.pod 
    // };
    const checkType = (a, b) => {
        documents.type === "import" ? (a) : (b) // Add && Notify Party === unchecked ... på en eller anden måde
    }
    const DocHeaders = () => {
        const headers = ["CDC Status", "B/L", "Container", "L/R", "Vet", "Pol/Pod", "Cust Ref", "Status Code", checkType("Consignee", "Consignor"), "M", "Cust Ref Type", "Item No", "CI BL", "CI Cust", "W BL", "W Cust", "TrnsDocType", "MIG Responsible", "Customs Status", "Customs Status", "Customs Data", "Container Note", "Cust Ref Note", "Disc Reason", "SKAT Manifest Status", checkType("Delivery Place", "Authority Note")];
        return (
            <div className="docs-header-box">
            {headers.map((header, index) => {
                <div key={header+index}>{header}</div>
            })}
            </div>
        );
    };


    console.log(updates);
    return (
        <div className="docs-box">
            <DocHeaders />
            {/* <div className="docs-header-box">
                <div>CDC Status</div>
                <div>B/L</div>
                <div>Container</div>
                <div>L/R</div>
                <div>Vet</div>
                <div>Pol/Pod</div>
                <div>Cust Ref</div>
                <div>Status Code</div>
                {documents.type === "import" ? (
                <div>Consignee</div>) : (
                <div>Consignor</div>)} 
                <div>M</div>
                <div>Cust Ref Type</div>
                <div>Item No</div>
                <div>CI BL</div>
                <div>CI Cust</div>
                <div>W BL</div>
                <div>W Cust</div>
                <div>TrnsDocType</div>
                <div>MIG Responsible</div>
                <div>Customs Status</div>
                <div>Customs Data</div>
                <div>Container Note</div>
                <div>Cust Ref Note</div>
                <div>Disc Reason</div>
                <div>SKAT Manifest Status</div>
                {documents.type === "import" ? (
                <div>Delivery Place</div>) : (
                <div>Authority Note</div>)}
            </div> */}
            {DOCS.map((DOC) => (
                <div className="docs-content"
                key={DOC[0]}
                onClick={() => {
                    show === false ? setShow(true) : setShow(false)
                    getDocKey(DOC[0])}}
                > 
                    <div>{DOC[1].cdcStatus}</div>
                    <div>{DOC[0]}</div>
                    <div>{DOC[1].container}</div>
                    <div>{DOC[1].lr}</div>
                    <div>{DOC[1].vet}</div>
                    <div>{getPod(DOC[1].pod)}</div> {/*  Also call pol/pod filter function here */}
                    <div>{getCustRefs(DOC[1].custRef)}</div>
                    <div>{DOC[1].statusCode}</div>
                    {documents.type === "import" ? (
                    <div>{DOC[1].consignee}</div>) : (
                    <div>{DOC[1].consignor}</div>)}
                    <div>{DOC[1].m}</div>
                    <div>{DOC[1].custRefType}</div>
                    <div>{DOC[1].itemNo}</div>
                    <div>{DOC[1].ciBl}</div>
                    <div>{DOC[1].ciCust}</div>
                    <div>{DOC[1].wBl}</div>
                    <div>{DOC[1].wCust}</div>
                    <div>{DOC[1].trnsDocType}</div>
                    <div>{DOC[1].migResponsible}</div>
                    <div>{DOC[1].customsStatus}</div>
                    <div>{DOC[1].customsData}</div>
                    <div>{DOC[1].containerNote}</div>
                    <div>{DOC[1].custRefNote}</div>
                    <div>{DOC[1].discReason}</div>
                    <div>{DOC[1].skatManifestStatus}</div>
                    {documents.type === "import" ? (
                    <div>{DOC[1].deliveryPlace}</div>) : (
                    <div>{DOC[1].authorityNote}</div>)}
                    {show === true && DocKey === DOC[0]? (<Popup doc={DOC} show={show} onClose={closePopup} folder={documents} Pod={getPod(DOC[1].pod)}/>) : ("")}
                </div>
            ))}
        </div>
    );
}