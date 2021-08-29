$(document).ready(function (){
    //let cellContainer = $("input-cell-container");

    for(let i = 1; i <= 100; i++){
        let n = i;
        let res = "";

        while (n > 0) {
            let rem = n % 26;
            if (rem == 0) {
                res = "Z" + res;
                n = Math.floor(n / 26) - 1;
            }
            else {
                res = String.fromCharCode(rem - 1 + 65) + res;
                n = Math.floor(n / 26);
            }
        }
        let column = $(`<div class="column-number colId-${i}" id="colCode-${res}">${res}</div>`);
        $(".column-name-container").append(column);
        let row = $(`<div class = "row-number" id = "rowId-${i}">${i}</div>`);
        $(".row-name-container").append(row)
    }
    
    for(let i = 1; i <= 100; i++){
        let row = $(`<div class = "cell-row"></div>`);
        for(let j = 1; j <= 100; j++){
            //let colcode = $(`colId-${j}`).attr("id").split("-")[1];
            let column = $(`<div class = "input-cell" contenteditable = "false" id = "row-${i}-col-${j}"></div>`);
            row.append(column);
        }
        $(".input-cell-container").append(row);
    }

    $(".align-icon").click(function () {
        $(".align-icon.selected").removeClass("selected");
        $(this).addClass("selected");
    })

    $(".style-icon").click(function () {
        $(this).toggleClass("selected");
    });

    $(".input-cell").click(function (ele) {
        if(ele.ctrlKey){
            let [rowId, colId] = getRowCol(this);
            console.log(rowId);
            console.log(colId);
            if(rowId > 1){
                let topCellSelected = $(`#row-${rowId - 1}-col-${colId}`).hasClass("selected");
                if (topCellSelected) {
                    $(this).addClass("top-cell-selected");
                    $(`#row-${rowId - 1}-col-${colId}`).addClass("bottom-cell-selected");
                }
            }
            //         if (rowId > 1) {
    //             let topCellSelected = $(`#row-${rowId - 1}-col-${colId}`).hasClass("selected");
    //             if (topCellSelected) {
    //                 $(this).addClass("top-cell-selected");
    //                 $(`#row-${rowId - 1}-col-${colId}`).addClass("bottom-cell-selected");
    //             }
    //         }
            if (rowId < 100) {
                let bottomCellSelected = $(`#row-${rowId + 1}-col-${colId}`).hasClass("selected");
                if (bottomCellSelected) {
                    $(this).addClass("bottom-cell-selected");
                    $(`#row-${rowId + 1}-col-${colId}`).addClass("top-cell-selected");
                }
            }
            if (colId > 1) {
                let leftCellSelected = $(`#row-${rowId}-col-${colId - 1}`).hasClass("selected");
                if (leftCellSelected) {
                    $(this).addClass("left-cell-selected");
                    $(`#row-${rowId}-col-${colId - 1}`).addClass("right-cell-selected");
                }
            }
            if (colId < 100) {
                let rightCellSelected = $(`#row-${rowId}-col-${colId + 1}`).hasClass("selected");
                if (rightCellSelected) {
                    $(this).addClass("right-cell-selected");
                    $(`#row-${rowId}-col-${colId + 1}`).addClass("left-cell-selected");
                }
            }
        }
        else{
            $(".input-cell.selected").removeClass("selected");
            $(this).addClass("selected");
        }
        $(this).addClass("selected");
        changeHeader(this);
    })

    $(".input-cell").dblclick(function () {
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).attr("contenteditable", "true");
        $(this).focus();
    })

    $(".input-cell").blurr(function () {
        $(".input-cell.selected").attr("contenteditable", "false");
    })

    $(".input-cell-container").scroll(function () {
        $(".column-name-container").scrollLeft(this.scrollLeft);
        $(".row-name-container").scrollTop(this.scrollTop);
    })

});

function getRowCol(ele) {
    let idArray = $(ele).attr("id").split("-");
    rowId = parseInt(idArray[1]);
    colId = parseInt(idArray[3]);
    return [rowId, colId];
}

function updateCell(property, value){
    $(".input-cell.selected").each(function () {
        $(this).css(property, value);
    });
}

$(".icon-bold").click(function () {
    if ($(this).hasClass("selected")) {
        updateCell("font-weight", "", true);
    } else {
        updateCell("font-weight", "bold", false);
    }
});

$(".icon-italic").click(function () {
    if ($(this).hasClass("selected")) {
        updateCell("font-style", "", true);
    } else {
        updateCell("font-style", "italic", false);
    }
});

$(".icon-underline").click(function () {
    if ($(this).hasClass("selected")) {
        updateCell("text-decoration", "", true);
    } else {
        updateCell("text-decoration", "underline", false);
    }
});
