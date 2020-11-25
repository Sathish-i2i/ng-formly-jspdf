import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'ng-pdf-export',
  template: `
    <div #pdfContainer>
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})

export class NgPdfExportComponent implements OnInit {
  @ViewChild('pdfContainer') pdfContainer: ElementRef;
  @Input() printPageSize: object = { size: 'A4' };

  emptySelectOptionList = [];

  constructor() { }

  ngOnInit() {
  }

  saveAs(fileName: string) {
    this.emptySelectOptionList = [];
    const printContents = this.pdfContainer.nativeElement;
    this.getHtmlContents(printContents);
    this.print(printContents.innerHTML, this.getAppStyles(), fileName);
  }

  getHtmlContents(printContents) {
    this.bindInputValues(printContents);
    this.bindTextAreaValues(printContents);
    this.bindDropDownValues(printContents);
  }

  bindInputValues(printContents) {
    // Input type (text | date)
    const inputTag: any = printContents.getElementsByTagName('input');
    for (const i of inputTag) {
      if (i.type === 'text' || i.type === 'date' || i.type === 'number') {
        i.defaultValue = i.value;
      }
      if (i.type === 'checkbox') {
        i.defaultChecked = i.checked;
      }
    }
  }

  bindTextAreaValues(printContents) {
    // Input type (textarea)
    const textArea: any = printContents.getElementsByTagName('textarea');
    for (const i of textArea) {
      i.defaultValue = i.value;
    }
  }

  bindDropDownValues(printContents) {
    // Input type (select)
    const select: any = printContents.getElementsByTagName('select');
    for (const i of select) {
      if (i.multiple) {
        for (const j of i.options) {
          j.selected ? j.classList.remove('no-print') : j.classList.add('no-print');
        }
      } else {
        const selectedIndex = i.selectedIndex;
        if (selectedIndex >= 0) {
          i.options[selectedIndex].setAttribute('selected', true);
        } else {
          this.emptySelectOptionList.push(i.id);
        }
      }
    }
  }

  getAppStyles(): string {
    const styleList: string[] = [];
    const style: any = document.getElementsByTagName('style') || [];
    for (const el of style) {
      styleList.push(el.outerHTML);
    }
    const link: any = document.getElementsByTagName('link') || [];
    for (const el of link) {
      styleList.push(el.outerHTML);
    }
    return styleList.join('\r\n');
  }

  printPdfWindow(popupWin) {
    if (this.emptySelectOptionList.length) {
      this.emptySelectOptionList.forEach((id: any) => {
        popupWin.document.getElementById(id).value = '';
      });
    }
    // popupWin.print();
    // popupWin.onafterprint = popupWin.close();
    this.exportJsPdf(popupWin);
    // this.exportHtml2pdf(popupWin);
  }

  exportJsPdf(popupWin) {
    const content = popupWin.document.documentElement;
    const pdf = new jsPDF('p', 'px', 'a4', true);
    pdf.html(content , {
      callback: function () {
        pdf.save('test.pdf');
        popupWin.close();
      }
    });
  }

  exportHtml2pdf(popupWin) {
    const options = {
      margin: 1,
      filename : 'Our_awesome_file.pdf',
      image: {type: 'jpeg'},
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'cm', format: 'letter', orientation: 'portrait' }
    };
    const content = popupWin.document.documentElement;
    html2pdf().from(content).set(options).save();
    popupWin.close();
  }

  print(pdfHtmlContent: string, styles: string, title: string = 'form'): void {
    let popupWin: any;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>${title}</title>
          ${styles}
          <style type="text/css" media="print">
            @page ${this.printPageSize}
          </style>
          <style type="text/css" media="print">
            @media print {
              .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          ${pdfHtmlContent}
        </body>
      </html>`);
      popupWin.onload = this.printPdfWindow(popupWin);
  }

}
