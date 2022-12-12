import styled from "styled-components";
const ImgSize = ({
  url,
  width,
  height,
  radius,
  onClick,
  border,
  objectfit,
  maxwidth,
}) => {
  return (
    <WrapperImage
      src={url}
      width={width}
      height={width}
      radius={radius}
      onClick={onClick}
      border={border}
      objectfit={objectfit}
      maxwidth={maxwidth}
    />
  );
};
const WrapperImage = styled.img`
  width: ${(props) => (props.width ? props.width : "50px")};
  border: ${(props) => props.border};
  height: ${(props) => (props.height ? props.height : "50px")};
  border-radius: ${(props) => (props.radius ? props.radius : "200px")};
  object-fit: ${(props) => (props.objectfit ? props.objectfit : "cover")};
  max-width: ${(props) => props.maxwidth};
`;
export default ImgSize;
