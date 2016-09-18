function getInfoFromTable(tableid) {
    var tableInfo = [];
    var tableObj = document.getElementById(tableid);
    for (var i = 0; i < tableObj.rows.length; i++) {    //遍历Table的所有Row
        var dataRow = [];
        for (var j = 0; j < tableObj.rows[i].cells.length; j++) {   //遍历Row中的每一列
            dataRow.push(tableObj.rows[i].cells[j].innerText);   //获取Table中单元格的内容
        }
        tableInfo.push(dataRow);
    }
    return tableInfo;
}
/*
function getInfoFromTableDict(tableid) {
    var tableInfo = {};
    var tableObj = document.getElementById(tableid);
    var biaoTou = [];
    for (var i = 0; i < tableObj.rows[0].cells.length; i++) {
      biaoTou.push(tableObj.rows[0].cells[i].innerText);
    }
    for (var i = 1; i < tableObj.rows.length; i++) {    //遍历Table的所有Row
        var dataRow = [];
        for (var j = 0; j < tableObj.rows[i].cells.length; j++) {   //遍历Row中的每一列
            dataRow.push(tableObj.rows[i].cells[j].innerText);   //获取Table中单元格的内容
        }
        tableInfo.biaoTou[i-1] = dataRow;
    }
    return tableInfo;
}
*/
