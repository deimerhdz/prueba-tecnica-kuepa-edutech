export const handleErrorResponse = (res, message = "something happened", code = 401) => {
    console.log("Error", message);
    res.status(code);
    res.send({ error: message });
  };