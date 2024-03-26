import Button from "../../../../../../shared/components/Button";

export default function EndSection(): JSX.Element {

    function onClick() {
        window.open("https://linktr.ee/BrainBlitz", "_blank");
    }

  return (
    <>
      <section className="mx-5 my-20 flex flex-col justify-center items-center">
        <h1 className="animated-bg text-4xl font-bold md:text-5xl lg:text-8xl p-2">Wissenshungrig?</h1>
        <p className="text-center text-xl my-2">Entdecke mehr auf unseren Social-Media-Seiten!</p>
        <Button onClick={() => onClick()} className="primary">Trette der Community bei</Button>
      </section>
    </>
  );
}
