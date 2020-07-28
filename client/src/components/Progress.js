import React from "react";
import PropTypes from "prop-types";

function Progress({ percentage }) {
  return (
    <div class="progress">
      <div
        class="progress-bar bg-success progress-bar-striped progress-bar-animated"
        role="progressbar"
        style={{width : `${percentage}%`}}
      ></div>
    </div>
  );
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Progress;
