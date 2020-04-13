import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Input from "./components/Input";
import Button from "./components/Button";
import { Formik } from "formik";

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

export default function App() {
  return (
    <View style={styles.container}>
      [...]
      <Formik
        initialValues={{
          email: "",
          username: "",
          phone: "",
          password: "",
          confirm_password: "",
        }}
        onSubmit={async (values) => {
          await FuncWillTake5Secs();
          // as this would take 5 sec this would stop the user from submitting the form again
          // for more clarity look into the Button Component
        }}
      >
        {({ isSubmitting, ...rest }) => {
          return (
            <>
              <View>
                [...]
                {/* look into Button */}
                <Button
                  {...{ isSubmitting }}
                  onPress={handleSubmit}
                  text="Create Account"
                />
                [...]
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
