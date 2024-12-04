

interface Props {
  titleH1: string;
  titleP: string;
  titleSpan: string;
}

function TitleForm(props: Props) {
  const { titleH1, titleP, titleSpan } = props;

  return (
    <>
      <h1 className="text-5xl font-black text-white">{titleH1}</h1>
      <p className="text-2xl font-light text-white mt-5">
        {titleP}
        <span className=" text-fuchsia-500 font-bold"> {titleSpan}</span>
      </p>
    </>
  );
}

export default TitleForm;
