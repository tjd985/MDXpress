import styled from "styled-components";

function Preview() {
  return <Container>this is Preview</Container>;
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Preview;
