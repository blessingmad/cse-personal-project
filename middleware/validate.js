const constraints = {
    username: {
      presence: true,
      length: {
        minimum: 3,
        message: "must be at least 3 characters"
      }
    },
    email: {
      presence: true,
      email: true
    }
  };
  
  const formData = {
    username: document.querySelector("#username").value,
    email: document.querySelector("#email").value
  };
  
  const errors = validate(formData, constraints);
  
  if (errors) {
    console.log(errors);
    alert("Form has errors!");
  } else {
    console.log("Form is valid!");
  }
  