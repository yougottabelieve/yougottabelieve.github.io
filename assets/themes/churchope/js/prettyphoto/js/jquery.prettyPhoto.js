(function(a) {
    function e(a, b) {
        a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var c = "[\\?&]" + a + "=([^&#]*)",
            d = new RegExp(c),
            e = d.exec(b);
        return e == null ? "" : e[1]
    }

    function d() {
        url = location.href, hashtag = (url.indexOf("#!prettyPhoto") > 0) ? !0 : !1, hashtag && (location.hash = "!prettyPhoto")
    }

    function c() {
        typeof theRel != "undefined" && (location.hash = "!" + theRel + "/" + rel_index + "/")
    }

    function b() {
        url = location.href, hashtag = url.indexOf("#!") != -1 ? decodeURI(url.substring(url.indexOf("#!") + 2, url.length)) : !1;
        return hashtag
    }
    a.prettyPhoto = {
        version: "3.1.3"
    }, a.fn.prettyPhoto = function(f) {
        function B(b) {
            settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href))), settings.markup = settings.markup.replace("{pp_social}", settings.social_tools ? facebook_like_link : ""), a("body").append(settings.markup), $pp_pic_holder = a(".pp_pic_holder"), $ppt = a(".ppt"), $pp_overlay = a("div.pp_overlay");
            if (isSet && settings.overlay_gallery) {
                currentGalleryPage = 0, toInject = "";
                for (var c = 0; c < pp_images.length; c++) pp_images[c].match(/\b(jpg|jpeg|png|gif)\b/gi) ? (classname = "", img_src = pp_images[c]) : (classname = "default", img_src = ""), toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
                toInject = settings.gallery_markup.replace(/{gallery}/g, toInject), $pp_pic_holder.find("#pp_full_res").after(toInject), $pp_gallery = a(".pp_pic_holder .pp_gallery"), $pp_gallery_li = $pp_gallery.find("li"), $pp_gallery.find(".pp_arrow_next").click(function() {
                    a.prettyPhoto.changeGalleryPage("next"), a.prettyPhoto.stopSlideshow();
                    return !1
                }), $pp_gallery.find(".pp_arrow_previous").click(function() {
                    a.prettyPhoto.changeGalleryPage("previous"), a.prettyPhoto.stopSlideshow();
                    return !1
                }), $pp_pic_holder.find(".pp_content").hover(function() {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()
                }, function() {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()
                }), itemWidth = 57, $pp_gallery_li.each(function(b) {
                    a(this).find("a").click(function() {
                        a.prettyPhoto.changePage(b), a.prettyPhoto.stopSlideshow();
                        return !1
                    })
                })
            }
            settings.slideshow && ($pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>'), $pp_pic_holder.find(".pp_nav .pp_play").click(function() {
                a.prettyPhoto.startSlideshow();
                return !1
            })), $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme), $pp_overlay.css({
                opacity: 0,
                height: a(document).height(),
                width: a(window).width()
            }).bind("click", function() {
                settings.modal || a.prettyPhoto.close()
            }), a("a.pp_close").bind("click", function() {
                a.prettyPhoto.close();
                return !1
            }), a("a.pp_expand").bind("click", function(b) {
                a(this).hasClass("pp_expand") ? (a(this).removeClass("pp_expand").addClass("pp_contract"), doresize = !1) : (a(this).removeClass("pp_contract").addClass("pp_expand"), doresize = !0), s(function() {
                    a.prettyPhoto.open()
                });
                return !1
            }), $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function() {
                a.prettyPhoto.changePage("previous"), a.prettyPhoto.stopSlideshow();
                return !1
            }), $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function() {
                a.prettyPhoto.changePage("next"), a.prettyPhoto.stopSlideshow();
                return !1
            }), x()
        }

        function A() {
            isSet && settings.overlay_gallery && w(pp_images[set_position]) == "image" && settings.ie6_fallback && (!a.browser.msie || parseInt(a.browser.version) != 6) ? (itemWidth = 57, navWidth = settings.theme == "facebook" || settings.theme == "pp_default" ? 50 : 30, itemsPerPage = Math.floor((i.containerWidth - 100 - navWidth) / itemWidth), itemsPerPage = itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length, totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1, totalPage == 0 ? (navWidth = 0, $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()) : $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show(), galleryWidth = itemsPerPage * itemWidth, fullGalleryWidth = pp_images.length * itemWidth, $pp_gallery.css("margin-left", -(galleryWidth / 2 + navWidth / 2)).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected"), goToPage = Math.floor(set_position / itemsPerPage) < totalPage ? Math.floor(set_position / itemsPerPage) : totalPage, a.prettyPhoto.changeGalleryPage(goToPage), $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected")) : $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")
        }

        function z() {
            o = a(window).height(), p = a(window).width(), typeof $pp_overlay != "undefined" && $pp_overlay.height(a(document).height()).width(p)
        }

        function y() {
            if (self.pageYOffset) return {
                scrollTop: self.pageYOffset,
                scrollLeft: self.pageXOffset
            };
            if (document.documentElement && document.documentElement.scrollTop) return {
                scrollTop: document.documentElement.scrollTop,
                scrollLeft: document.documentElement.scrollLeft
            };
            if (document.body) return {
                scrollTop: document.body.scrollTop,
                scrollLeft: document.body.scrollLeft
            }
        }

        function x() {
            if (doresize && typeof $pp_pic_holder != "undefined") {
                scroll_pos = y(), contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width(), projectedTop = o / 2 + scroll_pos.scrollTop - contentHeight / 2, projectedTop < 0 && (projectedTop = 0);
                if (contentHeight > o) return;
                $pp_pic_holder.css({
                    top: projectedTop,
                    left: p / 2 + scroll_pos.scrollLeft - contentwidth / 2
                })
            }
        }

        function w(a) {
            return a.match(/youtube\.com\/watch/i) || a.match(/youtu\.be/i) ? "youtube" : a.match(/vimeo\.com/i) ? "vimeo" : a.match(/\b.flv\b/i) ? "flow" : a.match(/\b.mp4\b/i) ? "flow" : a.match(/\b.avi\b/i) ? "flow" : a.match(/\b.mov\b/i) ? "quicktime" : a.match(/\b.swf\b/i) ? "flash" : a.match(/\biframe=true\b/i) ? "iframe" : a.match(/\bajax=true\b/i) ? "ajax" : a.match(/\bcustom=true\b/i) ? "custom" : a.substr(0, 1) == "#" ? "inline" : "image"
        }

        function v(b, c) {
            b = parseFloat(b), c = parseFloat(c), $pp_details = $pp_pic_holder.find(".pp_details"), $pp_details.width(b), detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom")), $pp_details = $pp_details.clone().addClass(settings.theme).width(b).appendTo(a("body")).css({
                position: "absolute",
                top: -1e4
            }), detailsHeight += $pp_details.height(), detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight, a.browser.msie && a.browser.version == 7 && (detailsHeight += 8), $pp_details.remove(), $pp_title = $pp_pic_holder.find(".ppt"), $pp_title.width(b), titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom")), $pp_title = $pp_title.clone().appendTo(a("body")).css({
                position: "absolute",
                top: -1e4
            }), titleHeight += $pp_title.height(), $pp_title.remove(), k = c + detailsHeight, l = b, m = k + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height(), n = b
        }

        function u(a, b) {
            resized = !1, v(a, b), imageWidth = a, imageHeight = b;
            if ((n > p || m > o) && doresize && settings.allow_resize && !h) {
                resized = !0, fitting = !1;
                while (!fitting) n > p ? (imageWidth = p - 200, imageHeight = b / a * imageWidth) : m > o ? (imageHeight = o - 200, imageWidth = a / b * imageHeight) : fitting = !0, m = imageHeight, n = imageWidth;
                v(imageWidth, imageHeight), (n > p || m > o) && u(n, m)
            }
            return {
                width: Math.floor(imageWidth),
                height: Math.floor(imageHeight),
                containerHeight: Math.floor(m),
                containerWidth: Math.floor(n) + settings.horizontal_padding * 2,
                contentHeight: Math.floor(k),
                contentWidth: Math.floor(l),
                resized: resized
            }
        }

        function t(b) {
            b > 1 ? a(".pp_nav").show() : a(".pp_nav").hide()
        }

        function s(b) {
            $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden"), $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function() {
                a(".pp_loaderIcon").show(), b()
            })
        }

        function r() {
            a(".pp_loaderIcon").hide(), projectedTop = scroll_pos.scrollTop + (o / 2 - i.containerHeight / 2), projectedTop < 0 && (projectedTop = 0), $ppt.fadeTo(settings.animation_speed, 1), $pp_pic_holder.find(".pp_content").animate({
                height: i.contentHeight,
                width: i.contentWidth
            }, settings.animation_speed), $pp_pic_holder.animate({
                top: projectedTop,
                left: p / 2 - i.containerWidth / 2,
                width: i.containerWidth
            }, settings.animation_speed, function() {
                $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(i.height).width(i.width), $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed), isSet && w(pp_images[set_position]) == "image" ? $pp_pic_holder.find(".pp_hoverContainer").show() : $pp_pic_holder.find(".pp_hoverContainer").hide(), i.resized ? a("a.pp_expand,a.pp_contract").show() : a("a.pp_expand").hide(), settings.autoplay_slideshow && !q && !j && a.prettyPhoto.startSlideshow(), settings.changepicturecallback(), j = !0
            }), A()
        }
        f = jQuery.extend({
            animation_speed: "fast",
            slideshow: 5e3,
            autoplay_slideshow: !1,
            opacity: .8,
            show_title: !0,
            allow_resize: !0,
            default_width: 500,
            default_height: 344,
            counter_separator_label: "/",
            theme: "pp_default",
            horizontal_padding: 20,
            hideflash: !1,
            wmode: "opaque",
            autoplay: !0,
            modal: !1,
            deeplinking: !0,
            overlay_gallery: !0,
            keyboard_shortcuts: !0,
            changepicturecallback: function() {},
            callback: function() {},
            ie6_fallback: !0,
            markup: '<div class="pp_pic_holder"> \n\t\t\t\t\t\t<div class="ppt">&nbsp;</div> \n\t\t\t\t\t\t<div class="pp_top"> \n\t\t\t\t\t\t\t<div class="pp_left"></div> \n\t\t\t\t\t\t\t<div class="pp_middle"></div> \n\t\t\t\t\t\t\t<div class="pp_right"></div> \n\t\t\t\t\t\t</div> \n\t\t\t\t\t\t<div class="pp_content_container"> \n\t\t\t\t\t\t\t<div class="pp_left"> \n\t\t\t\t\t\t\t<div class="pp_right"> \n\t\t\t\t\t\t\t\t<div class="pp_content"> \n\t\t\t\t\t\t\t\t\t<div class="pp_loaderIcon"></div> \n\t\t\t\t\t\t\t\t\t<div class="pp_fade"> \n\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_expand" title="Expand the image">Expand</a> \n\t\t\t\t\t\t\t\t\t\t<div class="pp_hoverContainer"> \n\t\t\t\t\t\t\t\t\t\t\t<a class="pp_next" href="#">next</a> \n\t\t\t\t\t\t\t\t\t\t\t<a class="pp_previous" href="#">previous</a> \n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<div id="pp_full_res"></div> \n\t\t\t\t\t\t\t\t\t\t<div class="pp_details"> \n\t\t\t\t\t\t\t\t\t\t\t<div class="pp_nav"> \n\t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_previous">Previous</a> \n\t\t\t\t\t\t\t\t\t\t\t\t<p class="currentTextHolder">0/0</p> \n\t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_next">Next</a> \n\t\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t\t<p class="pp_description"></p> \n\t\t\t\t\t\t\t\t\t\t\t<div class="pp_social">{pp_social}</div> \n\t\t\t\t\t\t\t\t\t\t\t<a class="pp_close" href="#">Close</a> \n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t</div> \n\t\t\t\t\t\t<div class="pp_bottom"> \n\t\t\t\t\t\t\t<div class="pp_left"></div> \n\t\t\t\t\t\t\t<div class="pp_middle"></div> \n\t\t\t\t\t\t\t<div class="pp_right"></div> \n\t\t\t\t\t\t</div> \n\t\t\t\t\t</div> \n\t\t\t\t\t<div class="pp_overlay"></div>',
            gallery_markup: '<div class="pp_gallery"> \n\t\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t</div>',
            image_markup: '<img id="fullResImage" src="{path}" />',
            flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            flow_markup: '<object width="{width}" height="{height}" type="application/x-shockwave-flash" data="' + THEME_URI + '/js/prettyphoto/flowplayer/flowplayer-3.2.7.swf" name="player_api" id="player_api"><param value="true" name="allowfullscreen"><param value="always" name="allowscriptaccess"><param value="high" name="quality"><param value="true" name="cachebusting"><param value="#000000" name="bgcolor"><param value="config={&quot;playerId&quot;:&quot;player_api&quot;,&quot;clip&quot;:{&quot;url&quot;:&quot;{path}&quot;},&quot;playlist&quot;:[{&quot;url&quot;:&quot;{path}&quot;}]}" name="flashvars"></object>',
            quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
            inline_markup: '<div class="pp_inline">{content}</div>',
            custom_markup: "",
            social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="http://www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'
        }, f);
        var g = this,
            h = !1,
            i, j, k, l, m, n, o = a(window).height(),
            p = a(window).width(),
            q;
        doresize = !0, scroll_pos = y(), a(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function() {
            x(), z()
        }), f.keyboard_shortcuts && a(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function(b) {
            if (typeof $pp_pic_holder != "undefined" && $pp_pic_holder.is(":visible")) switch (b.keyCode) {
                case 37:
                    a.prettyPhoto.changePage("previous"), b.preventDefault();
                    break;
                case 39:
                    a.prettyPhoto.changePage("next"), b.preventDefault();
                    break;
                case 27:
                    settings.modal || a.prettyPhoto.close(), b.preventDefault()
            }
        }), a.prettyPhoto.initialize = function() {
            settings = f, settings.theme == "pp_default" && (settings.horizontal_padding = 16), settings.ie6_fallback && a.browser.msie && parseInt(a.browser.version) == 6 && (settings.theme = "light_square"), theRel = a(this).attr("data-pp"), galleryRegExp = /\[(?:.*)\]/, isSet = galleryRegExp.exec(theRel) ? !0 : !1, pp_images = isSet ? jQuery.map(g, function(b, c) {
                if (a(b).attr("data-pp").indexOf(theRel) != -1) return a(b).attr("href")
            }) : a.makeArray(a(this).attr("href")), pp_titles = isSet ? jQuery.map(g, function(b, c) {
                if (a(b).attr("data-pp").indexOf(theRel) != -1) return a(b).find("img").attr("alt") ? a(b).find("img").attr("alt") : ""
            }) : a.makeArray(a(this).find("img").attr("alt")), pp_descriptions = isSet ? jQuery.map(g, function(b, c) {
                if (a(b).attr("data-pp").indexOf(theRel) != -1) return a(b).attr("title") ? a(b).attr("title") : ""
            }) : a.makeArray(a(this).attr("title")), pp_images.length > 30 && (settings.overlay_gallery = !1), set_position = jQuery.inArray(a(this).attr("href"), pp_images), rel_index = isSet ? set_position : a("a[data-pp^='" + theRel + "']").index(a(this)), B(this), settings.allow_resize && a(window).bind("scroll.prettyphoto", function() {
                x()
            }), a.prettyPhoto.open();
            return !1
        }, a.prettyPhoto.open = function(b) {
            typeof settings == "undefined" && (settings = f, a.browser.msie && a.browser.version == 6 && (settings.theme = "light_square"), pp_images = a.makeArray(arguments[0]), pp_titles = arguments[1] ? a.makeArray(arguments[1]) : a.makeArray(""), pp_descriptions = arguments[2] ? a.makeArray(arguments[2]) : a.makeArray(""), isSet = pp_images.length > 1 ? !0 : !1, set_position = 0, B(b.target)), a.browser.msie && a.browser.version == 6 && a("select").css("visibility", "hidden"), settings.hideflash && a("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden"), t(a(pp_images).size()), a(".pp_loaderIcon").show(), settings.deeplinking && c(), settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href)), $pp_pic_holder.find(".pp_social").html(facebook_like_link)), $ppt.is(":hidden") && $ppt.css("opacity", 0).show(), $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity), $pp_pic_holder.find(".currentTextHolder").text(set_position + 1 + settings.counter_separator_label + a(pp_images).size()), pp_descriptions[set_position] != "" ? $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position])) : $pp_pic_holder.find(".pp_description").hide(), movie_width = parseFloat(e("width", pp_images[set_position])) ? e("width", pp_images[set_position]) : settings.default_width.toString(), movie_height = parseFloat(e("height", pp_images[set_position])) ? e("height", pp_images[set_position]) : settings.default_height.toString(), h = !1, movie_height.indexOf("%") != -1 && (movie_height = parseFloat(a(window).height() * parseFloat(movie_height) / 100 - 150), h = !0), movie_width.indexOf("%") != -1 && (movie_width = parseFloat(a(window).width() * parseFloat(movie_width) / 100 - 150), h = !0), $pp_pic_holder.fadeIn(function() {
                settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined" ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html("&nbsp;"), imgPreloader = "", skipInjection = !1;
                switch (w(pp_images[set_position])) {
                    case "image":
                        imgPreloader = new Image, nextImage = new Image, isSet && set_position < a(pp_images).size() - 1 && (nextImage.src = pp_images[set_position + 1]), prevImage = new Image, isSet && pp_images[set_position - 1] && (prevImage.src = pp_images[set_position - 1]), $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]), imgPreloader.onload = function() {
                            i = u(imgPreloader.width, imgPreloader.height), r()
                        }, imgPreloader.onerror = function() {
                            alert("Image cannot be loaded. Make sure the path is correct and image exist."), a.prettyPhoto.close()
                        }, imgPreloader.src = pp_images[set_position];
                        break;
                    case "youtube":
                        i = u(movie_width, movie_height), movie_id = e("v", pp_images[set_position]), movie_id == "" && (movie_id = pp_images[set_position].split("youtu.be/"), movie_id = movie_id[1], movie_id.indexOf("?") > 0 && (movie_id = movie_id.substr(0, movie_id.indexOf("?"))), movie_id.indexOf("&") > 0 && (movie_id = movie_id.substr(0, movie_id.indexOf("&")))), movie = "http://www.youtube.com/embed/" + movie_id, e("rel", pp_images[set_position]) ? movie += "?rel=" + e("rel", pp_images[set_position]) : movie += "?rel=1", settings.autoplay && (movie += "&autoplay=1"), toInject = settings.iframe_markup.replace(/{width}/g, i.width).replace(/{height}/g, i.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
                        break;
                    case "vimeo":
                        i = u(movie_width, movie_height), movie_id = pp_images[set_position];
                        var b = /http:\/\/(www\.)?vimeo.com\/(\d+)/,
                            c = movie_id.match(b);
                        movie = "http://player.vimeo.com/video/" + c[2] + "?title=0&amp;byline=0&amp;portrait=0", settings.autoplay && (movie += "&autoplay=1;"), vimeo_width = i.width + "/embed/?moog_width=" + i.width, toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, i.height).replace(/{path}/g, movie);
                        break;
                    case "flow":
                        i = u(movie_width, movie_height), i.height += 15, i.contentHeight += 15, i.containerHeight += 15, toInject = settings.flow_markup.replace(/{width}/g, i.width).replace(/{height}/g, i.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                        break;
                    case "quicktime":
                        i = u(movie_width, movie_height), i.height += 15, i.contentHeight += 15, i.containerHeight += 15, toInject = settings.quicktime_markup.replace(/{width}/g, i.width).replace(/{height}/g, i.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                        break;
                    case "flash":
                        i = u(movie_width, movie_height), flash_vars = pp_images[set_position], flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length), filename = pp_images[set_position], filename = filename.substring(0, filename.indexOf("?")), toInject = settings.flash_markup.replace(/{width}/g, i.width).replace(/{height}/g, i.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars);
                        break;
                    case "iframe":
                        i = u(movie_width, movie_height), frame_url = pp_images[set_position], frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1), toInject = settings.iframe_markup.replace(/{width}/g, i.width).replace(/{height}/g, i.height).replace(/{path}/g, frame_url);
                        break;
                    case "ajax":
                        doresize = !1, i = u(movie_width, movie_height), doresize = !0, skipInjection = !0, a.get(pp_images[set_position], function(a) {
                            toInject = settings.inline_markup.replace(/{content}/g, a), $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject, r()
                        });
                        break;
                    case "custom":
                        i = u(movie_width, movie_height), toInject = settings.custom_markup;
                        break;
                    case "inline":
                        myClone = a(pp_images[set_position]).clone().append('<br clear="all" />').css({
                            width: settings.default_width
                        }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(a("body")).show(), doresize = !1, i = u(a(myClone).width(), a(myClone).height()), doresize = !0, a(myClone).remove(), toInject = settings.inline_markup.replace(/{content}/g, a(pp_images[set_position]).html())
                }!imgPreloader && !skipInjection && ($pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject, r())
            });
            return !1
        }, a.prettyPhoto.changePage = function(b) {
            currentGalleryPage = 0, b == "previous" ? (set_position--, set_position < 0 && (set_position = a(pp_images).size() - 1)) : b == "next" ? (set_position++, set_position > a(pp_images).size() - 1 && (set_position = 0)) : set_position = b, rel_index = set_position, doresize || (doresize = !0), a(".pp_contract").removeClass("pp_contract").addClass("pp_expand"), s(function() {
                a.prettyPhoto.open()
            })
        }, a.prettyPhoto.changeGalleryPage = function(a) {
            a == "next" ? (currentGalleryPage++, currentGalleryPage > totalPage && (currentGalleryPage = 0)) : a == "previous" ? (currentGalleryPage--, currentGalleryPage < 0 && (currentGalleryPage = totalPage)) : currentGalleryPage = a, slide_speed = a == "next" || a == "previous" ? settings.animation_speed : 0, slide_to = currentGalleryPage * itemsPerPage * itemWidth, $pp_gallery.find("ul").animate({
                left: -slide_to
            }, slide_speed)
        }, a.prettyPhoto.startSlideshow = function() {
            typeof q == "undefined" ? ($pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function() {
                a.prettyPhoto.stopSlideshow();
                return !1
            }), q = setInterval(a.prettyPhoto.startSlideshow, settings.slideshow)) : a.prettyPhoto.changePage("next")
        }, a.prettyPhoto.stopSlideshow = function() {
            $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function() {
                a.prettyPhoto.startSlideshow();
                return !1
            }), clearInterval(q), q = undefined
        }, a.prettyPhoto.close = function() {
            $pp_overlay.is(":animated") || (a.prettyPhoto.stopSlideshow(), $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden"), a("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function() {
                a(this).remove()
            }), $pp_overlay.fadeOut(settings.animation_speed, function() {
                a.browser.msie && a.browser.version == 6 && a("select").css("visibility", "visible"), settings.hideflash && a("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible"), a(this).remove(), a(window).unbind("scroll.prettyphoto"), d(), settings.callback(), doresize = !0, j = !1, delete settings
            }))
        }, !pp_alreadyInitialized && b() && (pp_alreadyInitialized = !0, hashIndex = b(), hashRel = hashIndex, hashIndex = hashIndex.substring(hashIndex.indexOf("/") + 1, hashIndex.length - 1), hashRel = hashRel.substring(0, hashRel.indexOf("/")), setTimeout(function() {
            a("a[data-pp^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click")
        }, 50));
        return this.unbind("click.prettyphoto").bind("click.prettyphoto", a.prettyPhoto.initialize)
    }
})(jQuery);
var pp_alreadyInitialized = !1