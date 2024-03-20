import styled from "styled-components";

function Button({ className, children, handleClick }) {
  return (
    <CustomButton className={className} onClick={handleClick}>
      {children}
    </CustomButton>
  );
}

const CustomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 35px;
  margin: 0;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 3px;

  font-size: 1rem;
  font-weight: bold;
  background-color: #616264;
  color: #fff;
`;

export default Button;
