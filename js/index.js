$(document).ready(function () {
  let lastScrollTop = 0;
  let header = $(".header");
  let top = $(".header .top");

  $(window).scroll(function (event) {
    let st = $(this).scrollTop();
    if (st > lastScrollTop) {
      // Scroll down
      header.css("height", "10vh"); // Set the minimized height
      header.css("justify-content", "center");

      top.hide();
    } else {
      // Scroll up
      if (st === 0) {
        header.css("height", "18vh"); // Set the original height when scrolled at the top
        header.css("justify-content", "space-between");

        top.show();
      } else {
        header.css("height", "10vh"); // Set the minimized height for other scroll positions
        header.css("justify-content", "center");
      }
    }
    lastScrollTop = st;
  });

  // Select the spans
  var emailSpan = $(".text-email");
  var shippingSpan = $(".text-shipping");

  // Hide the shipping span initially
  shippingSpan.hide();

  // Set the interval to switch between spans every 3 seconds
  setInterval(function () {
    if (emailSpan.is(":visible")) {
      shippingSpan.css("right", "0");
      shippingSpan.show();
      shippingSpan.animate({ right: "48%" });

      emailSpan.animate({ left: -10 }, () => {
        emailSpan.hide();
        emailSpan.css("left", "");
      });
    } else {
      emailSpan.css("right", "0");
      emailSpan.show();
      emailSpan.animate({ right: "43%" });

      shippingSpan.animate({ left: -5 }, () => {
        shippingSpan.hide();
        shippingSpan.css("left", "");
        emailSpan.show();
      });
    }
  }, 3000); // 3 seconds interval
});

$.ajax({
  url: "products.xml",
  dataType: "xml",
  success: function (xmlDoc) {
    $.ajax({
      url: "products.xsl",
      dataType: "xml",
      success: async function (xslDoc) {
        let xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDoc);
        let resultDoc = xsltProcessor.transformToFragment(xmlDoc, document);
        await $(".essentials-products").append(resultDoc);

        $(".product img").hover(
          (event) => {
            let src = $(event.target).attr("src");

            src = src.substring(7); //trims the assets/
            src = src.substring(0, src.indexOf(".")); //trims .jpg

            $(event.target).attr("src", "assets/" + src + "-focused.jpg");
          },
          (event) => {
            let src = $(event.target).attr("src");
            src = src.substring(7); //trims the assets/
            src = src.substring(0, src.indexOf("-")); //trims .jpg

            $(event.target).attr("src", "assets/" + src + ".jpg");
          }
        );
      },
    });
  },
});