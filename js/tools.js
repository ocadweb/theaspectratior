jQuery(function ($) {

    //プレビュー    
    var setFileInput = $('.imgInput');

    setFileInput.each(function () {
        var selfFile = $(this),
            selfInput = $(this).find('input[type=file]');

        selfInput.change(function () {
            var file = $(this).prop('files')[0],
                fileRdr = new FileReader(),
                selfImg = selfFile.find('.imgView');

            if (!this.files.length) {
                if (0 < selfImg.size()) {
                    selfImg.remove();
                    return;
                }
            } else {
                if (file.type.match('image.*')) {
                    if (!(0 < selfImg.size())) {
                        selfFile.append('<img alt="" class="imgView">');
                    }
                    var prevElm = selfFile.find('.imgView');
                    fileRdr.onload = function () {
                        prevElm.attr('src', fileRdr.result);
                        //画像データ取得
                        var img = new Image();
                        img.src = fileRdr.result;
                        var width = img.width;
                        var height = img.height;
                        //イメージを空にする
                        $('.imgViewW,.imgViewH').empty()
                            //画像データ数字を表示
                        $('.imgViewW').append(width);
                        $('.imgViewH').append(height);
                        //イメージを空にする
                        //$('.clone').empty();
                        //clone
                        //$('.imgView').clone(true).appendTo('.clone');
                        //画像アップロード後の処理
                        $('.aspectratio').addClass("upfix");
                        $('.clone').css("background-image", "url(" + fileRdr.result + ")");
                    }
                    fileRdr.readAsDataURL(file);
                } else {
                    if (0 < selfImg.size()) {
                        selfImg.remove();
                        return;
                    }
                }
            }
        });
    });
    //プレビュー

    //cloneサイズ調整
    var cloneW = $('.clone').width();
    $('.clone').height(cloneW);

    //サイドバーレイアウト
    $('body.page .sidebar .widgets').addClass("row");
    $('body.page .sidebar .widget').addClass("col-md-4");

    //アスペクト計算
    $("#px").keyup(function () {
        if (this.value === '') {
            $("#px").tooltip('hide');
            $('.span2 span').text('');
            return;
        };

        var n = parseInt(this.value);

        if (isNaN(n)) {
            $("#px").tooltip('show');
        } else {
            $("#px").tooltip('hide');
            ocadwebAspect(n);
        }
    });

    function ocadwebAspect(n) {
        var ratio = new Ratio(n);

        $.each(boxes, function (i, val) {
            $('#' + val + '_' + mode).text(n);
        });

        var antimode = (mode === 'w') ? 'h' : 'w';
        $("#ONE_" + antimode).text(ratio.Onesixnine());
        $("#FOUR_" + antimode).text(ratio.Threetwo());
        $("#THREE_" + antimode).text(ratio.Fourthree());
        $("#TWO_" + antimode).text(ratio.Twoone());
        $("#GR_" + antimode).text(ratio.Goldenratio());
        $("#SR_" + antimode).text(ratio.Silverratio());
    }

    $('input:radio').change(function () {
        if ($(this).val() === 'w') {
            mode = 'w';
            $("#px").attr('placeholder', 'width').keyup();
        } else {
            mode = 'h';
            $("#px").attr('placeholder', 'height').keyup();
        };
    });

    $("#px").tooltip({
        'title': 'invalid number!',
        'trigger': 'manual',
        'placement': 'bottom'
    });

    var boxFade = function () {
        $(".container div:hidden:first").fadeIn(300, function () {
            boxFade();
        });
    }
});

//アスペクト
"use strict";
var mode = 'w';
var boxes = ['ONE', 'THREE', 'FOUR', 'TWO', 'GR', 'SR'];
var Ratio = function (num) {
    if (!(this instanceof Ratio)) {
        return new Ratio(num);
    };

    this.num = num;

    this.isWidth = (mode === 'w') ? true : false;

    this.Onesixnine = function () {
        var a = (this.isWidth) ? this.num * 9 / 16 : this.num * 16 / 9;
        return Math.round(a);
    }

    this.Threetwo = function () {
        var a = (this.isWidth) ? this.num * 2 / 3 : this.num * 3 / 2;
        return Math.round(a);
    }
    
    this.Fourthree = function () {
        var a = (this.isWidth) ? this.num * 3 / 4 : this.num * 4 / 3;
        return Math.round(a);
    }


    this.Twoone = function () {
        var a = (this.isWidth) ? this.num / 2 : this.num * 2;
        return Math.round(a);
    }

    this.Goldenratio = function () {
        var a = (this.isWidth) ? this.num / 1.618 : this.num * 1.618;
        return Math.round(a);
    }

    this.Silverratio = function () {
        var a = (this.isWidth) ? this.num / 1.414 : this.num * 1.414;
        return Math.round(a);
    }


}