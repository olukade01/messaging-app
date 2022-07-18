import styled from "styled-components";

const Input = styled.input`
  font-size: 16px;
  margin-top: 8px;
  /* background-color: ${({ bg }) => bg || "#fff"}; */
  border: 1px solid grey;
  border-radius: 5px;
  outline: none;
  padding: 10px 0 10px 10px;
`;

const InputField = ({ inputName, onChange, placeholder, password }) => {
  return (
    <Input
      // bg={bg}
      placeholder={placeholder}
      name={inputName}
      onChange={onChange}
      required
      type={password ? "password" : "text"}
    />
  );
};

export default InputField;
