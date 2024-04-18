
import '../../css/components/TimelineLine.css';
import TimelineTriangle from './TimelineTriangle';

  // React component
  export default function TimelineLine({ length }) {
    return (
        <div className='timeline-line' style={{ width: length }}>
            <hr className='timeline-line-hr' ></hr>
            <TimelineTriangle />
        </div>
    );
  }
  