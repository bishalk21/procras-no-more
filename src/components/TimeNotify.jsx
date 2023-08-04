/* eslint-disable react/prop-types */
const TimeNotify = ({ handleTomorrowClick }) => {
  return (
    <div className="timer flex flex-wrap gap-2 py-4">
      <span className="active">Today</span>
      <span className="" onClick={handleTomorrowClick}>
        Tomorrow
      </span>
      <div className="circle flex items-center gap-2">
        <span className="">
          <i className="fa-solid fa-clock"></i>
        </span>
        <span className="">
          <i className="fa-solid fa-bell"></i>
        </span>
      </div>
    </div>
  );
};

export default TimeNotify;
