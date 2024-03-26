interface WhyCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function WhyCard(props: WhyCardProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center bg-primary-light p-5 my-2 lg:mx-5 rounded-lg min-h-[350px] w-full">
      <span className="material-symbols-outlined text-6xl">{props.icon}</span>
      <h3 className="text-xl font-bold mt-4 border-b-8 border-accent-light text-center w-3/4">{props.title}</h3>
      <p className="text-center mt-4">{props.description}</p>
    </div>
  );
}
