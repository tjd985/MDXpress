import styled from "styled-components";
import PropTypes from "prop-types";

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
  margin: 0 2px 0 0;
  padding: 10px;
  border: none;
  border-radius: 10px 10px 0 0;

  font-size: 1rem;
  font-weight: bold;
  background-color: #616264;
  color: #ffffff;
  cursor: pointer;

  &:active {
    background-color: #1c1d21;
    color: #ffffff;
  }
`;

Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
