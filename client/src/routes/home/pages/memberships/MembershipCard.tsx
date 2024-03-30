import clsx from "clsx";
import useScreenSize from "../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../shared/constants/breakpoints";
import Button from "../../../../shared/components/Button";

interface MembershipCardProps {
  secondaryBGColor?: boolean;
  title: string;
  price: string;
  features: string[];
  btnOnClick: () => void;
  btnText: string;
  isAvailable: boolean;
}

export default function MembershipCard({
  secondaryBGColor = false,
  title,
  price,
  features,
  btnOnClick,
  btnText,
  isAvailable,
}: MembershipCardProps) {
  const screenSize = useScreenSize();

  if (!isAvailable) {
    return (
      <div
        className={`${
          secondaryBGColor ? "bg-primary-light" : "bg-bg-secondary"
        } flex flex-col justify-center items-center m-5 p-2 rounded-lg min-h-96`}
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="opacity-50 my-1">{price}</p>
        <p className="text-accent text-center">In Entwicklung</p>
      </div>
    );
  } else {
    return (
      <div
        className={`${
          secondaryBGColor ? "bg-primary-light" : "bg-bg-secondary"
        } flex flex-col justify-center items-center m-5 p-2 rounded-lg min-h-96`}
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="opacity-50 my-1">{price}</p>
        <ul className="list-none">
          {features.map((feature, index) => (
            <li
              key={index}
              className={clsx(
                "flex items-start my-2",
                screenSize.width <= BREAKPOINTS.sm ? "text-sm" : ""
              )}
            >
              <span className="material-symbols-outlined text-accent mr-2">done</span>
              {feature}
            </li>
          ))}
        </ul>
        <Button className="primary my-2" width="250px" onClick={btnOnClick}>
          {btnText}
        </Button>
      </div>
    );
  }
}
