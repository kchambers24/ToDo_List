var site = "https://fathomless-woodland-51903.herokuapp.com"
$(document).ready(() => {
    $.getJSON({
        url: `${site}/todos`,
        headers: {
            "Authorization": "Token token=supadupasecret"
        },
        success: (response) => {
            var taskHTML = response.data.map((task) => `<li data-id=${task.id}>${task.attributes.todo} </button><button class="delete">Delete</button><input type="checkbox"</li>`);
            $("#toDos").append(taskHTML.join("\n"));

            countChecked();
            $("input[type=checkbox]").on("click", countChecked);
        }
    });

    var countChecked = function() {
        var n = $("li").length - $("input:checked").length;
        $("div").text(n + (n === 1 ? " is" : " things are") + " left to do");
    };





    $("form").submit(function(event) {
        $.post({
            url: `${site}/todos`,
            headers: {
                "Authorization": "Token token=supadupasecret"
            },
            data: $(this).serialize(),
            success: function(response) {
                $("#toDos li:last").data("id", response.data.id)
            }
        });

        var taskHTML = `<li>${$(this).find("input").val()}<button class="delete">Delete</button><input type="checkbox"</li>`;
        $("#toDos").append(taskHTML);

        event.preventDefault();

        $("input").val("");

    })




    $("#toDos").on("click", ".delete", function(event) {
        var self = $(this);
        $.ajax({
            url: `${site}/todos/${self.parent().data("id")}`,
            headers: {
                "Authorization": "Token token=supadupasecret"
            },
            type: "DELETE",
            success: function(data) {
                self.parent().remove();
            }
        })
    })

    // start of test code
//
//     $('#toDos').on('click', '.complete-button', function(event) {
//       var item = $(event.target).parent()
//       var isItemCompleted = item.hasClass('completed')
//       var itemId = item.attr('data-id')
//       var updateRequest = $.ajax({
//   type: 'PUT',
//   url: `${site}/todos` + itemId,
//   headers: {
//     "Authorization": "Token token=supadupasecret"
// },
// da
//   data: { completed: !isItemCompleted }
// })
//
// updateRequest.done(function(itemData) {
//   if (itemData.data.attributes["is-complete"]) {
//     item.addClass('completed')
//   } else {
//     item.removeClass('completed')
//   }
// })
//
// })


    // end of test code




})
