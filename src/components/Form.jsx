import React from "react";
import { useFormik } from "formik";
import { FormSceme } from "../services/formsceme";
import axios from "axios";

const Form = () => {
  const forminitialValues = {
    name: "",
    email: "",
    message: "",
  };

  const formik = useFormik({
    initialValues: forminitialValues,
    validationSchema: FormSceme,
    onSubmit: async (values) => {
      try {
        // Submit form data to the PHP backend using axios
        const response = await axios.post(
          "http://yourdomain.com/contact.php",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle the response
        const result = response.data;
        if (result.status === "success") {
          alert("Message sent successfully!");
        } else {
          alert("Failed to send message.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while sending the message.");
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            className="border w-full px-5 py-2 rounded-full"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            placeholder="Enter Name"
          />
          {formik.errors.name && formik.touched.name ? (
            <span className="text-red-600 ml-5 mt-2 inline-block">
              {formik.errors.name}
            </span>
          ) : null}
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            className="border w-full px-5 py-2 rounded-full"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            placeholder="Enter Email"
          />
          {formik.errors.email && formik.touched.email ? (
            <span className="text-red-600 ml-5 mt-2 inline-block">
              {formik.errors.email}
            </span>
          ) : null}
        </div>

        <div className="mb-4">
          <textarea
            name="message"
            className="border w-full px-5 py-2 rounded-lg"
            rows="4"
            onChange={formik.handleChange}
            value={formik.values.message}
            onBlur={formik.handleBlur}
            placeholder="Your Message"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-3xl bg-yellow-400 px-4 py-3 text-lg"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Form;
