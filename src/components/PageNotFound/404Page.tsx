import { Link } from "react-router-dom";
import Button from "../button/Button";

export default function PageNotFound() {
    return (
        <div className="flex flex-col gap-5 text-center text-3xl text-white font-bold items-center">
            <p className="animate-pulse">
                404 Error
            </p>
            <p className="animate-pulse">Page Not Found :(</p>
            <Link to={"/"}>
                <Button className="text-xl w-60" btnText="Перезагрузить" />
            </Link>
        </div>
    );
}