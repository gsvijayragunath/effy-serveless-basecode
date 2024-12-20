exports = {
  onTicketCreateHandler: async function (args) {
    console.log(args)
    try {
      const { subject, description, status, priority,cc_emails } = args.data.ticket;
      const requesterEmail = args.data.requester.email;

      const payload = {
        email: requesterEmail,
        subject: subject,
        description: description,
        status: status,
        priority: priority,
        cc_emails:cc_emails
      };

      const jsonPayload = JSON.stringify(payload);
      // console.log("JSONPAYLOAD", jsonPayload);

      const result = await $request.invokeTemplate("createFreshDeskTicket", {
        body: jsonPayload,
      });
      console.log("Ticket created successfully:", result);
    } catch (error) {
      console.error("Error during ticket creation:", error);
    }
  },

  onAppInstallHandler: function (args) {
    generateTargetUrl()
    console.info("App installed with the following data:", args);
    renderData();
  },

  onAppUninstallHandler: function (args) {
    console.log("App uninstalled with the following data:", args);
    renderData();
  },
};
