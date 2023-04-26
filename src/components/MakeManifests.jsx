
export default function MakeManifests ({manifests}) {
    // --- Make function that counts the docs and stores them in a variable. Just subtract 11 from the length, and the result should be the amount of docs. Also, link this document to the launcher-page ---
    function getDate(date) {
        const jsDate = date.toDate();
        return jsDate.toLocaleDateString();
    }
    return (
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
            {manifests.map(({id, folderNo, date, type, terminalId, primaryMot, refNo, callInfo, canRead}) => (
                <div className={`manifests ${folderNo}-row`}
                key={id}> {/* --- onClick/onDoubleClick leads to export/import page ---*/}
                    <div className={folderNo}>{folderNo}</div>
                    <div className={id}>{id}</div>
                    <div>{getDate(date)}</div>
                    <div className={type}>{type}</div>
                    <div className={terminalId}>{terminalId}</div>
                    <div className={primaryMot}>{primaryMot}</div>
                    <div className={refNo}>{refNo}</div>
                    <div className={callInfo}>{callInfo}</div>
                    <div className={canRead}>{canRead}</div>
                </div>
            ))}
        </div>
    )
}