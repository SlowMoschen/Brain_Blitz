import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import Logo from "../../../../shared/components/Logo";

export default function RootNavbar(): JSX.Element {
  const redirect = useNavigate();

  return (
    <>
      <nav className="fixed w-full bg-bg-secondary flex justify-between p-3">
        <menu className="flex items-center justify-evenly w-3/4">
          <li className="my-1">
            <Link
              to="/"
              className="hover:drop-shadow-primary focus:drop-shadow-primary transition-all duration-4 00"
            >
              <Logo maxHeight="50px" maxWidth="150px" />
            </Link>
          </li>
          <li className="text-xl my-1">
            <Link to="/faq" className="hover:text-primary focus:text-primary">
              Wie funktioniert Brain Blitz?
            </Link>
          </li>
          <li className="text-xl my-1">
            <Link to="/memberships" className="hover:text-primary focus:text-primary">
              Memberships
            </Link>
          </li>
          <li className="text-xl my-1">
            <Link to="/about" className="hover:text-primary focus:text-primary">
              Über uns
            </Link>
          </li>
        </menu>
        <div className="flex justify-between">
          <Button className="secondary" onClick={() => redirect("/auth/login")}>
            Login
          </Button>
          <Button className="primary" onClick={() => redirect("/auth/register")}>
            Anmelden
          </Button>
        </div>
      </nav>
    </>
  );
}
