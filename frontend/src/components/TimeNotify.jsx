/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MemoizedCustomModal } from "./modal/CustomModal";

const TimeNotify = ({
  notificationCount,
  handleTomorrowClick,
  setTaskNotifications,
}) => {
  const [pomodoroTimer, setPomodoroTimer] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isPaused, setIsPaused] = useState(true);

  // Function to handle starting and pausing the timer
  const handleTimerStartPause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  // Function to handle resetting the timer
  const handleTimerReset = () => {
    setIsWorking(true);
    setSecondsLeft(25 * 60);
    setIsPaused(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setSecondsLeft((prevSecondsLeft) => {
          if (prevSecondsLeft <= 0) {
            // Switch between work and break sessions
            setIsWorking((prevIsWorking) => !prevIsWorking);

            // Set the next session duration (25 minutes for work, 5 minutes for break)
            const nextDuration = isWorking ? 5 * 60 : 25 * 60;
            return nextDuration;
          }
          return prevSecondsLeft - 1;
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused, isWorking]);

  const handleOnSetTimer = () => {
    setPomodoroTimer((prevShowModal) => !prevShowModal);
  };

  const handleNotificationClick = () => {
    // Set notification modal open state to true and reset the notification count to 0
    setTaskNotifications((prevNotifications) => ({
      ...prevNotifications,
      isModalOpen: true,
      count: 0,
    }));
  };

  return (
    <div className="timer flex flex-wrap gap-2 py-4">
      <span className="active">Today</span>
      <span className="" onClick={handleTomorrowClick}>
        Tomorrow
      </span>
      <div className="circle flex items-center gap-2">
        <span className="" onClick={handleOnSetTimer}>
          <i className="fa-solid fa-clock"></i>
        </span>
        <span className="relative" onClick={handleNotificationClick}>
          <i className="fa-solid fa-bell"></i>

          {notificationCount.count > 0 && (
            <div className="bg-green-400 w-5 h-5 rounded-full text-center absolute text-xs -right-1 -top-1 z-50">
              {notificationCount.count}
            </div>
          )}
        </span>
      </div>
      <>
        {notificationCount.isModalOpen && (
          <MemoizedCustomModal
            onClose={() =>
              setTaskNotifications((prevNotifications) => ({
                ...prevNotifications,
                isModalOpen: false,
              }))
            }
          >
            <div className="w-full min-h-[20vh] flex items-start justify-center flex-col">
              <h3>New Item Added</h3>
              <p>Title: {notificationCount.newTask?.task}</p>
              <p>
                Date to be completed on:{" "}
                {"n/a" || notificationCount.newTask?.date}
              </p>
            </div>
          </MemoizedCustomModal>
        )}
      </>
      {pomodoroTimer && (
        <div className="timer flex flex-wrap gap-2 py-4">
          <span
            className={isWorking ? "active" : ""}
            onClick={() => setIsWorking(true)}
          >
            Work
          </span>
          <span
            className={!isWorking ? "active" : ""}
            onClick={() => setIsWorking(false)}
          >
            Break
          </span>
          <div
            className="circle flex items-center gap-2"
            onClick={handleTimerStartPause}
          >
            <span className="">
              <i className="fa-solid fa-clock"></i>
            </span>
            <span className={isPaused ? "active" : ""}>
              {isPaused ? "Start" : "Pause"}
            </span>
          </div>
          <div
            className="circle flex items-center gap-2"
            onClick={handleTimerReset}
          >
            <span className="">Reset</span>
          </div>
          <div
            className={`circle flex items-center gap-2 ${isWorking ? "" : ""}`}
          >
            <span className="">
              {Math.floor(secondsLeft / 60)
                .toString()
                .padStart(2, "0")}
              :{(secondsLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeNotify;
