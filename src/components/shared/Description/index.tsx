import React, { ReactNode } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";

interface DescriptionType {
  className: string;
  text: string;
}

function Description({ className, text }: DescriptionType): ReactNode {
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

export default Description;
