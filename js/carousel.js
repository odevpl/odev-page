const owl = $(".owl-carousel.gallery-with-projects");
owl.owlCarousel({
  loop: true,
  // autoplay: true,
  items: 3,
  margin: 10,
  animateOut: 'fadeOut'
});

$('.client').on('click', function(event) {
  const src = $(this).find("img").attr("src")
  console.log('Img -> ' + src);
})

owl.on('changed.owl.carousel', function(property) {
  const current = property.item.index;
  const src = $(property.target).find(".client").eq(current).find("img").attr('src');
  console.log('Image current is ' + src);
});