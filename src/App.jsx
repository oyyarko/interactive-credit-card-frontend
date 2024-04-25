import * as Yup from "yup";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import bgCardBack from "./assets/bg-card-back.png";
import bgCardFront from "./assets/bg-card-front.png";
import creditCardLogo from "./assets/card-logo.svg";
import successIcon from "./assets/icon-complete.svg";
import InputField from "./components/InputField";
import Button from "./components/Button";

function App() {
  const [creditState, setCreditState] = useState(1); //1:input, 0: success

  const initialValue = Yup.object().shape({
    name: Yup.string().required("Can't be blank"),
    number: Yup.string()
      .required("Can't be blank")
      .min(19, "Wrong Format")
      .max(19, "Wrong Format"),
    mm: Yup.string()
      .required("Can't be blank")
      .min(1, "Wrong Format")
      .max(2, "Wrong Format"),
    yy: Yup.string()
      .required("Can't be blank")
      .min(2, "Wrong Format")
      .max(2, "Wrong Format"),
    cvc: Yup.string()
      .required("Can't be blank")
      .min(3, "Wrong Format")
      .max(3, "Wrong Format"),
  });
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: initialValue,
    resolver: yupResolver(initialValue),
  });

  const onSubmit = async (data) => {
    if (JSON.stringify(errors) === "{}") {
      setCreditState(!creditState);
    }
  };

  console.log("errors", errors);

  return (
    <div className="min-h-screen flex items-center justify-around background-image-fixed bg-white">
      <div className="max-w-full w-full pb-10 p-6 bg-transparent flex max-sm:flex-wrap gap-24 items-center justify-center">
        <div className="flex flex-col gap-7 max-sm:gap-0 max-sm:flex-col-reverse max-sm:relative">
          <div>
            <div className="relative credit-card-front max-sm:absolute max-sm:top-12 z-10 max-sm:me-5">
              <img src={bgCardFront} alt="credit-card-front" />
              <div>
                <img
                  src={creditCardLogo}
                  className="absolute top-0 p-8 max-sm:w-24 max-sm:p-5"
                />
                <div className="max-sm:p-5 text-light-grayish-violet absolute bottom-0 p-8 flex gap-7 flex-col font-medium tracking-widest">
                  <p className="text-3xl max-sm:text-sm min-w-96 max-sm:min-w-60">
                    {watch("number")
                      ?.replace(/\D/g, "")
                      .replace(/(\d{4})(?=\d)/g, "$1 ") ||
                      "0000 0000 0000 0000"}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="uppercase text-md max-sm:text-xs">
                      {watch("name") || "Jane applessed"}
                    </p>
                    <p className="uppercase text-md max-sm:text-xs">
                      {(watch("mm") || 0) + "/" + (watch("yy") || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-24 max-sm:ms-6 relative credit-card-back">
            <img src={bgCardBack} alt="credit-card-back" />
            <div className="text-white absolute top-1/3 right-4 py-7 px-10 max-sm:p-1.5 flex gap-5 flex-col font-medium tracking-widest max-sm:text-xs">
              <p> {watch("cvc") || "000"}</p>
            </div>
          </div>
        </div>
        {creditState ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="uppercase text-ultra-dark-grayish-violet font-medium text-xs tracking-widest">
                  Cardholder name
                </label>
                <InputField
                  // {...register("name")}
                  name="name"
                  register={register}
                  errors={errors}
                  // onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g. Jane Applessed"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="uppercase text-ultra-dark-grayish-violet font-medium text-xs tracking-widest">
                  Card Number
                </label>
                <InputField
                  name="number"
                  max={16}
                  register={register}
                  errors={errors}
                  value={watch("number")
                    ?.replace(/\D/g, "")
                    .replace(/(\d{4})(?=\d)/g, "$1 ")}
                  // onChange={(e) => handleInputChange("number", e.target.value)}
                  placeholder="e.g. 1234 5678 9123 0000"
                />
              </div>
              <div className="flex justify-between gap-6">
                <div>
                  <label className="uppercase text-ultra-dark-grayish-violet font-medium text-xs tracking-widest">
                    Exp. Date(MM/YY)
                  </label>
                  <div className="flex gap-2">
                    <InputField
                      // {...register("mm")}
                      name="mm"
                      register={register}
                      errors={errors}
                      type="number"
                      min={1}
                      max={12}
                      // onChange={(e) => handleInputChange("mm", e.target.value)}
                      placeholder="MM"
                      extraClass="!max-w-24"
                    />
                    <InputField
                      // {...register("yy")}
                      name="yy"
                      type="number"
                      min={moment().format("YY")}
                      max={50}
                      register={register}
                      errors={errors}
                      // onChange={(e) => handleInputChange("yy", e.target.value)}
                      placeholder="YY"
                      extraClass="!max-w-24"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="uppercase text-ultra-dark-grayish-violet font-medium text-xs tracking-widest">
                    CVC
                  </label>
                  <InputField
                    // {...register("cvc")}
                    name="cvc"
                    type="number"
                    min={100}
                    maxLength={"3"}
                    max={999}
                    register={register}
                    errors={errors}
                    // onChange={(e) => handleInputChange("cvc", e.target.value)}
                    placeholder="e.g. 123"
                    extraClass="!max-w-44"
                  />
                </div>
              </div>
              <Button
                type="submit"
                // onClick={() => handleSubmit(onSubmit)}
                title={"Confirm"}
              />
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center min-w-96 gap-5 transition-all">
            <img src={successIcon} />
            <h1 className="font-semibold text-2xl tracking-wider">
              THANK YOU!
            </h1>
            <p className="text-lg font-medium text-dark-grayish-violet">
              We've added your card details
            </p>
            <Button title={"Continue"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
