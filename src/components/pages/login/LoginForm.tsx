import React, { FC } from "react";
import { Form } from "radix-ui";
import Link from "next/link";
import { FormErrorMessage } from "@/components/blocks/form/FormErrorMessage";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const LoginForm: FC = () => {
  return (
    <div className="flex-col w-full">
      <Form.Root className="w-full">
        {/* Email */}
        <div className="mb-6">
          <Form.Field className="mb-2.5 grid" name="email">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px]">
                이메일
              </Form.Label>
            </div>

            <Form.Control asChild>
              <input
                className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                type="email"
                required
              />
            </Form.Control>

            <div>
              <FormErrorMessage
                match="valueMissing"
                label="이메일을 입력해주세요"
              />
              <FormErrorMessage
                match="typeMismatch"
                label="이메일 형식을 다시 확인해주세요"
              />
            </div>
          </Form.Field>

          {/* Password */}
          <Form.Field className="grid" name="password">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px]">
                비밀번호
              </Form.Label>
            </div>

            <Form.Control asChild>
              <input
                className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                type="password"
                required
              />
            </Form.Control>

            <div>
              <FormErrorMessage
                match="valueMissing"
                label="비밀번호를 입력해주세요"
              />
            </div>
          </Form.Field>
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-3">
          <Form.Submit asChild>
            <button className="cursor-pointer w-full">
              <div className="w-full flex items-center justify-center bg-primary px-6 py-2 rounded-md">
                <span className="text-white">로그인</span>
              </div>
            </button>
          </Form.Submit>
          <Link href="/register">
            <div className="w-full flex items-center justify-center border border-primary px-6 py-2 rounded-md">
              <span className="text-primary">회원가입</span>
            </div>
          </Link>
        </div>
      </Form.Root>

      <div className="relative flex justify-center my-6">
        <p className="absolute font-light bottom-[-10px] text-sm bg-white px-4">
          또는
        </p>
        <div className="border-b border-gray-200 w-full" />
      </div>
      <GoogleLoginButton />
    </div>
  );
};
