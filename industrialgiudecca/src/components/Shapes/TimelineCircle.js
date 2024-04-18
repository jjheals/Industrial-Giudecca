import '../../css/components/TimelineCircle.css';

  // React component
  export default function TimelineCircle({ timeperiodYear, timeperiodDescription, circleColor, textColor }) {
    return (
        <div className="circle" style={{ borderColor: circleColor, backgroundColor: circleColor }}>
            <p className='timeperiod-year' style={{ color: textColor }}>{ timeperiodYear }</p>
            <p className='timeperiod-description' style={{ color: textColor }}>{ timeperiodDescription }</p>
        </div>
    );
  }
  