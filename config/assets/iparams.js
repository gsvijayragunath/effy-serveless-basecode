let client;

app.initialized().then(
  function (_client) {
    client = _client;
  },
  function (error) {
    console.log(error);
  }
);

let domain_Field = document.getElementById("domain");
let apiKey_Field = document.getElementById("apiKey");
let custom_Field = document.getElementById("customFields");

function getConfigs(configs) {
  domain_Field.value = configs.domain;
  apiKey_Field.value = configs.apiKey;
  custom_Field.value = configs.fields;
  console.log("The COnfigs", configs);
}

function validate() {
  let isValid = true;
  if (
    domain_Field.value === "" ||
    apiKey_Field.value === "" ||
    custom_Field.value === ""
  ) {
    return (isValid = false);
  } else {
    return isValid;
  }
}

function postConfigs() {
  // const domainField = document.getElementById("domain").value;
  domain = domain_Field.value;
  apiKey = apiKey_Field.value;
  fields = custom_Field.value
  // console.log("the domain", domainField);
  return {
    domain,
    apiKey,
    fields,
  };
}
