import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Input from "./components/Input";
import Button from "./components/Button";
import { Formik } from "formik";
import * as Yup from "yup";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 4) {
    errors.username = "Minimun length of 4";
  }
  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.match(/\d/g).length === 11) {
    errors.phone = "Minimun length of 11";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Minimun length of 8";
  }
  if (!values.confirm_password) {
    errors.confirm_password = "Required";
  } else if (values.confirm_password.length < 8) {
    errors.confirm_password = "Minimun length of 8";
  } else if (
    !!values.password &&
    !!values.confirm_password &&
    values.password != values.confirm_password
  ) {
    errors.confirm_password = "Not equal to Password";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(4, "Minimun length of 4").required("Required"),
  phone: Yup.string()
    .min(11, "Minimun length of 11")
    .max(11, "Minimun length of 11")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Minimun length of 8").required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(8, "Minimun length of 8")
    .required("Required"),
});

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Create Account</Text>
        <Text style={styles.subHeader}>
          Create a new account and let me show you the world
        </Text>
      </View>
      <Formik
        initialValues={{
          email: "",
          username: "",
          phone: "",
          password: "",
          confirm_password: "",
        }}
        onSubmit={(values) => {
          // console.log(values);
        }}
        // validate={validate}
        validationSchema={SignupSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isSubmitting,
        }) => {
          console.log({ values });
          return (
            <>
              <View>
                <Input
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  touched={touched.username}
                  error={errors.username}
                  label="Username"
                />
                <Input
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  touched={touched.email}
                  error={errors.email}
                  label="Email"
                />
                <Input
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  touched={touched.phone}
                  error={errors.phone}
                  label="Phone"
                />
                <Input
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  touched={touched.password}
                  error={errors.password}
                  secureTextEntry
                  label="Password"
                />
                <Input
                  onChangeText={handleChange("confirm_password")}
                  onBlur={handleBlur("confirm_password")}
                  value={values.confirm_password}
                  touched={touched.confirm_password}
                  error={errors.confirm_password}
                  secureTextEntry
                  label="Confirm Password"
                />
              </View>
              <View style={styles.formAction}>
                <Text style={styles.conditionText}>
                  By continuing you agree with our Terms and Condition
                </Text>
                <Button
                  {...isSubmitting}
                  onPress={handleSubmit}
                  text="Create Account"
                />
                <View style={styles.signIn}>
                  <Text>Already have an account?</Text>
                  <TouchableOpacity>
                    <Text style={styles.signInText}> Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    // alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    paddingTop: 64,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 15,
  },
  formAction: {},
  conditionText: {
    marginVertical: 10,
    textAlign: "center",
  },
  signIn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signInText: {
    color: "rgb(51,130,246)",
  },
});
