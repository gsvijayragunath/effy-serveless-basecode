const serviceTicketKeys = ["service_ticket_id", "event_date"];
const deskTicketKeys = ["cf_service_ticket", "cf_event_date"];

// Assuming defaultValues is originally an array, so remove JSON.stringify
let defaultValues = [
    {
      "name": "major_incident_type",
      "column": "ffs_01",
      "label": "Major incident type",
      "value": null,
      "type": "dropdown",
      "field_type": "custom_dropdown",
      "id": 27000877552
    },
    {
      "name": "business_impact",
      "column": "ff_text02",
      "label": "Business impact",
      "value": null,
      "type": "paragraph",
      "field_type": "custom_paragraph",
      "id": 27000877553
    },
    {
      "name": "impacted_locations",
      "column": "ctf_04",
      "label": "Impacted locations",
      "value": null,
      "type": "text",
      "field_type": "custom_text",
      "id": 27000877554
    },
    {
      "name": "no_of_customers_impacted",
      "column": "ctf_05",
      "label": "No. of customers impacted",
      "value": null,
      "type": "text",
      "field_type": "custom_text",
      "id": 27000877555
    },
    {
      "name": "event_date",
      "column": "gf_date_01",
      "label": "Event Date",
      "value": "2024-12-19T00:00:00+01:00",
      "type": "date",
      "field_type": "custom_date",
      "id": 27000883606,
      "date_only": false
    },
    {
      "name": "employeecontractor_name",
      "column": "ctf_01",
      "label": "Employee/Contractor Name",
      "value": null,
      "type": "text",
      "field_type": "custom_text",
      "id": 27000442390
    },
    {
      "name": "date_and_time_of_reporting_incident",
      "column": "ff_date01",
      "label": "Date and Time of reporting incident",
      "value": null,
      "type": "date",
      "field_type": "custom_date",
      "id": 27000565951,
      "date_only": false
    },
    {
      "name": "date_and_time_of_resolution",
      "column": "ff_date02",
      "label": "Date and Time of resolution",
      "value": null,
      "type": "date",
      "field_type": "custom_date",
      "id": 27000565953,
      "date_only": false
    },
    {
      "name": "downtime",
      "column": "ff_int02",  // Changed the column name to avoid conflict
      "label": "Downtime",
      "value": null,
      "type": "number",
      "field_type": "custom_number",
      "id": 27000569467  // Changed the ID to avoid conflict
    },
    {
      "name": "service_ticket_id",
      "column": "ff_int01",
      "label": "Service Ticket ID",
      "value": 123455,
      "type": "number",
      "field_type": "custom_number",
      "id": 27000569466
    }
];

let customFieldValues = {};

serviceTicketKeys.forEach((key, index) => {
  const matchingItem = defaultValues.find((item) => item.name === key);
  if (matchingItem) {
    if (key === "event_date" && matchingItem.value) {
      customFieldValues[deskTicketKeys[index]] = matchingItem.value.substring(0, 10); // Format: YYYY-MM-DD
    } else {
      customFieldValues[deskTicketKeys[index]] = matchingItem.value;
    }
  }
});

console.log(customFieldValues);



let jsondata = [{
    "name": "service_ticket_id",
    "column": "ff_int01",
    "label": "Service Ticket ID",
    "value": 123455,
    "type": "number",
    "field_type": "custom_number",
    "id": 27000569466
  }]

  
  console.log(typeof jsondata)
