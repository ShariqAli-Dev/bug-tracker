import {
  chakra,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

const CHiOutlineSearch = chakra(HiOutlineSearch);
const initialFormValues = { query: "" };

const QueryForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // filter through something then search it
    // decide what I want the search to be
  };

  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <InputGroup color="primary">
          <Input
            type="text"
            name="query"
            id="query"
            placeholder="Search..."
            onChange={onChange}
            borderColor="tertiary"
          />
          <InputRightElement pointerEvents="none">
            <CHiOutlineSearch color="secondary" />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default QueryForm;
