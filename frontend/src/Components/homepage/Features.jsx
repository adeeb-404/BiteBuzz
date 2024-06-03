import Card from "../../Customs/Card";

function Features() {
  return (
    <section id="features" className=" cust-text md:pt-4 p-2">
      <h1 className=" text-4xl md:text-5xl font-semibold p-2 md:p-16 md:pb-0 ">
        Features
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}

export default Features;
