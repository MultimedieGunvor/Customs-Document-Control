
export default function Sums ({documents, sums}) {
    const CDC = Object.entries(documents.docs);
    console.log("CDC :", CDC);
    let CONTAINERS = [];
    CDC.forEach(element => CONTAINERS.push(element[1].container));
    console.log("CONTAINERS: ", CONTAINERS);

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