import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Form } from "../ui/form";
import LoginInput from "../input/LoginInput";

type LoginData = {
  id: string;
  password: string;
};

const LoginForm = () => {
  const form = useForm<LoginData>({
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const handleLoginButton = (values: LoginData) => {
    console.log(values);
  };
  return (
    <Card className="w-[600px] bg-white py-8 px-0 mx-4">
      <CardContent>
        <div className="font-semibold text-3xl text-center ">로그인</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLoginButton)}>
            <LoginInput
              name={"id"}
              label="아이디"
              placeholder="id"
              type="text"
            />
            <LoginInput
              name={"password"}
              label="비밀번호"
              placeholder="password"
              type="password"
            />
            <div className="mt-10">
              <Button
                type="submit"
                className="w-full py-6 bg-blue hover:bg-low_gray"
              >
                로그인
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
