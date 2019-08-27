function deleteLeads(leadId) {
  $.ajax({
    url: "/lead/" + leadId + "/delete-json",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({ leadId }),
    type: "POST",
    success: res => {
      //test
      console.log("result: ", res);
      // replace follow button with unfollow
      $("#" + leadId).remove();
    },
    error: error => {
      console.log("error: ", error);
    }
  });
}
