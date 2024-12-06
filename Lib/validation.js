"use client";
import validator from "email-validator";
import {
  LowerCaseValidator,
  MaxLengthValidator,
  MinLengthValidator,
  PasswordValidatorManager,
  SpecialCharacterValidator,
  UpperCaseValidator
} from "@password-validator/core";

// for password validation
const pm = PasswordValidatorManager.standard();
const minLength = new MinLengthValidator(8);
const maxLength = new MaxLengthValidator(20);
const uppercases = new UpperCaseValidator(2);
const lowercases = new LowerCaseValidator(2);
const specialCharacters = new SpecialCharacterValidator(2);
pm.register(minLength, maxLength, uppercases, lowercases, specialCharacters);

export function confirmMatch(
  word1,
  word2,
  propertyName,
  comparing,
  setErrorState
) {
  const errorObj = {};
  if (word1 !== word2) {
    errorObj[propertyName] = `${comparing} do not match`;
  }
  setErrorState(errorObj);
  return errorObj;
}

export function passwordCheck(val, propertyName, setErrorState) {
  const errorObj = {};
  const check = pm.validate(val);

  if (!check.valid) {
    let errors = check.messages;
    for (let i = 0; i < errors.length; i++) {
      errorObj[`${propertyName}-${i}`] = errors[i];
    }
  }

  setErrorState(errorObj);
  return errorObj;
}

export function emailCheck(val, propertyName, errorObj) {
  if (!val) {
    errorObj[propertyName] = "Email is required";
  } else if (!validator.validate(val)) {
    errorObj[propertyName] = `${val} is not a valid email`;
  }
  return errorObj;
}

export default function requiredVal(val, propertyName, inputName, errorObj) {
  if (!val) {
    errorObj[propertyName] = `${inputName} is required`;
  }
  return errorObj;
}

export function maxCharVal(val, max, propertyName, inputName, errorObj) {
  if (val.length > max) {
    errorObj[
      propertyName
    ] = `${inputName} must be less than ${max} characters, it is currently ${val.length} characters`;
  }
  return errorObj;
}

export function minCharVal(val, min, propertyName, inputName, errorObj) {
  if (val.length < min) {
    errorObj[
      propertyName
    ] = `${inputName} must be more than ${min} characters, it is currently ${
      val.length
    } ${val.length === 1 ? "character" : "characters"}`;
  }
  return errorObj;
}

export function whiteSpaceVal(val, propertyName, inputName, errorObj) {
  if (val) {
    if (val.trim() === "") {
      errorObj["whiteSpaceOnly"] = `${inputName} cannot be empty`;
    }
  }
  if (val) {
    if (!val[0].replace(/\s/g, "").length) {
      errorObj[
        "whiteSpaceStart"
      ] = `${inputName} can not start with whitespace (ie. spaces, tabs or line breaks)`;
    }
  }
  if (val) {
    if (!val[val.length - 1].replace(/\s/g, "").length) {
      errorObj[
        "whiteSpaceEnd"
      ] = `${inputName} can not end with whitespace (ie. spaces, tabs or line breaks)`;
    }
  }
  return errorObj;
}

export function minWordCountVal(val, min, propertyName, inputName, errorObj) {
  if (val.split(" ").length < min) {
    errorObj[
      propertyName
    ] = `${inputName} must be at least ${min} words, it is currently ${
      val.split(" ").length
    } ${val.split(" ").length === 1 ? "word" : "words"} long`;
  }
  return errorObj;
}

export function maxWordCountVal(val, max, propertyName, inputName, errorObj) {
  if (val.split(" ").length > max) {
    errorObj[propertyName] = `${inputName} must be less than ${
      max + 1
    } words, it is currently ${val.split(" ").length} ${
      val.split(" ").length === 1 ? "word" : "words"
    } long`;
  }
  return errorObj;
}

export function checkUrl(val, propertyName, inputName, errorObj) {
  try {
    new URL(val);
  } catch (err) {
    console.error(err);
    errorObj[
      propertyName
    ] = `${inputName} must be a valid URL. This includes http:// or https://, "www" is not required and not sufficient`;
  }
  return errorObj;
}

const validateField = (val, rules, tempErrorCheck) => {
  // rules are valicaon func, arguments in order excluding error object
  for (let rule of rules) {
    // extract validator so it can be called and then pass in arguments to the validatoe from validaton.js, as well as the obj param that is required
    const [validator, ...args] = rule;
    // extractcted funciton so now call it with params and error object
    validator(val, ...args, tempErrorCheck);
  }
};

export function validateEmail(val, setErrorState) {
  const errorObj = {};
  validateField(
    val,
    [
      [maxCharVal, 70, "emailMax", "email"],
      [emailCheck, "emailValid"]
    ],
    errorObj
  );

  setErrorState(errorObj);
  return errorObj;
}

export function validateTitle(val, setErrorState) {
  const errorObj = {};
  validateField(
    val,
    [
      [requiredVal, "titleReq", "title"],
      [maxCharVal, 50, "titleMax", "title"],
      [minCharVal, 5, "titleMin", "title"],
      [minWordCountVal, 3, "titleWordCount", "title"],
      [whiteSpaceVal, "whiteSpace", "title"]
    ],
    errorObj
  );
  setErrorState(errorObj);
  return errorObj;
}

export function validateOutsideTitle(val, setErrorState) {
  const errorObj = {};
  validateField(
    val,
    [
      [requiredVal, "titleReq", "title"],
      [maxCharVal, 50, "titleMax", "title"],
      [minCharVal, 1, "titleMin", "title"],
      [minWordCountVal, 1, "titleWordCount", "title"],
      [whiteSpaceVal, "whiteSpace", "title"]
    ],
    errorObj
  );
  setErrorState(errorObj);
  return errorObj;
}
// author and signup names, NOT FOR ADMINS
export function validateName(val, setErrorState, userError) {
  const errorObj = {};
  validateField(
    val,
    [
      [requiredVal, "authorReq", userError],
      [minCharVal, 4, "authorMinChar", userError],
      [maxCharVal, 40, "authorMaxChar", userError],
      [minWordCountVal, 1, "authorMinWordCount", userError],
      [maxWordCountVal, 3, "authorMaxWordCount", userError],
      [whiteSpaceVal, "whiteSpace", userError]
    ],
    errorObj
  );
  setErrorState(errorObj);
  return errorObj;
}

export function validateBody(val, setErrorState) {
  const errorObj = {};
  validateField(
    val,
    [
      [requiredVal, "bodyReq", "body"],
      [maxCharVal, 1000, "bodyMax", "body"],
      [minCharVal, 30, "bodyMin", "body"],
      [minWordCountVal, 10, "bodyWordCount", "body"],
      [whiteSpaceVal, "whiteSpace", "body"]
    ],
    errorObj
  );
  setErrorState(errorObj);
  return errorObj;
}

export function validateImgAlt(val, setErrorState) {
  const errorObj = {};
  validateField(
    val,
    [
      [requiredVal, "imageAltReq", "image alt text"],
      [maxCharVal, 50, "imageAltMax", "image alt text"],
      [minCharVal, 5, "imageAltMin", "image alt text"],
      [minWordCountVal, 3, "imageAltWordCount", "image alt text"],
      [whiteSpaceVal, "whiteSpace", "image alt text"]
    ],
    errorObj
  );
  setErrorState(errorObj);
  return errorObj;
}

export function validateLink(val, setErrorState) {
  const errorObj = {};
  validateField(
    val,
    [
      [requiredVal, "linkReq", "link"],
      [checkUrl, "linkValid", "link"],
      [whiteSpaceVal, "whiteSpace", "link"]
    ],
    errorObj
  );
  setErrorState(errorObj);
  return errorObj;
}

export function validateOptionalLink(val, setErrorState) {
  const errorObj = {};
  if (val === "" || val === null) {
    setErrorState(errorObj);
    return errorObj;
  } else {
    validateField(
      val,
      [
        [requiredVal, "linkReq", "link"],
        [checkUrl, "linkValid", "link"],
        [whiteSpaceVal, "whiteSpace", "link"]
      ],
      errorObj
    );
    setErrorState(errorObj);
    return errorObj;
  }
}

export function validateSelect(selectionGroup, valueState, setErrorState) {
  const errorObj = {};
  if (!valueState) {
    errorObj.selectReq = `Please select a ${selectionGroup}`;
  }
  setErrorState(errorObj);
  return errorObj;
}

export function validateImage(stateValue, setErrorState) {
  const errorObj = {};
  if (!stateValue) {
    errorObj.imageReq = "Please select an image";
  }
  setErrorState(errorObj);
  return errorObj;
}
