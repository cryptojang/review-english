import { Link } from "react-router-dom";
import englishData from "../englishData.json";
import MainCard from "../components/MainCard";

const Main = () => {
  return (
    <div className="bg-green-100 min-h-screen max-w-screen-md mx-auto px-8  pt-20">
      <h1 className="text-center text-3xl font-bold text-green-800 mb-12">
        블록체인 개발자 기술면접 준비하기
      </h1>
      <ul>
        {englishData.map((v, i) => (
          <MainCard key={i} title={v.title} day={v.day} />
        ))}
      </ul>
    </div>
  );
};

export default Main;
