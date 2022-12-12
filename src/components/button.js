import styled from "styled-components";
const Button = ({
  text,
  width,
  color,
  fcolor,
  onClick,
  border,
  fsize,
  disabled,
  radius,
  padding,
}) => {
  return (
    <ButtonWrapper
      width={width}
      color={color}
      fcolor={fcolor}
      onClick={onClick}
      border={border}
      fsize={fsize}
      disabled={disabled}
      radius={radius}
      padding={padding}
    >
      {text}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  cursor: pointer;
  border: ${(props) => (props.border ? props.border : "none")};
  background: ${(props) =>
    props.color
      ? props.color
      : "linear-gradient(90deg, #b224ef 0%, #7579ff 100%)"};
  border-radius: ${(props) => (props.radius ? props.radius : "12px")};
  padding: ${(props) => (props.padding ? props.padding : "10px 30px")};
  color: ${(props) => (props.fcolor ? props.fcolor : "#ffffff")};
  font-weight: 700;
  font-size: ${(props) => (props.fsize ? props.fsize : "14px")};
  width: ${(props) => props.width};
`;
export default Button;
