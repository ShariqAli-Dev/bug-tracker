import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";

type InputFieldProps = FieldHookConfig<any> & {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
};

const InputField = (props: InputFieldProps) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        {...field}
        name={props.name}
        id={field.name}
        placeholder={props.placeholder}
        type={props.type}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
