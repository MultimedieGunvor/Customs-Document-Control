import { useLocation } from "react-router-dom";

export default function ManifestsPage() {
    const location = useLocation();
    console.log("location: ", location);
    const {state} = location;
    console.log("state ", state);

    return (
        <div>
            Insert export/import documents here
        </div>
    );
}