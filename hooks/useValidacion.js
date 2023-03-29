import React, { useState, useEffect } from "react";

const useValidacion = (stateInicial, validar, fn) => {
  const [valores, setValores] = useState(stateInicial);
  const [errores, setErrores] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;
      if (noErrores) {
        fn();
      }
      setSubmitForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errores]);

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
    setSubmitForm(true);
  };
  const handleBlur = (e) => {
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
  };

  const handleChangeImage = (e) => {
    const { name, value } = e.target;
    if (name === "imagen") {
      // Validar imagen
      setValores({ ...valores, [name]: e.target.files[0] });
    } else {
      setValores({ ...valores, [name]: value });
    }
  };

  return { valores, errores, handleChange, handleSubmit, handleBlur, handleChangeImage };
};

export default useValidacion;
