const xl = require('excel4node');
const fs = require('fs')

const createReport = ( title='title', headers=[] ) => {

  const wb = new xl.Workbook();
  const ws = wb.addWorksheet(title);

  let isComplexTable = false;
  const styleHeaders = {
    alignment: {
      horizontal: 'center',
      vertical: 'center',
      shrinkToFit: true,
      wrapText: true
    },
    font: {
      bold: true
    }
  }

  let i = 0;
  headers.map((header) => {
   if (Array.isArray(header)) {
     isComplexTable = true;
     header.map((subheader, j) => {
       if (j == 0) {
         ws.cell(1,i+1, 1,(header.length-1+i), true).string(header[0]);
       } else {
         ws.cell(2,i+j).string(subheader);
       }
     })
     i += (header.length-1);
   } else {
     ws.cell(1,i+1, 2,i+1, true).string(header);
     i++;
   }
  });

  ws.cell(1,1, 2,i).style(styleHeaders);
  return {wb, ws};
}

const addData = ( wb, ws, data=[], style={}, startRow=0) => {

  startRow += 3;
  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
      switch (typeof(data[r][c])) {
        case 'number':
          ws.cell((startRow+r),c+1).number(data[r][c]);
          break;
        case 'string':
          ws.cell((startRow+r),c+1).string(data[r][c]);
          break;
        case 'boolean':
          ws.cell((startRow+r),c+1).bool(data[r][c]);
          break;
        default:
          ws.cell((startRow+r),c+1).string('error');
      }
    }
  }

  if (Object.keys(style).length > 0) {
    for (let key in style) {
      for (let prop in style[key]) {
        if (prop == 'width') {
          ws.column(+key).setWidth(style[key][prop]);
        }
        if (prop == 'options') {
          ws.cell(startRow,+key, data.length+startRow-1,+key).style(style[key][prop]);
        }
      }
    }
  }

  return {wb, ws};
}

const saveReport = (name, date, wb) => {
  fs.mkdirSync(`docs/reports/${name}`, {recursive: true});
  wb.write(`docs/reports/${name}/report_${date}.xlsx`);
}

module.exports = { createReport, addData, saveReport };
