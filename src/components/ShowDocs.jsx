
export default function ShowDocs ({documents, docs}) {
    console.log("docs: ", docs);
    const DOCS = Object.entries(docs);
    console.log("DOCS", DOCS);

    function getCustRefs(obj) {
        const values = Object.values(obj);
        console.log(values);
        return values.join(" ");
    }
    return (
        <div className="docs-box">
            <div className="docs-header-box">
                <div className="cdc docs-header">CDC Status</div>
                <div className="bl docs-header">B/L</div>
                <div className="container docs-header">Container</div>
                <div className="lr docs-header">L/R</div>
                <div className="vet docs-header">Vet</div>
                <div className="pol docs-header">Pol/Pod</div>
                <div className="custRef docs-header">Cust Ref</div>
                <div className="status-code docs-header">Status Code</div>
                {documents.type === "import" ? (
                <div className="consignee-consignor docs-header">Consignee</div>) : (
                <div className="consignee-consignor docs-header">Consignor</div>)}
                <div className="m docs-header">M</div>
                <div className="custRefType docs-header">Cust Ref Type</div>
                <div className="itemNo docs-header">Item No</div>
                <div className="ciBl docs-header">CI BL</div>
                <div className="ciCust docs-header">CI Cust</div>
                <div className="wBl docs-header">W BL</div>
                <div className="wCust docs-header">W Cust</div>
                <div className="trnsDocType docs-header">TrnsDocType</div>
                <div className="mig docs-header">MIG Responsible</div>
                <div className="customsStatus docs-header">Customs Status</div>
                <div className="customsData docs-header">Customs Data</div>
                <div className="containerNote docs-header">Container Note</div>
                <div className="custRefNote docs-header">Cust Ref Note</div>
                <div className="discReason docs-header">Disc Reason</div>
                <div className="skat docs-header">SKAT Manifest Status</div>
                {documents.type === "import" ? (
                <div className="delivery docs-header">Delivery Place</div>) : (
                <div className="authority docs-header">Authority Note</div>)}
            </div>
            {DOCS.map((DOC) => (
                <div className="docs-content"
                key={DOC[0]}
                > 
                    <div>{DOC[1].cdcStatus}</div>
                    <div>{DOC[0]}</div>
                    <div>{DOC[1].container}</div>
                    <div>{DOC[1].lr}</div>
                    <div>{DOC[1].vet}</div>
                    <div>{DOC[1].pol}</div> {/* Call pol/pod filter function here */}
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
                </div>
            ))}
        </div>
    );
}