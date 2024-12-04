import { makeVar } from "@apollo/client";


export const profileVar = makeVar({
    name: '',
    email: '',
    age: 0,
    birtday: {
      month: "",
      day: "",
      year:"",
    },
    gender:"",
    choice: "",
    find:"",

  });