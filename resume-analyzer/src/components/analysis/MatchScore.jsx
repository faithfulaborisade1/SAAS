import React from 'react';
import PropTypes from 'prop-types';

const MatchScore = ({ score }) => {
  // Determine color based on score
  const getScoreColor = (percentage) => {
    if (percentage > 75) return '#10B981'; // Green for high match
    if (percentage > 50) return '#F59E0B'; // Amber for medium match
    return '#EF4444'; // Red for low match
  };

  // Get the description text based on score
  const getScoreDescription = (percentage) => {
    if (percentage > 75) return 'Great match for this position!';
    if (percentage > 50) return 'Decent match, with some gaps.';
    return 'Significant gaps for this role.';
  };

  const scoreColor = getScoreColor(score);
  const description = getScoreDescription(score);

  // Calculate the circumference of the circle
  const radius = 18; // Based on the SVG viewBox size
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the stroke-dasharray offset based on the score percentage
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Match Score</h3>
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            {/* Background circle */}
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
            />
            {/* Foreground circle - the progress indicator */}
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={scoreColor}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>
          {/* Score percentage in the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{score}%</span>
          </div>
        </div>
      </div>
      {/* Description text below the circle */}
      <p className="text-center mt-4 text-gray-600">
        {description}
      </p>
    </div>
  );
};

// PropTypes for type checking
MatchScore.propTypes = {
  score: PropTypes.number.isRequired,
};

// Default props
MatchScore.defaultProps = {
  score: 0,
};

export default MatchScore;