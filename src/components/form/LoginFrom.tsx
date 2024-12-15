"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Form } from "../ui/form";
import LoginInput from "../input/LoginInput";
import { ILoginResponse, LoginInputProps } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/authApi";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  //    API Login Mutation
  const loginMutation = useMutation({
    mutationFn: (userData: LoginInputProps) => loginUser(userData),
    onSuccess: (data) => {
      //로그인 성공시
      const accessToken = data.data.accessToken;
      //토큰 로컬스토리지에 저장
      localStorage.setItem("accessToken", accessToken);
      router.push("/scrap");
    },
    onError: (error: AxiosError) => {
      //로그인 실패시
      if (error.response) {
        const errorMsg = error.response.data as ILoginResponse;
        setError(errorMsg.msg);
      } else {
        //네트워크 에러
        setError("알 수 없는 네트워크 에러입니다.");
      }
    }
  });

  const form = useForm<LoginInputProps>({
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      admUserId: "",
      userPw: ""
    }
  });

  //로그인 버튼 클릭시
  const handleLoginButton = (values: LoginInputProps) => {
    loginMutation.mutate(values);
  };

  return (
    <Card className="w-[600px] bg-white py-8 px-0 mx-4">
      <CardContent>
        <div className="font-semibold text-3xl text-center ">로그인</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLoginButton)}>
            <LoginInput
              name="admUserId"
              label="아이디"
              placeholder="id"
              type="text"
            />
            <LoginInput
              name="userPw"
              label="비밀번호"
              placeholder="password"
              type="password"
            />
            {/**오류 메세지*/}
            {error ? (
              <div className="text-red-500 text-sm pt-5">{error}</div>
            ) : null}
            {/** 로그인 버튼 */}
            <div className="mt-3">
              <Button
                type="submit"
                className="w-full py-6 bg-blue hover:bg-blue"
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
