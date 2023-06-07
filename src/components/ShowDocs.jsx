import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Popup from "./Popup";
import Sums from "./Sums";
// import Hover from "./Hover";

export default function ShowDocs ({documents}) {

    const [content, setContent] = useState([]);
    const [Test, setTest] = useState([]);
    const [show, setShow] = useState(false);
    const [DocKey, setDocKey] = useState();
    const [Selected, setSelected] = useState([]);
    const [sums, setSums] = useState([ // -- index 0 = cibl, index 1 = cicust, index 2 = wbl, index 3 = wcust
        0, 0, 0, 0
    ]);
    // const [hover, setHover] = useState(null);

    function handleSelect(clickItem) {
        const copySelected = [...Selected];
        if (Selected.includes(clickItem)) {
            const index = copySelected.indexOf(clickItem);
            copySelected.splice(index, 1);
            console.log(clickItem, " removed from Selected");
            setSelected(copySelected);
        } else {
            copySelected.push(clickItem);
            console.log(clickItem, " added to Selected");
            setSelected(copySelected);
        }
        console.log("Selected: ", Selected);
    };

    function handleSums(clickItem) {
        let copySums = [...sums];
        if (!Selected.includes(clickItem[0])) {
            copySums[0] = copySums[0] + clickItem[1].ciBl;
            copySums[1] = copySums[1] + clickItem[1].ciCust;
            copySums[2] = copySums[2] + clickItem[1].wBl;
            copySums[3] = copySums[3] + clickItem[1].wCust;
            console.log("sums after addition: ", copySums);
            setSums(copySums);
        } else {
            copySums[0] = copySums[0] - clickItem[1].ciBl;
            copySums[1] = copySums[1] - clickItem[1].ciCust;
            copySums[2] = copySums[2] - clickItem[1].wBl;
            copySums[3] = copySums[3] - clickItem[1].wCust;
            console.log("sums after subtraction: ", copySums);
            setSums(copySums);
        }
    };

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
                const filteredBLs = test.filter((BL) => BL[1].cdcStatus !== "Cancel (8nc)");
                // console.log("filteredBLs: ", filteredBLs);
                // console.log("Fetched manifest-data: ", test); 
                setContent(filteredBLs);
                setTest(test);
            } catch (err) {
                console.log("Error: ", err);
            }
        };
        fetchData();
        window.addEventListener('update', () => {
            fetchData();
        });

    }, [documents.id]);

    window.addEventListener('cancel', () => {
        let showscancel = sessionStorage.getItem('cancel');
        console.log("showscancel", showscancel);
        if (showscancel === "true") {
            setContent(Test);
        } else {
            const filtered = content.filter((BL) => BL[1].cdcStatus !== "Cancel (8nc)");
            setContent(filtered);
        }
    });

    const checkType = (a, b) => {
        // addEventListener
        if (documents.type === "import") { // if (documents.type === "import" && showsnotify === undefined)
            return a
        } else { // else if (documents.type === "export" && showsnotify === undefined)
            return b
        } // else return c
    };

    let showsnotify;
    window.addEventListener('notify', () => {
        showsnotify = sessionStorage.getItem('notify');
        console.log("showsnotify: ", showsnotify);
        return showsnotify;
    });

    const checkNotify = (a, b, c) => {
        // let showsnotify;
        // console.log("showsnotify: ", showsnotify);
        // window.addEventListener('notify', () => {
        //     showsnotify = sessionStorage.getItem('notify');
        //     console.log("showsnotify: ", showsnotify);
        //     return showsnotify;
        // });
        if (documents.type === "import" && !showsnotify) {
            console.log(typeof showsnotify);
            return a
        } else if (documents.type === "import" && showsnotify === false) {
            return a
        } else if (documents.type === "export" && !showsnotify) {
            return b
        } else if (documents.type === "export" && showsnotify === false) {
            return b
        } else {
            return c
        }
    };

    const DocContents = () => {
        return (
        content.map((item) => ( // -- Add grid hoverboxes here? Show based on hover value?
            <div className={Selected.includes(item[0])? "docs-content selected" : "docs-content"}
            key={item[0]}
            onDoubleClick={() => {
                show === false ? setShow(true) : setShow(false)
                getDocKey(item[0])
            }}
            onClick={() => {
                handleSelect(item[0])
                handleSums(item)
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
                <div className="char-limit">{checkType(item[1].consignee, item[1].consignor)}</div> {/* Plus notify party */}
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
        const headers = ["CDC Status", "B/L", "Container", "L/R", "Vet", "Pol/Pod", "Cust Ref", "Status Code", checkNotify("Consignee", "Consignor", "Notify Party"), "M", "Cust Ref Type", "Item No", "CI BL", "CI Cust", "W BL", "W Cust", "Trns Doc Type", "MIG Responsible", "Customs Status", "Customs Data", "Container Note", "Cust Ref Note", "Disc Reason", "SKAT Manifest Status", checkType("Delivery Place", "Authority Note")];
        return ( // Husk notify party i Consignee/consignor!
            <div className="docs-header-box">
            {headers.map((header, index) => (
                <div key={header+index} className="char-limit">{header}</div>
            ))}
            </div>
        );
    };

    return (
        <>
            <div className="docs-box">
                <DocHeaders />
                <DocContents />
            </div>
            <Sums documents={documents} sums={sums}/>
        </>
    );
}