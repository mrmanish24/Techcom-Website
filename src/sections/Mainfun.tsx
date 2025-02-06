import PCBuilder2 from "./Pcbuilder2";

const Mainfun = () => {
  return (
    <section
      id="PCbuilder"
      className="bg-gradient-to-b from-[#ffffff] to-[#D2DCFF] py-24"
    >
      <div className="pcbuild-container container">
        <h2 className="heading-color text-3xl text-center">
          Assemble Your Dream Machine
        </h2>
        <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-6">
          Pick your components, personalize your build, and send your request.
          We’ll handle the rest.
        </p>
      </div>
      <PCBuilder2 />
    </section>
  );
}
export default Mainfun
