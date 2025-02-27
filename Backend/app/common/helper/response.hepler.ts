// *In TypeScript, the convention is to use I as a prefix for interface names.
// *The response.helper.ts file defines structures and a helper function to create standardized response objects for your API.

interface IResponse {
  //This is an interface that defines the structure of a successful API response
  success: boolean; //A boolean indicating whether the response is successful
  message?: string; //An optional string that provides additional information
  data: object | null | any; //The payload of the response. It can be any object, or null if there is no data.
}

// type Alias
export type ErrorResponse = IResponse & {
  //ErrorResponse: This is a type that extends IResponse to include an additional property
  error_code: number;
};

export const createResponse = (
  //This is a helper function that simplifies creating successful API responses. It takes two parameters:
  data: IResponse["data"], //The data to return in the response. Type is now object | null | any. instead of explicitly writing object | null | any in the function signature, you can use IResponse["data"] to reference the type of data in the IResponse interface.
  message?: string //An optional message that can be included
): IResponse => {
  //The function returns an object of type IResponse,
  return { data, message, success: true };
};




// *examples
//  {
//   "success": true,
//   "message": "User data fetched successfully",
//   "data": {
//     "userId": 1,
//     "name": "John Doe"
//   }
// }

// const errorResponse: ErrorResponse = {
//   success: false,
//   error_code: 404,
//   message: "User not found",
//   data: null
// };