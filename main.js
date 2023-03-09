const clickBtn = document.getElementById("clickBtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

clickBtn.addEventListener('click', ()=>{
    popup.style.display = 'block';
});
closeBtn.addEventListener('click', ()=>{
    popup.style.display = 'none';
});

var imageSrcHover = [];
$("#menu li").each(function (i, el) {
  imageSrcHover[i] = $(this).find("img").attr("src");

  $(el).click(function (event) {
    this.tlImageMenu = gsap.timeline();
    this.tlImageMenu.to("#box-menu .menu-img img", {
      duration: 0.9,
      x: "-105%",
      overwrite: true,
    });
    this.tlImageMenu.set("#box-menu .menu-img img", {
      attr: { src: imageSrcHover[i] }
    });
    this.tlImageMenu.set("#box-menu .menu-img img", { scale: 1.1 });
    this.tlImageMenu.to(
      "#box-menu .menu-img img",
      { duration: 1.6, ease: "power4.out", x: 0 },
      ">0.2"
    );
    this.tlImageMenu.to(
      "#box-menu .menu-img img",
      { duration: 1.3, scale: 1 },
      "<0.3"
    );
  });
});
