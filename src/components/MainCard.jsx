import { Link } from "react-router-dom";

const MainCard = ({ title, day }) => {
  return (
    <Link to={`/${day}`}>
      <li className="bg-white w-full py-4 rounded-xl pl-4 shadow-xl  mb-4 text-xl hover:text-white hover:bg-green-700">
        <span className="bg-red-100 py-2 px-2 rounded-lg text-green-800 font-semibold mr-2  ">
          Day {day}
        </span>
        <span>{title}</span>
      </li>
    </Link>
  );
};

export default MainCard;
