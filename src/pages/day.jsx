import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";

const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisibile, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { day } = useParams();

  const onClickPrev = () => {
    currentPage === 0
      ? setCurrentPage(dailyData.questions.length - 1)
      : setCurrentPage(currentPage - 1);
  };

  const onClickNext = () => {
    if (currentPage === dailyData.questions.length - 1) {
      setCurrentPage(0);
      // console.log(currentPage);
    } else {
      setCurrentPage(currentPage + 1);
      // console.log(currentPage);
    }
  };

  useEffect(() => {
    englishData.map((v, i) => {
      if (v.day === +day) {
        setDailyData(v);
      }
    });
  }, [day]);

  useEffect(() => console.log(dailyData), [dailyData]);

  if (!dailyData) return <div>Loading...</div>; ///와 이거다 내가 해결하지 못했던 거. 값이 들어오면 화살표 함수 다시 렌더링 되면서 아래 return 실행.

  /* 대신 사용할 수 있는 코드. 이 경우 map return 없어도 됨?
  useEffect(() => {
   englishData.forEach((v, i) => {
     if (v.day === +day) {
       setDailyData(v);
     }
   });
 }, [day]);

 */

  return (
    <div className="bg-green-100 container relative">
      <div className="absolute top-0 left-0 p-8">
        <Link to={"/"} className=" hover:text-pink-600 ">
          <FaHome size={36} />
        </Link>
      </div>
      <h1 className="text-center text-2xl font-semibold text-green-800 mb-12">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mb-4">
        <span className="mr-1">Q</span>
        <span className="mr-2">{currentPage + 1}</span>

        {dailyData.questions[currentPage].Question}
      </div>
      <div
        className={`${!isVisibile && "bg-black"} bg-white rounded-xl h-24 p-4`}
      >
        {dailyData.questions[currentPage].Answer}
      </div>
      <div className="mt-4">
        <button
          className="btn-style hover:bg-black hover:text-white"
          onClick={onClickPrev}
        >
          Prev
        </button>
        <button
          className="btn-style ml-2 hover:bg-black hover:text-white"
          onClick={onClickNext}
        >
          Next
        </button>
        <button
          className="btn-style ml-2 hover:bg-black hover:text-white"
          onClick={() => setIsVisible(!isVisibile)}
        >
          {isVisibile ? "가리기" : "답변 보기"}
        </button>
        <button className="btn-style ml-2 hover:bg-black hover:text-white">
          Sound
        </button>
      </div>
    </div>
  );
};

export default Day;
