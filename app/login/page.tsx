"use client";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, CardHeader, Image, Input } from "@nextui-org/react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Link } from "@nextui-org/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApiConfig } from "@/app/utility/apiConfig";
import http from "@/app/utility/axios-instance";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import { getAnimationConfig } from "@/app/animation-config";
import styles from "./login.module.css";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm({ mode: "onChange" });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiState, setApiState] = useState<any>("primary");
  const apiConfig = useApiConfig();
  const { fetchUserDetails, loginUser } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const { background, card } = getAnimationConfig(pathName);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const payload = {
      customerUserName: data["email"],
      customerPassword: data["password"]
    };
    try {
      const response = await http.post(apiConfig.customer.login, payload);
      const { data } = response;
      if (data) {
        const { customerResponse } = data;
        delete customerResponse.customerUserName;
        const { token, ...rest } = customerResponse;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(rest));
        setApiState("success");
        await fetchUserDetails();
        await loginUser();
        localStorage.setItem("activeItem", JSON.stringify(1));
        router.push("/home");
      }

    } catch (error: any) {
      console.clear();
      const errorMessage = error.message;
      toast.error(errorMessage);
      setApiState("danger");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordToggleComponent = () => (
    <button
      className="focus:outline-none"
      type="button"
      onClick={toggleVisibility}
      aria-label="toggle password visibility"
    >
      {isVisible ? (
        <Eye className="text-2xl text-default-400 pointer-events-none" />
      ) : (
        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
      )}
    </button>
  );

  const getErrorMessage = (error: any) => error ? error.message : "";

  return (
    <div className="login-page overflow-hidden relative h-dvh w-full">
      <div
        className={`absolute inset-0 ${styles.specialBackground}`}
      >
        <Image
          removeWrapper
          alt="couple marriage"
          className="absolute rounded-none w-full h-full object-cover"
          src="/images/bg.png"
        />
      </div>

      <div
        className="overlay z-20 pl-20 flex items-center justify-start absolute top-0 bottom-0 h-auto w-full bg-gradient-to-tr from-ch-900/95 from-50% via-ch-500/70 via-90% to-ch-400/90">
        {/* Card with Slide-In Animation */}
        <div
          className={`${styles.specialCard}`}
        >
          <Card className="bg-transparent p-4 shadow-none min-w-96 !w-1/4">
            <CardHeader className="flex flex-col items-center justify-start gap-2">
              <p className="text-white text-start w-full font-semibold text-3xl">
                Welcome Back <span>!</span>
              </p>
            </CardHeader>
            <CardBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-1 flex-col h-full w-full justify-center items-center max-w-xs space-y-6"
              >
                <Input
                  {...register("email", {
                    required: "Username or mobile number is required",
                    validate: value => {
                      const mobileRegex = /^[0-9]{10}$/;
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (mobileRegex.test(value)) return true;
                      if (emailRegex.test(value)) return true;
                      return "Please enter a valid mobile number or email address";
                    }
                  })}
                  type="text"
                  radius="lg"
                  label="Enter Username or Mobile Number"
                  isInvalid={!!errors.identifier}
                  errorMessage={getErrorMessage(errors.identifier)}
                  className="w-full"
                  onBlur={() => trigger("identifier")}
                />
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters"
                    }
                  })}
                  label="Password"
                  isInvalid={!!errors.password}
                  errorMessage={getErrorMessage(errors.password)}
                  endContent={passwordToggleComponent()}
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs text-white w-full"
                  onBlur={() => trigger("password")}
                />
                <div className="w-full flex items-center justify-between">
                  <div className="rememberMe"></div>
                  <Button
                    startContent={isLoading ? "" : <Lock />}
                    variant="shadow"
                    radius="full"
                    size="lg"
                    color={apiState}
                    type="submit"
                    isLoading={isLoading}
                    isDisabled={!isValid}
                  >
                    Login
                  </Button>
                </div>
                <div className="forgot-password flex flex-col w-full gap-2">
                  <Link href="/register">
                    <p className="text-sm w-full text-center text-white font-semibold">Reset Password!</p>
                  </Link>
                  <h4 className="opacity-80 text-sm text-white text-center w-full">
                    Not a member yet? {" "}
                    <Link href="/register">
                      <p className="text-sm text-white font-semibold">Register here</p>
                    </Link>
                  </h4>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
