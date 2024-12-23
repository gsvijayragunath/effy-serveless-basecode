exports = {
  onTicketCreateHandler: async function (args) {
    try {
      console.log(args.iparams)

      const data = JSON.parse(args.iparams.fields);
      const keys = Object.keys(data.common);
      const commonValues = {};
      for (let i = 0; i < keys.length; i++) {
        commonValues[keys[i]] = args.data.ticket[keys[i]];
      }
      const payload = {
        email: args.data.requester.email,
        ...commonValues,
        custom_fields: customFields(args),
      };
      console.log(payload)
      const jsonPayload = JSON.stringify(payload);
      console.log("JSON Payload:", jsonPayload);

      const result = await $request.invokeTemplate("createFreshDeskTicket", {
        body:jsonPayload,
      });
      console.log("Ticket created successfully:", result);
    } catch (error) {
      console.error("Error during ticket creation:", error);
    }
  },

  onAppInstallHandler: function (args) {
    console.info("App installed with the following data:", args);
    renderData();
  },

  onAppUninstallHandler: function (args) {
    console.log("App uninstalled with the following data:", args);
    renderData();
  },
};

function customFields(args) {
  const incomingFields = JSON.parse(args.iparams.fields);
  const customFields = incomingFields.custom_fields;
 

  const customFieldValues = {};
  const serviceTicketKeys = Object.values(customFields);
  const deskTicketKeys = Object.keys(customFields);
  const data = args.data.ticket.custom_fields;

  serviceTicketKeys.forEach((key, index) => {
    const matchingItem = data.find((item) => item.name === key);
    if (matchingItem) {
      if (key === "event_date" && matchingItem.value) {
        customFieldValues[deskTicketKeys[index]] = matchingItem.value.substring(0, 10);
      } else if (key === "service_ticket_id" && matchingItem.value) {
        customFieldValues[deskTicketKeys[index]] = String(matchingItem.value);
      } else {
        customFieldValues[deskTicketKeys[index]] = matchingItem.value;
      }
    }
  });

  console.log("Mapped Custom Fields:", customFieldValues);
  return customFieldValues;
}
