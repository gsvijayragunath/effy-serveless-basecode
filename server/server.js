exports = {
  onTicketCreateHandler: async function (args) {
    try {
      console.log("Ticket created by: " + args["data"]["requester"]["name"]);
      console.log("Ticket Data:", args.data);
      console.log("Custom Fields from iparams:", args.iparams.custom_fields);
      console.log("Custom Fields from iparams:", typeof args.iparams.custom_fields);
      const parsedFields = JSON.parse(args.iparams.custom_fields)
      console.log("PARSING CUSTOM FIELDS", console.log(parsedFields))

      console.log(
        "Custom Fields from Ticket:",
        JSON.stringify(args.data.ticket.custom_fields, null, 2)
      );

      const {
        subject,
        description_text,
        status,
        priority,
        cc_emails,
        group_id,
        requester_id,
      } = args.data.ticket;

      const payload = {
        email: args.data.requester.email,
        subject: subject,
        description: description_text,
        status: status,
        priority: priority,
        cc_emails: cc_emails,
        group_id: group_id,
        requester_id: requester_id,
        custom_fields: customFields(args), 
      };

      console.log("Payload constructed:", payload);

      
      const jsonPayload = JSON.stringify(payload);
      console.log("JSON Payload:", jsonPayload);

      const result = await $request.invokeTemplate("createFreshDeskTicket", {
        body: jsonPayload,
      });

      console.log("Ticket created successfully:", result);
      console.log("API Response:", result.response);
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
  const customFields = JSON.parse(args.iparams.custom_fields)
  console.log(typeof customFields)
  console.log(customFields)

  const customFieldValues = {};

  const serviceTicketKeys = Object.values(customFields);
  const deskTicketKeys = Object.keys(customFields);

  const data = args.data.ticket.custom_fields
  console.log(data)

  serviceTicketKeys.forEach((key, index) => {
    const matchingItem = data.find((item) => item.name === key);
    if (matchingItem) {
      if (key === "event_date" && matchingItem.value) {
        customFieldValues[deskTicketKeys[index]] = matchingItem.value.substring(0, 10); 
      } else if(key === "service_ticket_id" && matchingItem.value){
        customFieldValues[deskTicketKeys[index]] = String(matchingItem.value); 
      }
        else {
        customFieldValues[deskTicketKeys[index]] = matchingItem.value;
      }
    }
  });

  console.log("Mapped Custom Fields:", customFieldValues);
  return customFieldValues;
}
