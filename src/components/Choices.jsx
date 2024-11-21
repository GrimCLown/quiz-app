import React from "react";

const Choices = ({ letter }, { answer }) => {
  return (
    <div>
      <p>A.{letter}</p>
      <p>the correct answer{answer}</p>
    </div>
  );
};

export default Choices;
