import { Link } from "react-router-dom";

interface Props {
  textButton: string;
  textTitle: string;
  textSubtitle: string;
  to: string;
}

function ButtonNavProject(props: Props) {
  const { textButton, textTitle, textSubtitle, to } = props;
  return (
    <>
      <h1 className="text-5xl font-black">{textTitle}</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">{textSubtitle}</p>

      <nav className="my-5">
        <Link
          to={to}
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        >
          {textButton}
        </Link>
      </nav>
    </>
  );
}

export default ButtonNavProject;
