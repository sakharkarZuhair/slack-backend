export const sendSuccessResponse = (
  res,
  data = {},
  message = "Success",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendErrorResponse = (
  res,
  error = "An error occurred",
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message: error,
  });
};
