interface StepProps {
  step: number;
  title: string;
  description: string;
}

export default function Step(props: StepProps): JSX.Element {
  return (
    <div className="flex justify-start items-start my-2 p-4">
      <div className="text-accent text-3xl font-semibold h-full flex justify-start items-start mr-3">
        {props.step}
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-lg text-left font-bold mt-2 border-b-4 border-accent-light">
          {props.title}
        </h3>
        <p className="mt-4 leading-8">{props.description}</p>
      </div>
    </div>
  );
}
