/* Kids School CUBE — shared script for sub pages */
(function(){
  "use strict";
  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* header: shadow on scroll + mobile menu */
  var hd = document.getElementById("hd");
  if(hd){
    var onScroll = function(){ hd.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, {passive:true});
    onScroll();
    var mb = document.getElementById("menuBtn");
    if(mb){
      mb.addEventListener("click", function(){
        var open = hd.classList.toggle("open");
        mb.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.getElementById("mPanel").addEventListener("click", function(e){
        if(e.target.tagName === "A"){ hd.classList.remove("open"); mb.setAttribute("aria-expanded","false"); }
      });
    }
  }

  /* reveal on view */
  var rvs = [].slice.call(document.querySelectorAll(".rv"));
  if(RM || !("IntersectionObserver" in window)){
    rvs.forEach(function(el){ el.classList.add("on"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add("on"); io.unobserve(en.target); }
      });
    }, {threshold:.14, rootMargin:"0px 0px -40px 0px"});
    rvs.forEach(function(el){ io.observe(el); });
  }

  /* ---------- contact form -> Google Forms backend ----------
     ▼ 設定はこの GFORM だけ差し替えればOK
     （Googleフォームの「事前入力したURLを取得」で entry ID が分かります）
     action : https://docs.google.com/forms/d/e/＜フォームID＞/formResponse
     map    : 各項目に対応する entry.＜番号＞
  ------------------------------------------------------------ */
  var GFORM = {
    action: "https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/formResponse",
    map: {
      youken:  "entry.REPLACE_1",
      name:    "entry.REPLACE_2",
      furigana:"entry.REPLACE_3",
      age:     "entry.REPLACE_4",
      email:   "entry.REPLACE_5",
      tel:     "entry.REPLACE_6",
      message: "entry.REPLACE_7"
    }
  };
  var form = document.getElementById("contactForm");
  if(form){
    var REQUIRED = ["youken","name","furigana","age","email"];
    var mark = function(el, bad){ var f = el.closest(".field"); if(f) f.classList.toggle("invalid", bad); };
    form.addEventListener("input", function(e){
      var f = e.target.closest(".field"); if(f) f.classList.remove("invalid");
    });
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var ok = true, firstBad = null;
      REQUIRED.forEach(function(k){
        var el = form.elements[k]; if(!el) return;
        var bad = !String(el.value).trim();
        if(k === "email" && el.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)) bad = true;
        mark(el, bad);
        if(bad && !firstBad) firstBad = el;
        if(bad) ok = false;
      });
      if(!ok){ if(firstBad) firstBad.focus(); return; }
      if(GFORM.action.indexOf("REPLACE") < 0){
        var fd = new FormData();
        Object.keys(GFORM.map).forEach(function(k){
          var el = form.elements[k]; if(el) fd.append(GFORM.map[k], el.value);
        });
        try { fetch(GFORM.action, {method:"POST", mode:"no-cors", body:fd}); } catch(err){}
      }
      form.hidden = true;
      var s = document.getElementById("formSuccess");
      if(s){ s.hidden = false; s.scrollIntoView({behavior:"smooth", block:"center"}); }
    });
  }
})();
