import { Link } from "react-router-dom";
import Logo from "../../../../shared/components/Logo";
import { BREAKPOINTS } from "../../../../shared/constants/breakpoints";

export default function RootFooter(): JSX.Element {
  return (
    <>
      <footer className="bg-bg-secondary m-5 p-5 rounded-lg flex flex-col justify-center items-center ">
        <section
          className={
            window.innerWidth >= BREAKPOINTS.md
              ? "flex justify-evenly items-center w-full my-2"
              : ""
          }
        >
          <Logo maxHeight="70px" maxWidth="200px" />

          <section className={ `flex my-2 ${window.innerWidth >= BREAKPOINTS.md ? "justify-evenly w-1/2" : "flex-col"}`}>
            {/* Navigation Links */}
            <section className="my-2">
              <p className="underline opacity-50 underline-offset-4">Navigation</p>
              <menu className="text-left my-2 text-xl">
                <li>
                  <Link to="/" className="hover:text-primary active:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-primary active:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-primary active:text-primary">
                    Über uns
                  </Link>
                </li>
                <li>
                  <Link to="/memberships" className="hover:text-primary active:text-primary">
                    Memberships
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-primary active:text-primary">
                    Dashboard
                  </Link>
                </li>
              </menu>
            </section>

            {/* Rechtliche Links */}
            <section className="my-2">
              <p className="underline opacity-50 underline-offset-4">Rechtliches</p>
              <menu className="text-left my-2 text-xl">
                <li>
                  <Link to="/imprint" className="hover:text-primary active:text-primary">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-primary active:text-primary">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-primary active:text-primary">
                    AGB
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary active:text-primary">
                    Kontakt
                  </Link>
                </li>
              </menu>
            </section>

            {/* Account Links */}
            <section className="my-2">
              <p className="underline opacity-50 underline-offset-4">Account</p>
              <menu className="text-left my-2 text-xl">
              <li>
                  <Link to="/auth/login" className="hover:text-primary active:text-primary">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" className="hover:text-primary active:text-primary">
                    Registrieren
                  </Link>
                </li>
                <li>
                  <Link to="/auth/forgot-password" className="hover:text-primary active:text-primary">
                    Passwort vergessen
                  </Link>
                </li>
                <li>
                  <Link to="/auth/resend-verification-email" className="hover:text-primary active:text-primary">
                    Verifizierung erneut senden
                  </Link>
                </li>
              </menu>
            </section>
          </section>
        </section>

        {/* Divider */}
        <div className="w-full bg-secondary h-[.1rem] opacity-50 my-2"></div>

        {/* Foot Note */}
        <section className="w-full flex flex-col justify-start">
          <p className="">
            &copy; {new Date().getFullYear()} <span className="font-bold">Brain Blitz</span>
          </p>
          <p>Website made with ❤ by Philipp Millner</p>
        </section>
      </footer>
    </>
  );
}
