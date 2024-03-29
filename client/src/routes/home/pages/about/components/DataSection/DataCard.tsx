import clsx from "clsx";
import { ReactNode } from "react";
import CountUp from "react-countup";
import useScreenSize from "../../../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../../../shared/constants/breakpoints";
import { TIMES } from "../../../../../../shared/constants/times";

interface DataCardProps {
    containerProps: ContainerProps;
    counterProps: CounterProps;
    textProps: textProps;
}

interface ContainerProps {
    className?: string;
    children?: ReactNode;
    flexCol: boolean;
}

interface CounterProps {
    className?: string;
    countEnd: number;
}

interface textProps {
    className?: string;
    content: string;
}

export default function DataCountCard({ containerProps, counterProps, textProps }: DataCardProps) {

    const screenSize = useScreenSize();

    return (
        <div
            className={clsx(
              "p-5 rounded-md h-52 flex justify-center items-center",
              containerProps.className,
              containerProps.flexCol && screenSize.width <= BREAKPOINTS.sm && "flex-col"
            )}
          >
            <CountUp
              end={counterProps.countEnd}
              duration={TIMES.COUNT_UP_DURATION}
              delay={TIMES.COUNT_UP_DELAY}
              className={`text-5xl font-bold md:text-6xl lg:text-7xl mx-3 ${counterProps.className}`}
            />
            <p className={`text-xl mx-3 md:text-2xl lg:text-4xl ${textProps.className}`}>
              {textProps.content}
            </p>
          </div>
    );

}