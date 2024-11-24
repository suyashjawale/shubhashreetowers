import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleTranslateComponent } from "./google-translate/google-translate.component";
import { FetchdataService } from './fetchdata.service';
import { Maintenance } from './maintenance';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'
import { jsonData } from './jsonData';
import { MonthData } from './month-data';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, GoogleTranslateComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})

export class AppComponent {
	title = 'Shubhashree Towers';
	showLoader: boolean = true;
	private readonly scaleFactor = 1.5;
	private readonly padding = 50;
	private readonly halfPadding = this.padding / 2;
	private readonly rowHeight = 60;
	private readonly upperMargin = 80;
	private readonly fontFamily = "Trebuchet MS";
	private readonly characterWidth = 15;
	jsonData: MonthData[] = jsonData;

	constructor(private fetchdataservice: FetchdataService) { }

	ngOnInit() {
		// this.fetchdataservice.fetchData().subscribe({
		//   next: data => {
		//     this.showLoader = false;
		//   },
		//   error: error => {
		//     console.log(error);
		//   }
		// })
		this.showLoader = false;
	}

	downloadSVGImage(monthIndex: number, tabInd: number, isPDF: boolean = false): Promise<[string, number, number] | void> {
		return new Promise((resolve, reject) => {
			let svgMarkup;
			if (tabInd === 1) {
				svgMarkup = this.generateMaintenanceSVGTable(monthIndex);
			}

			if (svgMarkup !== undefined) {
				const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml' });
				const url = URL.createObjectURL(svgBlob);

				const img = new Image();
				img.crossOrigin = 'anonymous';
				img.onload = () => {
					try {
						const result = this.createCanvasImage(img, url, monthIndex, isPDF);
						resolve(result);
					} catch (error) {
						reject(error);
					}
				};
				img.onerror = (error) => reject(new Error('Failed to load image.'));
				img.src = url;
			} else {
				reject(new Error('SVG markup is undefined.'));
			}
		});
	}


	private createCanvasImage(img: HTMLImageElement, url: string, monthIndex: number, isPDF: boolean): [string, number, number] {
		const canvas = document.createElement('canvas');
		canvas.width = img.width * this.scaleFactor;
		canvas.height = img.height * this.scaleFactor;
		const ctx = canvas.getContext('2d')!;

		ctx.scale(this.scaleFactor, this.scaleFactor);
		ctx.drawImage(img, 0, 0);
		URL.revokeObjectURL(url);

		const dataurl = canvas.toDataURL('image/png', 1.0);
		if (!isPDF) {
			const link = document.createElement('a');
			link.href = dataurl;
			link.download = `${this.jsonData[monthIndex].month_name}.png`;
			link.click();
		}
		return [dataurl, img.width, img.height];
	}


	private generateMaintenanceSVGTable(monthIndex: number): string {
		const data = this.jsonData[monthIndex].maintenance;
		const columnMarkers = [this.halfPadding].concat(this.calculateColumnMarkers(data));
		const canvasWidth = columnMarkers[columnMarkers.length - 1] + this.padding;
		const canvasHeight = this.rowHeight * 20 + this.padding + this.upperMargin;
		const boxWidth = canvasWidth - this.padding;
		const boxHeight = canvasHeight - this.padding - this.upperMargin;

		let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}">
		<rect width="100%" height="100%" fill="#ffff" />
		<rect width="${boxWidth}" height="${boxHeight}" x="${this.halfPadding}" y="${this.halfPadding + this.upperMargin}" rx="20" ry="20" fill="white" style="stroke-width:3;stroke:gray" />
		<text x="50%" y="${(this.halfPadding + this.upperMargin) / 2}" alignment-baseline="middle" text-anchor="middle" fill="black" font-weight="550" font-family="${this.fontFamily}" font-size="34">${this.jsonData[monthIndex].month_name}</text>`;

		// Draw horizontal lines
		for (let i = this.rowHeight; i < this.rowHeight * (data.length + 2); i += this.rowHeight) {
			svg += `<line x1="${this.halfPadding}" y1="${this.halfPadding + this.upperMargin + i}" x2="${canvasWidth - this.halfPadding}" y2="${this.halfPadding + this.upperMargin + i}" style="stroke-width:3;stroke:gray" />`;
		}

		// Draw vertical lines
		for (let i = 1; i < columnMarkers.length - 1; i++) {
			svg += `<line x1="${columnMarkers[i]}" y1="${this.halfPadding + this.upperMargin}" x2="${columnMarkers[i]}" y2="${canvasHeight - this.halfPadding - this.rowHeight}" style="stroke-width:3;stroke:gray" />`;
		}

		const objKeys = Object.keys(data[0]);
		for (let i = 0; i < columnMarkers.length - 1; i++) {
			svg += `<text x="${(columnMarkers[i] + columnMarkers[i + 1]) / 2}" y="${this.halfPadding + this.upperMargin + 2 + this.rowHeight / 2}" text-anchor="middle" alignment-baseline="middle" fill="black" font-family="${this.fontFamily}" font-size="25" font-weight="550">${objKeys[i]}</text>`;
		}

		for (let i = 0; i < data.length; i++) {
			let objValues = Object.values(data[i]);

			for (let j = 0; j < columnMarkers.length - 1; j++) {
				if (j == 1) {
					svg += `<text x="${columnMarkers[j] + this.halfPadding}" y="${this.halfPadding + this.upperMargin + this.rowHeight * (i + 1) + 2 + this.rowHeight / 2}" alignment-baseline="middle" fill="black" font-family="${this.fontFamily}" font-size="25">${objValues[j]}</text>`;
				}
				else {
					if (j == 3) {
						svg += `<rect width="${columnMarkers[j + 1] - columnMarkers[j] - this.halfPadding}" height="${this.rowHeight - 10}" x="${columnMarkers[j] + this.halfPadding / 2}" y="${this.halfPadding + this.upperMargin + this.rowHeight * (i + 1) + 5}" rx="10" ry="10" fill="${objValues[j] == "Paid" ? "rgb(25 135 84)" : "rgb(220 53 69)"}" />`;
					}
					svg += `<text x="${(columnMarkers[j] + columnMarkers[j + 1]) / 2}" y="${this.halfPadding + this.upperMargin + this.rowHeight * (i + 1) + 2 + this.rowHeight / 2}" text-anchor="middle" alignment-baseline="middle" fill="${j == 3 ? "white" : "black"}" font-family="${this.fontFamily}" font-size="25">${objValues[j]}</text>`;
				}
			}
		}

		svg += `<text x="${(columnMarkers[0] + columnMarkers[1]) / 2}" y="${boxHeight + this.rowHeight + this.halfPadding - 10}" font-weight="bold" text-anchor="middle" alignment-baseline="middle" fill="black" font-family="${this.fontFamily}" font-size="25">Total</text>`;

		svg += `<text x="${columnMarkers[1] - 10}" y="${boxHeight + this.rowHeight + this.halfPadding - 10}" font-weight="bold" alignment-baseline="middle" fill="black" font-family="${this.fontFamily}" font-size="25">= ${this.jsonData[monthIndex].savings.maintenance_total}</text>`;

		svg += '</svg>';
		return svg;
	}

	private calculateColumnMarkers(data: Maintenance[]): number[] {
		const baseWidths = Object.keys(data[0]).map(key => key.length * this.characterWidth + this.padding);

		for (const row of data) {
			const values = Object.values(row);
			values.forEach((value, i) => {
				baseWidths[i] = Math.max(String(value).length * this.characterWidth + this.padding, baseWidths[i]);
			});
		}

		return baseWidths.map((curr, i, arr) => {
			return arr[i] += arr[i - 1] ? arr[i - 1] : 0
		})

	}

	downloadPdf() {
		throw new Error('Method not implemented.');
	}

	downloadExcel() {
		throw new Error('Method not implemented.');
	}

	downloadSVGOnlyMaintenanceImages() {
		for (let i = 0; i < this.jsonData.length; i++) {
			this.downloadSVGImage(i, 1);
		}
	}

	async downloadSVGOnlyMaintenancePDF() {
		const pdf = new jsPDF();

		const promises = this.jsonData.map((_, i) => this.downloadSVGImage(i, 1, true));

		try {
			const results = await Promise.all(promises);

			results.forEach((data, i) => {
				if (data) {

					let imageWidth = data[1];
					let imageHeight = data[2];

					const maxImageWidth = pdf.internal.pageSize.getWidth();
					const maxImageHeight = pdf.internal.pageSize.getHeight() - 20;

					let scale = 1;
					if (imageWidth > maxImageWidth || imageHeight > maxImageHeight) {
						scale = Math.min(maxImageWidth / imageWidth, maxImageHeight / imageHeight);
					}

					const scaledWidth = imageWidth * scale;
					const scaledHeight = imageHeight * scale;

					pdf.addImage(data[0], 'PNG', 7, 7, scaledWidth - 14, scaledHeight - 14);
					if (i < results.length - 1) {
						pdf.addPage();
					}
				}
			});

			pdf.save('MaintenancePDF.pdf', { returnPromise: true }).then(() => { setTimeout(() => this.showLoader = false, 3000) });

		} catch (error) {
			console.error('Error generating PDF:', error);
		}
	}

	downloadPdfJs(completeData:MonthData[], pdfType: string) {
		const doc = new jsPDF();

		for (let i = 0; i < completeData.length; i++) {
			doc.text('Theme "grid"', 14, 8)
			autoTable(doc, {
				head: [['Flat', 'Owner Name', 'Amount', 'Status', 'Date']],
				body: completeData[i].maintenance.map(row => Object.values(row)),
				foot: [['Total', completeData[i].savings.maintenance_total]],
				willDrawCell: (data) => {
					if (data.column.index === 3) {
						const status = data.cell.raw;
						if (status == 'Unpaid') {
							doc.setFillColor(220, 53, 69);
							doc.setTextColor(255, 255, 255);
						}
						else if (status == 'Paid') {
							doc.setFillColor(25, 135, 84);
							doc.setTextColor(255, 255, 255);
						}
						doc.rect(
							data.cell.x,
							data.cell.y,
							data.cell.width,
							data.cell.height,
							"F"
						);
					}
				},
			})
			if(pdfType=='full'){
				console.log("HEllo");
			}
			if (i < completeData.length - 1)
				doc.addPage();
		}

		doc.save('table.pdf')
	}

	downloadCompleteExcel() {
		throw new Error('Method not implemented.');
	}

	downloadMaintenanceExcel() {
		throw new Error('Method not implemented.');
	}

	downloadMaintenancePDF2Canvas() {
		throw new Error('Method not implemented.');
	}

	downloadMaintenanceImages2Canvas() {
		throw new Error('Method not implemented.');
	}

	downloadHtml2CanvasImage() {
		throw new Error('Method not implemented.');
	}

}
