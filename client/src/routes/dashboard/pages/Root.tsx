import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../../shared/types/User";

export default function DashboardRoot() {

    const { user } = useOutletContext<UserContext>();
    console.log(user);
    const { first_name, last_name } = user;

    return (
        <div>
            <h1>Welcome {first_name} {last_name}!</h1>
        </div>
    );
}