import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

interface LoginInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type: string;
}

const LoginInput: FC<LoginInputProps> = (props) => {
  const { name, label, placeholder, type } = props;
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="border-gray-200 py-5 px-4 focus-visible:ring-low_blue focus-visible:border-low_blue
"
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LoginInput;
