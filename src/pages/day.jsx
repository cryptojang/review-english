import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";
import { FaHome, FaStar } from "react-icons/fa";
import axios from "axios";

console.log(process.env.REACT_APP_API_KEY);

const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisibile, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isImportant, setIsImportant] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

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

  const onClickIsImportant = () => {
    const newIsImportant = isImportant.map((v, i) => {
      if (i === currentPage) {
        console.log(v);

        if (v === true) {
          return false;
        } else {
          return true;
        }
      } else {
        return v;
      }
    });

    setIsImportant(newIsImportant);
  };

  const onClickSound = async () => {
    try {
      setIsLoading(true);

      if (isLoading) return;

      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_API_KEY}`,
        {
          input: {
            text: dailyData.questions[currentPage].Answer,
          },
          voice: {
            languageCode: "en-us",
            name: "en-us-Standard-A",
            ssmlGender: "FEMALE",
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: 1,
            pitch: 1,
          },
        }
      );

      const binaryData = atob(response.data.audioContent); //base64를 atob로 binary 형태로 바꿈

      const byteArray = new Uint8Array(binaryData.length); //binary  파일을 바이트 단위로 쪼개 블롭 하기 쉽게 형태 변환

      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([byteArray.buffer], { type: "audio/mp3" });

      const newAudio = new Audio(URL.createObjectURL(blob));

      document.body.appendChild(newAudio);
      newAudio.play();

      setTimeout(() => setIsLoading(false), 5000);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
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
        <Link to={"/"} className=" hover:text-green-400 ">
          <FaHome size={36} />
        </Link>
      </div>

      <h1 className="text-center text-2xl font-semibold text-green-800 mb-12">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mb-4 text-xl  font-semibold relative">
        <button
          onClick={onClickIsImportant}
          className={` absolute -top-8 left-0 ${
            isImportant[currentPage] && "text-pink-500"
          }`}
        >
          <FaStar />
        </button>
        <span className="mr-1">Q</span>
        <span className="mr-2">{currentPage + 1}</span>

        {dailyData.questions[currentPage].Question}
      </div>
      <div
        className={`${!isVisibile && "bg-black"} ${
          isVisibile && "bg-white text-green-800 font-semibold"
        }  rounded-xl h-24 p-4 text-lg`}
      >
        {dailyData.questions[currentPage].Answer}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="btn-style hover:bg-green-400 hover:border-green-400 hover:text-white"
          onClick={onClickPrev}
        >
          Prev
        </button>
        <div>
          <button
            className="btn-style ml-2 hover:bg-green-400 hover:border-green-400 hover:text-white"
            onClick={() => setIsVisible(!isVisibile)}
          >
            {isVisibile ? "가리기" : "답변 보기"}
          </button>
          <button
            className="btn-style ml-2 hover:bg-green-400 hover:border-green-400 hover:text-white"
            onClick={onClickSound}
          >
            외우기
          </button>
        </div>

        <button
          className="btn-style ml-2 hover:bg-green-400 hover:border-green-400 hover:text-white"
          onClick={onClickNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Day;
