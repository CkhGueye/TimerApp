import "./styles.css";
export default function Index({
  isSession,
  isRunning,
  minutes,
  seconds,
  circleRef,
  animationDuration,
  minEnSec,
}) {
  return (
    <div id="timer-label">
      <div className="circle">
        <div className="inner-shadow">
          <span>{isSession ? "Session" : "Break"}</span>
          <div id="time-left">
            {String(minutes).padStart(2, "0") +
              ":" +
              String(seconds).padStart(2, "0")}
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px">
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#DA22FF" />
              <stop offset="100%" stopColor="#9733EE" />
            </linearGradient>
          </defs>
          <circle
            ref={circleRef}
            className={`${isRunning ? "" : "paused"}`}
            cx="100"
            cy="100"
            r="90"
            strokeLinecap="round"
            strokeDashoffset={minEnSec * (565.2 / (animationDuration * 60))}
          />
        </svg>
      </div>
    </div>
  );
}
