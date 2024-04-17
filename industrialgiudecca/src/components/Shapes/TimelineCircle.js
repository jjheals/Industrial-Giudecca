import '../../css/components/TimelineCircle.css';

  // React component
  export default function TimelineCircle({ timeperiodYear, timeperiodDescription }) {
    return (
        <div className="circle">
            <p className='timeperiod-year'>{ timeperiodYear }</p>
            <p className='timeperiod-description'>{ timeperiodDescription }</p>
        </div>
    );
  }
  