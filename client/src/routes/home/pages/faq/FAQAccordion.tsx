import clsx from "clsx";
import useToggle from "../../../../shared/hooks/useToggle";
import useScreenSize from "../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../shared/constants/breakpoints";

interface AccordionProps {
  title: string;
  content: string;
}

export default function FaqAccordion({ title, content }: AccordionProps) {
  const [isOpen, setIsOpen] = useToggle();
  const screenSize = useScreenSize();

  return (
    <li
      className="list-none bg-bg-secondary rounded-lg p-5 cursor-pointer max-w-5xl my-5"
      onClick={() => setIsOpen()}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl">{title}</h2>
        <span
          className={clsx(
            'material-symbols-outlined text-3xl transition-all duration-300 ease-in-out select-none text-accent',
            isOpen && 'rotate-45'
          )}
        >
          add
        </span>
      </div>
      <div
        className={clsx(
            'max-h-0 overflow-hidden transition-max-height duration-1000 mt-5 pt-1 leading-7 tracking-wide border-t border-accent-light',
            isOpen && screenSize.width <= BREAKPOINTS.sm && 'max-h-64',
            isOpen && screenSize.width > BREAKPOINTS.sm && 'max-h-40'
        )}
      >
        <p>{content}</p>
      </div>
    </li>
  );
}
