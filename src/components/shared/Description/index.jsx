import React from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import PropTypes from "prop-types";

function Description({ className, text }) {
  return (
    <StyledSpan className={className}>
      {text.split("\\n").map(txt => (
        <React.Fragment key={nanoid(10)}>
          {txt}
          <br />
        </React.Fragment>
      ))}
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  display: block;

  color: #495057;
  font-size: 1rem;
  text-align: center;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

Description.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Description;
