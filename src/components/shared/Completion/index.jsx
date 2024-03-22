import styled from "styled-components";

import Description from "../Description";

function Completion({
  imageSrc,
  title,
  description,
  handleClick,
  linkURL = null,
}) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <CompleteImage src={imageSrc} alt="complete image" />
      <Description text={description} />
      {linkURL && (
        <LinkSection>
          your Link <em>{linkURL}</em>
        </LinkSection>
      )}
      <CloseButton onClick={handleClick}>Okay</CloseButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
`;

const Title = styled.h1`
  margin-bottom: 20px;

  color: #000000;
`;

const CompleteImage = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

const LinkSection = styled.div`
  margin-top: 20px;

  text-align: center;
  color: #000000;

  em {
    display: block;
    padding: 10px;
    border-radius: 10px;

    background-color: #f0e68c;
    font-weight: bold;
  }
`;

const CloseButton = styled.button`
  min-width: 300px;
  min-height: 50px;
  padding: 12px 24px;
  border: 2px solid #000000;
  border-radius: 4px;
  margin-top: 50px;

  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

export default Completion;
