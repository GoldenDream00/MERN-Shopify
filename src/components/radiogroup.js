import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

const ButtonGroup = (props) => {
  const { options, onChange, name } = props;
  const [isSelected, setSelected] = useState(
    options.find((o) => o.default).value
  );
  function onChangeRadio(e) {
    setSelected(e.target.value);
    onChange(e);
  }
  return (
    <ButtonContainer id={props.labelId} onChange={(e) => onChangeRadio(e)}>
      <AnimateSharedLayout>
        {options.map((option) => (
          <React.Fragment key={option.name}>
            <Input
              type="radio"
              id={option.value}
              value={option.value}
              name={name}
              defaultChecked={option.default}
            />
            <InputLabel
              htmlFor={option.value}
              key={option.value}
              initial={false}
              animate={{
                visibility: "visible",
              }}
            >
              {isSelected === option.value && (
                <InputBackground
                  layoutId="radioBackground"
                  animate={{
                    backgroundColor: "#fff",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              {option.name}
            </InputLabel>
          </React.Fragment>
        ))}
      </AnimateSharedLayout>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(motion.div)`
  position: relative;
  grid-column: span 4;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 23px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(30px);
  justify-content: space-around;
  align-items: center;
  input:checked + label {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    color: black;
  }
  input:disabled + label {
    text-decoration: line-through;
    text-decoration-thickness: 2px;
    transition: all 0.6s ease-in-out;
    border: 2px 1px solid white;
    cursor: not-allowed;
  }
  @media (min-width: 768px) {
    height: 100%;
  }
`;
const Input = styled(motion.input)`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  width: 1px;
  border: 0;
  overflow: hidden;
`;
const InputLabel = styled(motion.label)`
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
  text-align: center;
  color: #5d5d5b;

  font-weight: 400;
  border-radius: 6px;
  z-index: 2;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  user-select: none;
  padding: 9px;
  position: relative;
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;
const InputBackground = styled(motion.div)`
  background-color: rgba(255, 252, 255, 1);
  position: absolute;
  top: 3px;
  left: 1px;
  right: 1px;
  bottom: 3px;
  border-radius: 22px;
  z-index: -1;
`;

export default ButtonGroup;
