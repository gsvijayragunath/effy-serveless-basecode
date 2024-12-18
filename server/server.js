exports = {
  onTicketCreateHandler: async function (args) {
    try {
      console.log("Ticket created by: " + args["data"]["requester"]["name"]);
      console.log("Ticket Data:", args);

      const values = await $request.invokeTemplate("getTickets", {});
      console.log("Data obtained from getTickets:", values);

      const { subject, description_text, status, priority } = args.data.ticket;
      const requesterEmail = args.data.requester.email;

      const payload = {
        email: requesterEmail,
        subject: subject,
        description: description_text,
        status: status,
        priority: priority,
      };

      console.log("Payload constructed:", payload);

      const jsonPayload = JSON.stringify(payload);
      console.log("JSONPAYLOAD", jsonPayload);

      const result = await $request.invokeTemplate("createFreshDeskTicket", {
        body: jsonPayload,
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
