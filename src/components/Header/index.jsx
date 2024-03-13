import styled from "styled-components";

function Header() {
  return <CustomedHeader>MDXpress</CustomedHeader>;
}

const CustomedHeader = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 20px;

  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

export default Header;
