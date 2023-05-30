
export default function Sums ({documents, sums}) {
    const CDC = Object.keys(documents); // Then use CDC.length in the return
    const containers = Object.entries(documents);
    let CONTAINERS = [];
    containers.forEach(element => CONTAINERS.push(element.docs.containers)); // Then use CONTAINERS.length in the return

    return (
        <div className="btm-functions">
            <div>
                <legend>CDCs found</legend>
                <div>{CDC.length}</div>
            </div>
            <div>
                <legend>Containers</legend>
                <div>{CONTAINERS.length}</div>
            </div>
            <div>
                <legend>Sum CI BL</legend>
                <div>{sums[0]}</div>
            </div>
            <div>
                <legend>Sum CI Cust</legend>
                <div>{sums[1]}</div>
            </div>
            <div>
                <legend>Sum W BL</legend>
                <div>{sums[2]}</div>
            </div>
            <div>
                <legend>Sum W Cust</legend>
                <div>{sums[3]}</div>
            </div>
        </div>
    )
}