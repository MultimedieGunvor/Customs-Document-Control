import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Popup from "./Popup";
// import Hover from "./Hover";

export default function ShowDocs ({documents}) {

    const [content, setContent] = useState([]);
    const [show, setShow] = useState(false);
    const [DocKey, setDocKey] = useState();
    // const [hover, setHover] = useState(null);

    function getCustRefs(obj) {
        const values = Object.values(obj);

        return values.join(", ");
    };

    function getDocKey (prop) {
        const docKey = prop;
        console.log("docKey: ", docKey);
        setDocKey(docKey);
    }
    const closePopup = () => {
        setShow(false);
    };

    useEffect(() => {
        async function fetchData () {
            try {
                const dataRef = doc(db, "manifests", documents.id);
                const res = await getDoc(dataRef);
                const test = Object.entries(res.data().docs);
                console.log("Fetched manifest-data: ", test);
                setContent(test);
                return test;
            } catch (err) {
                console.log("Error: ", err);
            }
        };
        fetchData();
        window.addEventListener('update', () => {
            fetchData();
        });
    }, [documents.id]);

    const checkType = (a, b) => {
        if (documents.type === "import") {
            return a
        } else {
            return b
        } // Tilføj && Notify Party === unchecked 
    };

    const DocContents = () => {
        return (
        content.map((item) => (
            <div className="docs-content"
            key={item[0]}
            onClick={() => {
                show === false ? setShow(true) : setShow(false)
                getDocKey(item[0])
            }}>
                <div>{item[1].cdcStatus}</div>
                <div>{item[0]}</div>
                <div className="char-limit">{item[1].container}</div>
                <div>{item[1].lr}</div>
                <div>{item[1].vet}</div>
                <div>{item[1].pod}</div>
                <div className="char-limit" 
                // onMouseEnter={() => setHover(getCustRefs(item[1].custRef))}
                // onMouseLeave={() => setHover(false)}
                >{getCustRefs(item[1].custRef)}
                {/* {hover === getCustRefs(item[1].custRef) ? (<Hover props={getCustRefs(item[1].custRef)}/>) : ("")} */}
                </div>
                <div>{item[1].statusCode}</div>
                <div className="char-limit">{checkType(item[1].consignee, item[1].consignor)}</div>
                <div>{item[1].m}</div>
                <div className="char-limit">{item[1].custRefType}</div> 
                <div>{item[1].itemNo}</div>
                <div>{item[1].ciBl}</div>
                <div>{item[1].ciCust}</div>
                <div>{item[1].wBl}</div>
                <div>{item[1].wCust}</div>
                <div>{item[1].trnsDocType}</div>
                <div className="char-limit">{item[1].migResponsible}</div> 
                <div>{item[1].customsStatus}</div>
                <div>{item[1].customsData}</div>
                <div className="char-limit">{item[1].containerNote}</div>
                <div>{item[1].custRefNote}</div>
                <div>{item[1].discReason}</div>
                <div>{item[1].skatManifestStatus}</div>
                <div>{checkType(item[1].deliveryPlace, item[1].authorityNote)}</div>
                {show === true && DocKey === item[0]? (<Popup doc={item} show={show} onClose={closePopup} folder={documents} Pod={item[1].pod}/>) : ("")} 
            </div>
        )))
    }

    const DocHeaders = () => {
        const headers = ["CDC Status", "B/L", "Container", "L/R", "Vet", "Pol/Pod", "Cust Ref", "Status Code", checkType("Consignee", "Consignor"), "M", "Cust Ref Type", "Item No", "CI BL", "CI Cust", "W BL", "W Cust", "Trns Doc Type", "MIG Responsible", "Customs Status", "Customs Data", "Container Note", "Cust Ref Note", "Disc Reason", "SKAT Manifest Status", checkType("Delivery Place", "Authority Note")];
        return (
            <div className="docs-header-box">
            {headers.map((header, index) => (
                <div key={header+index} className="char-limit">{header}</div>
            ))}
            </div>
        );
    };

    return (
        <div className="docs-box">
            <DocHeaders />
            <DocContents />
        </div>
    );
}