import { useParams } from "react-router-dom";

const Day = () => {
  const { day } = useParams();

  return <div>{day}</div>;
};

export default Day;
