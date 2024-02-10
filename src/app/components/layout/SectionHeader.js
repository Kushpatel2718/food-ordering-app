export default function SectionHeader({ subHeader, mainHeader }) {
  return (
    <>
      <h3
        className="uppercase text-center
         text-gray-500 font-semibold"
      >
        {subHeader}
      </h3>
      <h2 className="text-primary text-center font-bold italic text-4xl">
        {mainHeader}
      </h2>
    </>
  );
}
