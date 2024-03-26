import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import Logo from "../../../../shared/components/Logo";

export default function MobileRootNavbar(): JSX.Element {
  const redirect = useNavigate();
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full">
        <section className="relative w-full bg-bg-secondary">
          <div className="flex justify-between p-3">
            <span className="material-symbols-outlined text-4xl" onClick={() => setOpen(!isOpen)}>
              {isOpen ? "close" : "menu"}
            </span>
            <section>
              <Button className="secondary" onClick={() => redirect("/auth/login")}>
                Login
              </Button>
              <Button className="primary" onClick={() => redirect("/auth/register")}>
                Anmelden
              </Button>
            </section>
          </div>
          <menu
            className={`absolute flex flex-col justify-center items-center bg-bg-secondary w-full p-3 transition-all duration-500 rounded-b-md ${
              isOpen ? "left-0" : "-left-full"
            }`}
          >
            <li className="my-1" onClick={() => setOpen(!isOpen)}>
              <Link
                to="/"
                className="hover:drop-shadow-primary focus:drop-shadow-primary transition-all duration-4 00"
              >
                <Logo maxHeight="50px" maxWidth="150px" />
              </Link>
            </li>
            <li className="text-xl my-1">
            <Link to="/faq" className="hover:text-primary focus:text-primary">
              FAQ
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
        </section>
      </nav>
    </>
  );
}
