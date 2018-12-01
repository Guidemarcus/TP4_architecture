
function getAll() {
    $.get("http://localhost:8080/api/bills/", function(data, status) {
        $('#responseBody').html(JSON.stringify(data));
        $('#responseStatus').html(status);
    });
} 

function getBill() {
    
    $.get("http://localhost:8080/api/bills/" + $("#idInput").val(), function(data, status) {
        $('#responseBody').html(JSON.stringify(data));
        $('#responseStatus').html(status);
    }).fail(function(xhr, status, error) {
        $('#responseStatus').html(status);
        $('#responseBody').html(error);
    });    
}

function postBill() {
    var input = JSON.parse($("#body").val());
    if(input.id === undefined || input.id === null || input.totalPrice === undefined || input.products === undefined || input.products === [])
    {
        return;
    }

   $.ajax({
        type:'POST',
        url: "http://localhost:8080/api/bills/",
        contentType: 'application/json',
        data: input,
        success: (msg) => {
            $('#responseBody').html(JSON.stringify(msg));
        },
        fail: (xhr, status, error) =>{
            console.log("aAAAAAA");
            $('#responseStatus').html(status);
            $('#responseBody').html(error);
        }
    });
}

function deleteAll() {    
    $.ajax({
        type:'DELETE',
        url: "http://localhost:8080/api/bills/",
        success: (msg) => {
            $('#responseStatus').html("All bills deleted!");
        },
        fail: (xhr, status, error) =>{
            $('#responseStatus').html(status);
            $('#responseBody').html(error);
        }
    });
}

function deleteBill() {
    
    $.ajax({
        type:'DELETE',
        url: "http://localhost:8080/api/bills/" + $("#idInput").val() ,
        success: (msg) => {
            $('#responseStatus').html("Bill " + $("#idInput").val() + " deleted!");
        },
        fail: (xhr, status, error) =>{
            $('#responseStatus').html(status);
            $('#responseBody').html(error);
        }
    });
}
