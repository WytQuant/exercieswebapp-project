import "./Loading.css";
import RingLoader from "react-spinners/RingLoader";

const Loading = ({ title }) => {
  return (
    <div className='content-loading'>
      <RingLoader color={"#CD113B"} loading={true} size={150} />
      <h2 className='loading-text'>{title} are being loaded . . .</h2>
    </div>
  );
};

export default Loading;
