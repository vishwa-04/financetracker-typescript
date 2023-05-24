import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "../Redux/hooks";
import { useCookies } from "react-cookie";
import { RootState } from "../Redux/store";

type loginValue = {
  email: string;
  password: string;
  token: string;
};
function Login() {
  const initialValues: loginValue = {
    email: "",
    password: "",
    token: "",
  };
  const [cookies, setCookie] = useCookies(["mycookie"]);
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(3).max(6),
    // .test("passInvalid", "Wrong email or password", (value) => {
    //   let flag = 0;
    //   for (const e in user_redux) {
    //     if (
    //       user_redux[e].email === this.parent.email &&
    //       user_redux[e].password === value.password
    //     ) {
    //       flag = 1;
    //     }
    //   }
    //   if (flag === 0) {
    //     errors.password = "Wrong email or password";
    //   }
    // }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });
  const onSubmit = async (data: loginValue) => {
    console.log("in submit");
    if (data) {
      setFormValues(data);
      setIsSubmit(true);
    }
  };
  //   console.log(isSubmit, "after submit");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const user_redux = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    if (isSubmit) {
      console.log(user_redux);
      const data:any = user_redux
      console.log(data[0])
      for (const e in data[0]) {
    //   console.log(e)
        if (
          data[0][e].email === formValues.email &&
          data[0][e].password === formValues.password
          ) {
          let characters = "abcdefghikl1234567890mnopqrstuvwxyz";
          let randomstring = "";
          for (var i = 0; i < 16; i++) {
            var rnum = Math.floor(Math.random() * characters.length);
            randomstring += characters.substring(rnum, rnum + 1);
          }
          formValues.token = randomstring;
          console.log(formValues, "token");

          setCookie("mycookie", formValues, { maxAge: 3600 });
          navigate("/showTable");
        } else if (
            data[0][e].email !== formValues.email &&
          data[0][e].password !== formValues.password
        ) {
          navigate("/login");
        }
      }
    }
    //eslint-disable-next-line
  }, [isSubmit]);

  //   console.log(isSubmit, "after validate");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Login</h3>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        {...register("email")}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="errors">{errors.email?.message}</div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Password
                      </label>
                      <input
                        type="password"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        {...register("password")}
                        onChange={handleChange}
                      />
                      <div className="errors">{errors.password?.message}</div>
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>

                    <div>
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <Link to={"/registration"}>Register</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
export default Login;
